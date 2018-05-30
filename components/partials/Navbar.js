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
       {/* <View style={{position: 'absolute', top: 0, flex: 1, alignSelf: 'stretch', right: 0, left: 0}}> */}

          <Text style={ styles.navlink }> <Text style={ styles.navitem }> Active: </Text> {this.props.activePhotosLen} </Text>

          <Text style={ styles.navlink }> <Text style={ styles.navitem }> NavLink2 </Text> </Text>

          <Text style={ styles.navlink }> <Text style={ styles.navitem }> NavLink3 </Text> </Text>

          <Text style={ styles.navlink }> <Text style={ styles.navitem }> NavLink4 </Text> </Text>

      </View>

      )
    }

}

const styles = StyleSheet.create({
  navitem: {
    // top: 20,
    // flexDirection: 'column',
    // justifyContent: 'center',
  },
  navlink: {
    // top: 5,
    // marginTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navbar: {
    position: 'absolute',
    alignSelf: 'stretch',
    height: 30,
    // paddingLeft: 50,
    // paddingRight: 50,
    marginLeft: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 20,
    // backgroundColor: 'white',
    // borderWidth: 1,
  }
})
