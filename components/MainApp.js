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
    } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';

import MainMenu from './screens/MainMenu';
import Login from './screens/Login';
import Register from './screens/Register';
import CameraRollPhotosList from './screens/CameraRollPhotosList';
import ImgbasePhotosList from './screens/ImgbasePhotosList';

const AppNavigator = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  MainMenu: { screen: MainMenu },
  ImgbasePhotosList: { screen: ImgbasePhotosList },
  CameraRollPhotosList: { screen: CameraRollPhotosList },
  }, {
  navigationOptions: {
    headerStyle: {
      // marginTop: Constants.statusBarHeight
    }
  }
})


export default class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

  }


  render() {

    return (

      <AppNavigator />

    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    paddingTop: Constants.statusBarHeight,
  }
})
