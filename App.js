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

import MainApp from './components/MainApp';


export default class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (

      <MainApp />

    );
  }
}
