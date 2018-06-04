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

import ViewLargePhoto from './partials/ViewLargePhoto';


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
      photo: {}
    }

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
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     // console.log('MainView fetch: ', data.tags)
  //     // console.log('MainView fetch: ', data.user.id)
  //     console.log('MainView fetch: ', data)
  //     this.setState({
  //       photo: JSON.stringify(data)
  //     })
  //     // return data;
  //   }
  //   )
  // }


  componentDidMount() {
      // this.fetchTest();
      // this.postTest();
    }


  render() {

    const { photo } = this.state;

    // singlephoto props needs to be an object w/ uri property, that's then JSON stringified
    const testphoto = JSON.stringify({ 'uri': 'assets-library://asset/asset.PNG?id=FCEBD138-770F-488A-8211-AAA87BE0BAA0&ext=PNG' })

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
