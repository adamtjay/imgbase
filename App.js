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

import { Provider } from 'react-redux'
import store from './store';


import PhotoList from './components/PhotoList';


export default class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <Provider store={store}>

          <PhotoList />

    </Provider>

    );
  }
}
