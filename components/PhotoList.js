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
  Alert
    } from 'react-native';
import { Constants } from 'expo';

export default class PhotoList extends Component {
  constructor(props) {
    super(props);

    this.state = { photos: null };

    this._onImgPress = this._onImgPress.bind(this);
    }
    
  _onImgPress(e) {
      console.log(e.target);
      Alert.alert(`TouchableHighlight working (${e.target})`);
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
    for (let { node: photo } of photos.edges) {

      console.log('** Photo data: **\n', photo);

      images.push(

        <TouchableHighlight onPress={this._onImgPress} key={photo.image.filename} >
          <View style={ styles.imgContainer }>
            <View style={ styles.touchable }> </View>
                  <Image
                    key={photo.image.filename}
                    source={photo.image}
                    resizeMode="contain"
                    style={ styles.resimg }
                  />
                </View>
              </TouchableHighlight>

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
  imgContainer: {
    width: 600,
    display: 'block',
    resizeMode: 'contain',
    display: 'flex',
    marginTop: 20,
  },
  touchable: {
    backgroundColor: 'red',
    // width: 50,
    // right: -300,
    // display: 'flex',
  },
  resimg: {
    height: 420,
    width: 300,
    resizeMode: 'contain',
    display: 'flex',
    marginTop: 10,
    marginLeft: 0,
    borderWidth: 1,
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
