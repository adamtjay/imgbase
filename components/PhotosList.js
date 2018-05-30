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

import ViewPhoto from './partials/ViewPhoto';

export default class PhotosList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: null,
      activePhotos: []
     };

    this.updateActiveArr = this.updateActiveArr.bind(this);
    }


  updateActiveArr(photo) {
    let alreadyExists = 0;
    console.log('updating active: ', this.state.activePhotos.length, photo.image.uri)
    this.state.activePhotos.map(statephoto => {
      // check current state vs clicked photo to see if it's already there
      statephoto.image.uri === photo.image.uri
          ? alreadyExists = 1
          : alreadyExists = 0
          })
          // if the photo already exists in state, don't update state
          if (alreadyExists === 0) {
            this.setState({
                 activePhotos: [...this.state.activePhotos, photo]
               })
           }
    }


  render() {
    let { photos } = this.state;



    return (

      <ScrollView style={styles.container}>

        <Text>   activePhotos: {this.state.activePhotos.length}</Text>

        {photos
          ? this._renderPhotos(photos)
          : <Text style={styles.paragraph}>Fetching photos...</Text>}

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
          resphoto={photo}
          updateActiveArr={this.updateActiveArr}
          key={photo.image.filename}/>
      );
    }
    return images;
  }

  componentDidMount() {
    this._getPhotosAsync().catch(error => {
      console.error(error);
    });
  }

  async _getPhotosAsync() {
    let photos = await CameraRoll.getPhotos({ first: 20 });
    this.setState({ photos });
  }
}

const styles = StyleSheet.create({
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
