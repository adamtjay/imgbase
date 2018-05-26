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

import PhotoView from './components/PhotoView';


import { Provider } from 'react-redux'
import store from './store';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { photos: null };

  }




  render() {
    let { photos } = this.state;
    return (
      <Provider store={store}>

          <PhotoView />

    </Provider>

    );
  }
}
