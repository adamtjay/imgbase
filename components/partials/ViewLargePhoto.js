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

export default class ViewLargePhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {  };

    this._onImgPress = this._onImgPress.bind(this);
    }

  _onImgPress(e) {
      console.log(e.target);
      Alert.alert(`TouchableHighlight working (${e.target})`);
    }



  render() {

      const resphoto = JSON.parse(this.props.resphoto);

      console.log('viewlargephoto props: ', resphoto);

    return (

      <View style={ styles.maincontainer }>
      { resphoto
        ?
      <TouchableHighlight onPress={this._onImgPress} key={resphoto.filename} >
       <View style={ styles.imgContainer }>
               <Image
                 key={resphoto.filename}
                 source={resphoto}
                 resizeMode="contain"
                 style={ styles.resimg }
               />
               <TextInput value={'TextInput'} style={ styles.textarea } numberOfLines={4}/>
           </View>
       </TouchableHighlight>

       : <Text>Loading</Text>
     }
   </View>

)}
}

const styles = StyleSheet.create({
  maincontainer: {
    top: 40,
  },
  textarea: {
    maxWidth: 320,
    marginLeft: 75,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
  imgContainer: {
    width: 500,
    display: 'block',
    display: 'flex',
    marginTop: 20,
    // marginLeft: 4,
    right: 45,
    borderWidth: 1,
    borderRadius: 20,
  },
  touchable: {
    // backgroundColor: 'red',

  },
  resimg: {
    top: 30,
    height: 480,
    width: 450,
    resizeMode: 'contain',
    display: 'flex',
    marginTop: 10,
    marginLeft: 0,
    padding: '50%',
    // borderWidth: 1,
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
