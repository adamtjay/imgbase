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

import NavigationBar from 'react-native-navbar';

export default class Navbar extends Component {

    render() {

      // const rightButtonConfig = {
      //   title: 'Next',
      //   handler: () => alert('hello!'),
      // };

      return (

        <View style={ styles.navbar } >

          <NavigationBar style={ styles.navigation }
            title={{ title: 'Main' }}
            leftButton={{ title: 'Left' }}
            rightButton={{ title: 'Right' }}
          />

          {/* rightButton={rightButtonConfig} */}

      </View>

      )
    }

}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: 'white',
  },
  navbar: {
    backgroundColor: 'white',
    paddingLeft: 50,
    paddingRight: 50,
    borderWidth: 1,
    flex: 1,
    borderRadius: 20,
  }
})
