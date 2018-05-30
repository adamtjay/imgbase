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


import PhotosList from './components/PhotosList';
import SinglePhotoView from './components/SinglePhotoView';
import Navbar from './components/partials/Navbar';


export default class App extends Component {
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
