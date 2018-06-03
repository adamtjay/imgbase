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

import { Spinner } from 'react-native-material-kit';

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
    this.uploadToImgBase = this.uploadToImgBase.bind(this);
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

    uploadToImgBase() {
      //upload activephotos state to db
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
            ? <Button title="&laquo; Upload to imgBase &raquo;" onPress={this.uploadToImgBase} style={ styles.uploadbutton } />
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

      // console.log('** Photo data: **\n', photo);

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
