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
  TouchableOpacity,
    } from 'react-native';
import { Constants } from 'expo';

import $ from 'jquery';
import axios from 'axios';
// import { Spinner } from 'react-native-material-kit';

import ViewPhoto from '../partials/ViewPhoto';

export default class CameraRollPhotosList extends Component {
  static navigationOptions = {
    title: 'Tag New Photos',
  }
  constructor(props) {
    super(props);

    this.state = {
      photos: null,
      activePhotos: [],
      multitag: null,
     };

    this.updateActiveArr = this.updateActiveArr.bind(this);
    this.enableMultiTag = this.enableMultiTag.bind(this);
    this.uploadImgsToImgBase = this.uploadImgsToImgBase.bind(this);
    this.postPhotoToImgBase = this.postPhotoToImgBase.bind(this);

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

    enableMultiTag() {
      this.setState({
        multitag: ''
      })
    }

    uploadImgsToImgBase() {
      //upload activephotos state to db
      this.state.activePhotos.forEach(photo => {
        const photoObj = {
          filename: photo.image.filename,
          mediatype: 'Photo',
          uri: photo.image.uri,
          tags: ['tagstest', 'arraytest']
        }
        this.postPhotoToImgBase(photoObj);
      })
    }

    postPhotoToImgBase(photo) {
      //called by uploadImgsToImgBase to post each new img
      console.log('** UPLOADING: **', photo)

        // fetch('http://localhost:8000/api/media', {
        //   method: 'POST',
        //   mode: 'no-cors',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTI5NTEzODU4LCJqdGkiOiI4ODc4NmI4ZDJjYWU0OGVmYWIzMjgyMzMwNGEyODY2YiIsInVzZXJfaWQiOjF9.d5KIRVOeM2j7RtEVwbY-mHbLJU-60cc-UXpl-jnDAFA'
        //   },
        //   body: JSON.stringify({
        //     "filename": photo.filename,
        //     "mediatype": photo.mediatype,
        //     // "tags": '',
        //     "uri": photo.uri
        //   })
        // })

        axios.post(`https://jsonplaceholder.typicode.com/users`, { photo })
          .then(res => {
            console.log(res);
            console.log(res.data);
          })

        // .then(res => console.log(res))
        // // .then(res => res.json())
        //   .catch(err => console.log(err))
        // // .then(res => console.log(res))
        // .then(data => console.log(data))

    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "http://localhost:8000/api/media/",
    //     "method": "POST",
    //     "headers": {
    //       "Content-Type": "application/json",
    //       "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTI5NDM0MDc2LCJqdGkiOiI1ZjQ4MmU1ZjI3MGU0Nzc5YTA3NmZmNzVhZDZiMzc1ZCIsInVzZXJfaWQiOjF9.B3lVONxkNXVTbGK-xqpH4ThEIi_-bPaB2LciEVTMBQ8",
    //       "Cache-Control": "no-cache",
    //       "Postman-Token": "825fa3a5-6e6e-409f-b8a6-e79567a996fe"
    //     },
    //     "processData": false,
    //     "data": "{ \"filename\": \"test\",\n\t\"mediatype\": \"test\",\n\t\"tags\": [\"test\"],\n\t\"uri\": \"test\" }"
    // }
    //
    // $.ajax(settings).done(function (response) {
    //   console.log(response);
    // });


    }




  render() {
    let { photos } = this.state;

    return (

      <ScrollView style={styles.container}>
        <View style={ styles.dividerline } />

        { this.state.multitag === null
          ? <Button title="Enable Multi-Tagging" onPress={this.enableMultiTag} style={ styles.multitagtext } />
          : <Button title="Multi-Tagging" onPress={this.enableMultiTag} style={ styles.multitagtext } /> }

        { this.state.multitag != null
          ? <View><TextInput name="multitag" placeholder="Add Multi-Tag keywords" style={ styles.multitagsbox }/>
                  <Text style={{textAlign:'center', top:5, fontSize:12}}>Tag(s) will be applied to all uploaded images</Text> </View>
          : this.state.multitag }

        <View style={{flex: 1, marginTop: 25}}>
          <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}> Photos Selected: {this.state.activePhotos.length} </Text>


          { this.state.activePhotos.length > 0
            ?              <TouchableOpacity
                              style={[styles.buttonLargeContainer, styles.primaryButton]}
                              onPress={this.uploadImgsToImgBase}>
                             <Text style={styles.buttonText}> Upload to imgBase </Text>
                        </TouchableOpacity>

            : this.state.activePhotos }

            <View style={ styles.dividerline } />



          {photos
            ? this._renderPhotos(photos)
            : <Text style={styles.paragraph}></Text>}

        </View>


      </ScrollView>

    );
  }

  _renderPhotos(photos) {
    let images = [];
    let testurl = { 'uri': 'assets-library://asset/asset.PNG?id=FCEBD138-770F-488A-8211-AAA87BE0BAA0&ext=PNG' };

    for (let { node: photo } of photos.edges) {

      console.log('** CameraRoll Photo data: **\n', photo);

      images.push(

        <ViewPhoto
          resphoto={photo}
          activePhotos={this.state.activePhotos}
          updateActiveArr={this.updateActiveArr}
          key={photo.image.filename}/>
        );
    }
    return images;
  }

  // fetchTest() {
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
  //   .then(data => console.log(data))
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


  componentDidMount() {
      // this.fetchTest();
      // this.postTest();

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
  buttonLargeContainer: {
    alignItems: 'center',
    marginTop: 10,
    width: 300,
    marginLeft: 40,
  },
primaryButton: {
    backgroundColor: '#a6cbfc',
    borderRadius: 20,
  },
buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  uploadbutton: {
    textAlign: 'center',
    fontSize: 25,
  },
  multitagtext: {
    textAlign: 'center',
    fontSize: 25,
  },
  multitagsbox: {
    maxWidth: 300,
    marginLeft: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
    backgroundColor: 'white',
    height: 40,
  },
  dividerline: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingBottom: 15,
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
