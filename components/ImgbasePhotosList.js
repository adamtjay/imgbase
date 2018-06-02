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
  TextInput
    } from 'react-native';
import { Constants } from 'expo';

import _ from 'lodash';

import ViewPhoto from './partials/ViewPhoto';
import Navbar from './partials/nav/Navbar';

export default class ImgbasePhotosList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: null,
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
    console.log('updating active: ', this.state.activePhotos.length, photo.image.filename)

    this.state.activePhotos.map(statephoto => {
      // * check current state vs clicked photo to see if it's already there
      console.log(photo.image.filename === statephoto.image.filename ? 'match' : 'no match')
      if (statephoto.image.uri === photo.image.uri) { alreadyExists = 1 }
          })
          // * if the photo already exists in state, don't update activephotos state
          if (alreadyExists === 0) {
            this.setState({
                 activePhotos: [...this.state.activePhotos, photo]
               })
           }
    }


    queryBySearchTerms(terms) {
      // * takes inputted string & splits through to make sure each word is individually tagged
      if (terms) {     // * only fetch when searchbar terms exist
            kwarray = []
            lowercaseterms = terms.toLowerCase()
            piece = lowercaseterms.split(" ")
            piece.forEach(str => {
              kwarray.push(str)
            })
          // console.log(`searched terms: ${terms}`)
          console.log('searchKW array :', kwarray)

          // * create querystring by looping through kw array, add tags to each, then join
          for (let i=0; i<kwarray.length; i++) {
            kwarray[i] = 'tags[]=' + kwarray[i] + '&';
          }
          querystring = kwarray.join('')
            // console.log('querystring: ', querystring)

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
              photo: data
            })
        console.log('imgbase photo state: ', this.state.photo)
          }
        ).catch(err => console.log(err))
    } // end if(terms)
  }


    componentDidMount() {
        // this.fetchPhotos();
        this.queryBySearchTerms();

        this._getPhotosAsync().catch(error => {
          console.error(error);
        });
    }


  render() {
    let { photos } = this.state;


    return (

      <ScrollView style={styles.container}>

        <TextInput name={"searchbar"}
             onChangeText={this.handleChange}
             placeholder={'Search Tags'}
             style={ styles.searchbox }/>

        <View style={{flex: 1, marginTop: 25}}>

          {photos
            ? this._renderPhotos(photos)
            : <Text style={styles.paragraph}>Fetching photos...</Text>}

        </View>


      </ScrollView>

    );
  }

  _renderPhotos(photos) {
    let images = [];
    let testurl = { 'uri': 'assets-library://asset/asset.PNG?id=FCEBD138-770F-488A-8211-AAA87BE0BAA0&ext=PNG' };

    for (let { node: photo } of photos.edges) {

      // console.log('** Photo data: **\n', photo);

      images.push(

        <ViewPhoto
          fromImgbase={true}
          resphoto={photo}
          activePhotos={this.state.activePhotos}
          updateActiveArr={this.updateActiveArr}
          key={photo.image.filename}/>
        );
    }
    return images;
  }


  async _getPhotosAsync() {
    let photos = await CameraRoll.getPhotos({ first: 20 });
    this.setState({ photos });
  }
}

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
    top: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    width: 300,
    left: 55,
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
  imgContainer: {
    width: 400,
    display: 'block',
    display: 'flex',
    marginTop: 20,
    marginLeft: 4,
    borderWidth: 1,
    borderRadius: 20,
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
    padding: '50%',
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
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
