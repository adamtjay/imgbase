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


          <Text style={ styles.navlink }> <Text style={ styles.navitem }> NavLink1</Text> </Text>

          <Text style={ styles.navlink }> <Text style={ styles.navitem }> NavLink2 </Text> </Text>

          <Text style={ styles.navlink }> <Text style={ styles.navitem }> NavLink3 </Text> </Text>

          <Text style={ styles.navlink }> <Text style={ styles.navitem }> NavLink4 </Text> </Text>

      </View>

      )
    }

}

const styles = StyleSheet.create({
  navitem: {
    zIndex: 2,
    position: 'absolute',
    paddingTop: 50,
  },
  navlink: {
    zIndex: 2,
    // top: 5,
    // marginTop: 12,
    backgroundColor: 'grey',
    borderRadius: 5,
    color: 'white',
    height: 50,
    left: -15,
    paddingLeft: 18,
    paddingRight: 18,
    borderWidth: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
  },
  navbar: {
    zIndex: 2,
    top: 30,
    // bottom: -120,
    position: 'absolute',
    alignSelf: 'stretch',
    // paddingLeft: 50,
    // paddingRight: 50,
    marginLeft: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'stretch',
  }

})
