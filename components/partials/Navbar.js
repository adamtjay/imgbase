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

export default class Navbar extends Component {

    render() {
      return (

        <View style={ styles.navbar } >

          <Text>Navbar</Text>

      </View>

      )
    }

}

const styles = StyleSheet.create({
  navbar: {
    width: 450,
    borderWidth: 1,
  }
})
