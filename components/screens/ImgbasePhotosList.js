import React, { Component } from 'react';
import {
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

import _ from 'lodash';

import ViewImgBasePhoto from '../partials/ViewImgBasePhoto';

export default class ImgbasePhotosList extends Component {
  static navigationOptions = {
    title: 'imgBase Search',
  }
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      activePhotos: [],
      searchbar: '',
      photo: null
     };

    this.updateActiveArr = this.updateActiveArr.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchForTags = _.debounce(this.searchForTags, 2000);
    this.queryBySearchTerms = this.queryBySearchTerms.bind(this);
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


    componentDidMount() {
        // this.fetchPhotos();
        this.queryBySearchTerms();

        // this._getPhotosAsync().catch(error => {
        //   console.error(error);
        // });
    }


  render() {
    let { photos } = this.state;


    return (

      <ScrollView style={styles.container}>

        <View style={ styles.dividerline } />

        <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>Search By Tags</Text>
        <TextInput name={"searchbar"}
             onChangeText={this.handleChange}
             placeholder={'Enter Search Keywords'}
             style={ styles.searchbox }/>

         <View style={ styles.bottomdividerline } />


        <View style={{flex: 1, marginTop: 25}}>

          {photos
            ? this._renderPhotos(photos)
            : <Text style={styles.paragraph}>Waiting for search...</Text>}

        </View>


      </ScrollView>

    );
  }

  _renderPhotos(photos) {
    let images = [];
    let testurl = { 'uri': 'assets-library://asset/asset.PNG?id=FCEBD138-770F-488A-8211-AAA87BE0BAA0&ext=PNG' };

    // for (let { node: photo } of photos.edges) {
    photos.map(photo => {

      // console.log('** Photo data: **\n', photo);

      images.push(

        <ViewImgBasePhoto
          fromImgbase={true}
          resphoto={photo}
          activePhotos={this.state.activePhotos}
          updateActiveArr={this.updateActiveArr}
          key={photo.fields.filename}/>
        );
    })
    return images;
  }


//   async _getPhotosAsync() {
//     let photos = await CameraRoll.getPhotos({ first: 20 });
//     this.setState({ photos });
//   }


} // * end Class

// postTest() {
//   fetch('https://imgbase-api.herokuapp.com/api/media?format=json', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       firstParam: 'yourValue',
//       secondParam: 'yourOtherValue',
//     }),
//   }).then(res => res.json())
//   .then(data => console.log(data))
// }


const styles = StyleSheet.create({
  searchbox: {
    // top: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    width: 350,
    left: 15,
    top: 10,
    height: 50,
    backgroundColor: 'white',
    fontSize: 18,
  },
  textarea: {
    maxWidth: 320,
    marginLeft: 35,
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
    width: 400,
    display: 'block',
    display: 'flex',
    // marginTop: 20,
    borderWidth: 1,
    // borderRadius: 20,
  },
  touchable: {
    // backgroundColor: 'red',

  },
  resimg: {
    height: 320,
    width: 250,
    resizeMode: 'contain',
    display: 'flex',
    marginTop: 10,
    marginLeft: 0,
    // padding: '50%',
  },
  container: {
    flex: 1,
    // top: 15,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
