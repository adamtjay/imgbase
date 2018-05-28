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


import PhotosList from './components/PhotosList';
import ViewPhoto from './components/ViewPhoto';


export default class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <Provider store={store}>

          <PhotosList />
          {/* <ViewPhoto /> */}


    </Provider>

    );
  }
}
