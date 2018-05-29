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

export default class ViewPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {  };

    this._onImgPress = this._onImgPress.bind(this);
    }

    // Image source={} prop is looking for an obj with uri property in it
    testurl = { 'uri': 'assets-library://asset/asset.PNG?id=FCEBD138-770F-488A-8211-AAA87BE0BAA0&ext=PNG' };

  _onImgPress(e) {
      console.log(e.target);
      Alert.alert(`TouchableHighlight working (${e.target})`);
    }



  render() {

    return (

      <TouchableHighlight onPress={this._onImgPress} >
        <View style={ styles.imgContainer }>

          <View style={ styles.checkbox } > </View>

          <Image
            source={this.testurl}
            resizeMode="contain"
            style={ styles.resimg }
            />

        </View>
    </TouchableHighlight>

    );
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
  checkbox: {
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
