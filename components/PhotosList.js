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

    this._onImgPress = this._onImgPress.bind(this);
    this.updateActiveArr = this.updateActiveArr.bind(this);
    }

  _onImgPress(e) {
      console.log(e.target);
      Alert.alert(`TouchableHighlight working (${e.target})`);
    }

  updateActiveArr(photo) {
    console.log('updating active: ', this.state.activePhotos.length, photo.image.uri)
    this.state.activePhotos.map(statephoto => {
      statephoto.image.uri === photo.image.uri
          ? console.log('* img exists in state, removing from activestate *')
          //remove from the active state array
          : console.log('* img is new, add to activestate *')
    })
this.setState({ activePhotos: [...this.state.activePhotos, photo] })


    // let newActive = this.state.activePhotos.concat(photo);
    // this.setState({
    //   activePhotos: newActive
    //  })
    // console.log('activestate: ', this.state.activePhotos)
  }

  render() {
    let { photos } = this.state;



    return (

      <ScrollView style={styles.container}>
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
