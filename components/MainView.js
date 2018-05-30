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

import PhotosList from './PhotosList';
import SinglePhotoView from './SinglePhotoView';


export default class MainView extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (

          <PhotosList />

      // <SinglePhotoView />

    );
  }
}
