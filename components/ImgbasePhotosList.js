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
    this.searchForTags = _.debounce(this.searchForTags, 1200);
    this.fetchtest = this.fetchTest.bind(this);
    }


  searchForTags(tagsarray) {
      // console.log('lodash searching: ', tagsarray)

      this.fetchTest();
    }


  handleChange(e) {
    // console.log(e);
      this.setState({
        searchbar: e
      })
      this.searchForTags(e) // currently using event value, no state
    // this.searchForTags(this.state.searchbar)
    }

  updateActiveArr(photo) {
    let alreadyExists = 0;
    console.log('updating active: ', this.state.activePhotos.length, photo.image.filename)

    this.state.activePhotos.map(statephoto => {
      // check current state vs clicked photo to see if it's already there
      console.log(photo.image.filename === statephoto.image.filename ? 'match' : 'no match')
      if (statephoto.image.uri === photo.image.uri) { alreadyExists = 1 }
          })
          // if the photo already exists in state, don't update state
          if (alreadyExists === 0) {
            this.setState({
                 activePhotos: [...this.state.activePhotos, photo]
               })
           }
    }


    fetchTest() {
      // takes input array & splits through to make sure each word is individually tagged
      testarr = ['test', 'hello', 'testing fifth', 'another one']
      kwarray = []
      testarr.forEach(str => {
        piece = str.split(" ")
        piece.forEach(str => {
          // console.log('str: ', str)
          kwarray.push(str)
        })
      })
      console.log('kwarray :', kwarray)

      console.log(`fetching: ${this.state.searchbar}`)
      // fetch('https://imgbase-api.herokuapp.com/api/media/1/?format=json', {
      fetch('https://imgbase-api.herokuapp.com/api/media/1/?format=json', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .then(data => {
        // console.log('MainView fetch: ', data.tags)
        // console.log('MainView fetch: ', data.user.id)
        this.setState({
          photo: data
        })
    console.log('imgbase photo state: ', this.state.photo)
      }
    ).catch(err => console.log(err))
    }


    componentDidMount() {
        // this.fetchPhotos();
        this.fetchTest();

        this._getPhotosAsync().catch(error => {
          console.error(error);
        });
    }


  render() {
    let { photos } = this.state;


    return (

      <ScrollView style={styles.container}>

        <TextInput name={"searchbar"}
              // value={this.state.searchbar}
             onChangeText={this.handleChange}
             placeholder={'Search Tags'}
             style={ styles.searchbox }/>

        <View style={{flex: 1, marginTop: 25}}>
          {/* <Text> {this.state.activePhotos.length} </Text> */}


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


  // fetchPhotos() {
  //   fetch('https://imgbase-api.herokuapp.com/api/media/3/?format=json', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     // body: JSON.stringify({
  //     //   firstParam: 'yourValue',
  //     //   secondParam: 'yourOtherValue',
  //     // }),
  //   }).then(res => res.json())
  //     // .then(data => console.log(data))
  //     // .then(data =>
  //     //     JSON.stringify(data).map(photo => console.log('test', photo))
  //     // )
  // }

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


  async _getPhotosAsync() {
    let photos = await CameraRoll.getPhotos({ first: 20 });
    this.setState({ photos });
  }
}

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
