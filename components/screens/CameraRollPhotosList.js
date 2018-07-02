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
  TouchableOpacity,
    } from 'react-native';
import { Constants } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import ViewPhoto from '../partials/ViewPhoto';

import $ from 'jquery';
import axios from 'axios';
// import { Spinner } from 'react-native-material-kit';


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
      usertoken: '',
      tags: []
     };

    this.updateActiveArr = this.updateActiveArr.bind(this);
    this.enableMultiTag = this.enableMultiTag.bind(this);
    this.uploadImgsToImgBase = this.uploadImgsToImgBase.bind(this);
    this.postPhotoToImgBase = this.postPhotoToImgBase.bind(this);
    this.updateActiveArrTags = this.updateActiveArrTags.bind(this);
    this.findActiveIndex = this.findActiveIndex.bind(this);
    this.removeFromActiveArr = this.removeFromActiveArr.bind(this);
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
      //upload activephotos with updated tags state to db
      this.state.activePhotos.forEach(photo => {
        const photoObj = {
          filename: photo.image.filename,
          mediatype: 'Photo',
          uri: photo.image.uri,
        }
        //include tags based on whether or not multitag was used
        if (this.state.multitag != null) {
          photoObj.tags = photo.tags.concat(' ', this.state.multitag)
        } else {
          photoObj.tags = photo.tags
        }
        this.postPhotoToImgBase(photoObj);

      })
    }

    postPhotoToImgBase(photo) {
      //called by uploadImgsToImgBase to post each new img
      console.log('** UPLOADING: **', photo)

      let splitTags = photo.tags.toLowerCase().split(" ");

        let data = JSON.stringify({
          filename: photo.filename,
          mediatype: photo.mediatype,
          tags: splitTags,
          uri: photo.uri
        })


        if (this.state.usertoken) {
          let authStr = 'Bearer '.concat(JSON.parse(this.state.usertoken))

          axios.post(`https://imgbase-api.herokuapp.com/api/media/`, data, {
              headers: {
                Authorization: authStr,
                "Content-Type": "application/json"
              }
           })
            .then(res => {
              console.log('Data:', res.data);
            })
        }

    }

    findActiveIndex(filename) {
      // get index in activePhotos based on filename match, pass this to updatetags
      for(let i = 0; i < this.state.activePhotos.length; i += 1) {
         if(this.state.activePhotos[i].image.filename === filename) {
             console.log('match at index: ', i, ' with filename: ', filename)
             return i;
         }
      }
      return -1;
    }

    updateActiveArrTags(filename, newtags) {
      //when tag state changes in child, update it in the active arr - for just photo w that filename
        let index = this.findActiveIndex(filename)
        let actives = this.state.activePhotos
        // console.log('Filename: ', actives[index].image.filename)
        actives[index].tags = newtags
        this.setState({
          actives
        })
        console.log('Updated: ', this.state.activePhotos[index].tags)
    }

    removeFromActiveArr(filename) {
        let index = this.findActiveIndex(filename)
        let actives = this.state.activePhotos
        updActives = actives.splice(index, 1);
        this.setState({
          updActives
        })
        console.log('Active after rm: ', this.state.activePhotos)

    }




  render() {
    let { photos } = this.state;

    return (

      <ScrollView style={ (wp('100%') > 395) ? styles.containerLg : styles.container }>
        <View style={ styles.dividerline } />

        { this.state.multitag === null
          ? <Button title="Enable Multi-Tagging" onPress={this.enableMultiTag} style={ styles.multitagtext } />
          : <Button title="Multi-Tagging" onPress={this.enableMultiTag} style={ styles.multitagtext } /> }

        { this.state.multitag != null
          ? <View><TextInput value={this.state.multitag} style={ (wp('100%') > 395) ? styles.multitagsboxLg : styles.multitagsbox } name="multitag" onChangeText={(text) => this.setState({multitag: text})} placeholder="Add Multi-Tag keywords" />
                  <Text style={{textAlign:'center', top:5, fontSize:12}}>Tag(s) will be applied to all uploaded images</Text> </View>
          : this.state.multitag }

        <View style={{flex: 1, marginTop: 25}}>
          <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}> Photos Selected: {this.state.activePhotos.length} </Text>

          { this.state.activePhotos.length > 0
            ?              <TouchableOpacity
                              // style={[styles.buttonLargeContainer, styles.primaryButton]}
                              style={(wp('100%') > 395) ? styles.uploadButtonLg : styles.uploadButton}
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

    for (let { node: photo } of photos.edges) {

      // console.log('** CameraRoll Photo data: **\n', photo);

      images.push(

        <ViewPhoto
          updateTags={this.updateActiveArrTags}
          resphoto={photo}
          activePhotos={this.state.activePhotos}
          updateActiveArr={this.updateActiveArr}
          removeFromActiveArr={this.removeFromActiveArr}
          key={photo.image.filename}/>
        );
    }
    return images;
  }


  componentDidMount() {

    AsyncStorage.getItem('@token')
        .then(res => {
            this.setState({
              usertoken: JSON.stringify(res)
            })
            console.log('usertoken state: ', this.state.usertoken)
        })
          .catch(err => console.log(err));


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
uploadButton: {
  alignItems: 'center',
  marginTop: 10,
  width: wp('80%'),
  marginLeft: wp('13%'),
  backgroundColor: '#a6cbfc',
  borderRadius: 20,
},
uploadButtonLg: {
  alignItems: 'center',
  marginTop: 10,
  width: wp('80%'),
  marginLeft: wp('9%'),
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
    width: wp('82%'),
    marginLeft: wp('12%'),
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
    backgroundColor: 'white',
    height: 40,
  },
  multitagsboxLg: {
    width: wp('82%'),
    marginLeft: wp('8.5%'),
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
    // maxWidth: 320,
    marginLeft: 35,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
  imgContainer: {
    width: wp('80%'),
    // display: 'flex',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 20,
  },
  touchable: {
    // backgroundColor: 'red',

  },
  resimg: {
    height: hp('50%'),
    width: wp('30%'),
    // resizeMode: 'contain',
    // display: 'flex',
    marginTop: 10,
    marginLeft: 0,
    // padding: '50%',
  },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    marginLeft: wp('-5.5%'),
  },
  containerLg: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    marginLeft: wp('0%'),
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
