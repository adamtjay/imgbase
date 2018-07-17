import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  Text,
  TouchableHighlight,
  Modal,
  StyleSheet,
  Button,
  CameraRoll,
  Image,
  Dimensions,
  ScrollView,
  Alert,
  TextInput,
    } from 'react-native';
import { Constants } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import _ from 'lodash';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import ViewImgBasePhoto from '../partials/ViewImgBasePhoto';

export default class ImgbasePhotosList extends Component {
  static navigationOptions = {
    title: 'Search',
  }
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      activePhotos: [],
      searchbar: '',
      photo: null,
      userid: null,
      usertoken: null,
      tagslist: []
     };

    this.updateActiveArr = this.updateActiveArr.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchForTags = _.debounce(this.searchForTags, 2000);
    this.queryBySearchTerms = this.queryBySearchTerms.bind(this);
    this.getUserIdFromToken = this.getUserIdFromToken.bind(this);
    this.getTagsList = this.getTagsList.bind(this);
    }

  handleChange(e) {
      this.setState({
        searchbar: e
      })
      this.searchForTags(e) // currently using event value, no state
    }

    searchForTags(tagsarray) {
        // console.log('lodash searching: ', tagsarray)
        this.queryBySearchTerms(tagsarray);
      }

  updateActiveArr(photo) {
    let alreadyExists = 0;
    // console.log('updating active: ', photo.fields.filename)

    this.state.activePhotos.map(statephoto => {
      // * check current state vs clicked photo to see if it's already there
      console.log(photo.fields.filename === statephoto.fields.filename ? 'match' : 'no match')
      if (statephoto.fields.uri === photo.fields.uri) { alreadyExists = 1 }
          })
          // * if the photo already exists in state, don't update activephotos state
          if (alreadyExists === 0) {
            this.setState({
                 activePhotos: [...this.state.activePhotos, photo]
               })
           }
    }


    queryBySearchTerms(terms) {
      this.setState({  photos: '' })
       // * takes inputted string & splits through to make sure each word is individually tagged
      if (terms) {     // * only fetch when searchbar terms exist
            kwarray = []
            lowercaseterms = terms.toLowerCase()
            console.log('lowercaseterms: ', lowercaseterms)
            piece = lowercaseterms.split(" ")
            piece.forEach(str => {
              let filtered = str.replace(/[^a-zA-Z0-9]/g, "")
              console.log('filtered: ', filtered);
              kwarray.push(filtered)
            })
          // console.log(`searched terms: ${terms}`)
          console.log('searchKW array :', kwarray)

          // * create querystring by looping through kw array, add tags to each, then join
          for (let i=0; i<kwarray.length; i++) {
            kwarray[i] = 'tags[]=' + kwarray[i] + '&';
          }
          querystring = kwarray.join('')
            console.log('querystring: ', querystring)

        console.log('fetching URL: ', `https://imgbase-api.herokuapp.com/api/media/search?${querystring}`)
          fetch(`https://imgbase-api.herokuapp.com/api/media/search?${querystring}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          })
          .then(res => res.json())
          .then(data => {
            this.setState({
              photos: data
            })
        console.log('imgbase photo state: ', this.state.photos)
          }
        ).catch(err => console.log(err))
    } // end if(terms)
  }

  getTagsList() {
    // get list of recommended tag searches, filter results based on usertoken
    if (this.state.usertoken) {
      let authStr = 'Bearer '.concat(this.state.usertoken)
      console.log('authStr: ', authStr)

      axios.get(`https://imgbase-api.herokuapp.com/api/media/`, {
          headers: {
            Authorization: authStr,
            "Content-Type": "application/json"
          }
       })
    .then(res => {
      //get each individual tag from each obj, push to state a single array
      let hashtable = {};

      res.data.forEach(obj => {
        obj.tags.join(" ").split(" ").forEach(tag => {
          if (!hashtable[tag]) {
          // If char does not exist already in the hash array, create a key-value showing that it appeared 1 time
             hashtable[tag] = 1
         } else {
          // If it is already existing, increment its value by 1 to account for duplicate letters
           hashtable[tag]++
         }
        })
    })
    console.log('hashtable: ', hashtable)
    // move hashtable into array, which will then be sorted by frequency
    let sortedtags = [];
    for (let i in hashtable) { sortedtags.push([i, hashtable[i] ]) }
    sortedtags.sort(function(a, b) {
      return b[1] - a[1];
      });
    // iterate through sorted arr, push to state (if valid tag)
    sortedtags.forEach(tag => {
    if (tag[0] != '' && tag[0] != 'null') {
    this.setState({
      taglist: this.state.tagslist.push(`\n - ${tag[0]}   -   (${tag[1]})`)
          })
        }
      })
      console.log('tagslist sorted: ', sortedtags)
    })
      .catch(err => console.log(err))

  }
}


    componentDidMount() {
        this.queryBySearchTerms();

        this.getUserIdFromToken();

    }


  render() {
    let { photos } = this.state;


    return (

      <ScrollView style={ styles.container }>

        <View style={ styles.dividerline } />

        <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>imgBase Search</Text>
        <TextInput name={"searchbar"}
             onChangeText={this.handleChange}
             placeholder={'Enter Search Keywords'}
             style={ (wp('100%') > 395) ? styles.searchboxLg : styles.searchbox }/>

         <View style={ styles.bottomdividerline } />


        <View style={{flex: 1, marginTop: 25}}>

          <ScrollView style={ (wp('100%') > 395) ? styles.photoListLg : styles.photoList} >

            {photos && this.state.userid
              ? this._renderPhotos(photos)
              : <View><Text style={styles.paragraph}>{`My Tags:`}</Text>
                <Text style={styles.tagslist}>{`${this.state.tagslist.join("")}`}</Text></View>}

          </ScrollView>

        </View>

      </ScrollView>

    );
  }

  // get ID of logged in user by decoding token
  getUserIdFromToken() {
      let decoded;
      AsyncStorage.getItem('@token')
      .then(res => {
          decoded = jwt_decode(res)
          this.setState({
            userid: decoded.user_id,
            usertoken: res
          })
          console.log('User ID State: ', this.state.userid, ' -- User token: ', this.state.usertoken)
          // after identifying the user id, get list of their tags
          this.getTagsList();
      })
        .catch(err => console.log(err))
  }

  _renderPhotos(photos) {
    let images = [];

    photos.map(photo => {

      // console.log('** Photo data: **\n', photo);

      // filter out photos which don't match userid from state
      if (photo.fields.user === this.state.userid) {

        images.push(
          <ViewImgBasePhoto
            fromImgbase={true}
            resphoto={photo}
            activePhotos={this.state.activePhotos}
            updateActiveArr={this.updateActiveArr}
            key={photo.fields.filename}/>
          );
      }
    })
    // return in ascending newest first order
    return images.reverse();
  }


} // * end Class


const styles = StyleSheet.create({
  photoList: {
    marginLeft: wp('-5.15%'),
  },
photoListLg: {
    marginLeft: wp('0%'),
  },
  searchbox: {
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    width: wp('93%'),
    left: wp('3.6%'),
    top: 10,
    height: 50,
    backgroundColor: 'white',
    fontSize: 18,
  },
  searchboxLg: {
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    width: wp('93%'),
    left: wp('3.3%'),
    top: 10,
    height: 50,
    backgroundColor: 'white',
    fontSize: 18,
  },
  textarea: {
    maxWidth: wp('80%'),
    marginLeft: wp('10.7%'),
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
  dividerline: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingBottom: 15,
  },
  bottomdividerline: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingTop: 10,
    marginBottom: 15,
    paddingBottom: 15,
  },
  imgContainer: {
    width: wp('70%'),
    display: 'block',
    display: 'flex',
    borderWidth: 1,
  },
  touchable: {

  },
  resimg: {
    height: wp('10%'),
    width: wp('5%'),
    resizeMode: 'contain',
    display: 'flex',
    marginTop: 10,
    marginLeft: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  tagslist: {
    paddingBottom: wp('8%'),
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    marginLeft: wp('2.3%'),
    width: wp('95%'),
    fontSize: 23,
    color: '#34495e',
    borderWidth: 1,
    borderRadius: 20,
  },
  paragraph: {
    marginLeft: wp('37%'),
    marginBottom: hp('2%'),
    fontSize: 25,
    fontWeight: 'bold',
    color: '#34495e',
  },
});
