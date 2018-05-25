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
  ScrollView
    } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {
  state = { photos: null };

  render() {
    let { photos } = this.state;
    return (
      <ScrollView style={styles.container}>
        {photos
          ? this._renderPhotos(photos)
          : <Text style={styles.paragraph}>Fetching photos...</Text>}
      </ScrollView>

//       <ScrollView
//   contentContainerStyle={styles.scrollView}>
//   {
//     this.state.photos.map((p, i) => {
//       return (
//         <TouchableHighlight
//           style={{opacity: i === this.state.index ? 0.5 : 1}}
//           key={i}
//           underlayColor='transparent'
//           onPress={() => this.setIndex(i)}
//         >
//           <Image
//             style={{
//               width: width/3,
//               height: width/3
//             }}
//             source={{uri: p.node.image.uri}}
//           />
//         </TouchableHighlight>
//       )
//     })
//   }
// </ScrollView>
    );
  }

  _renderPhotos(photos) {
    let images = [];
    for (let { node: photo } of photos.edges) {
      images.push(
        <Image
          source={photo.image}
          resizeMode="contain"
          style={ styles.resimg }
        />
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
    let photos = await CameraRoll.getPhotos({ first: 40 });
    this.setState({ photos });
  }
}

const styles = StyleSheet.create({
  resimg: {
    height: 400,
    width: 280,
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
