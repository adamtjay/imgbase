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

import Nav from '../partials/nav/Navbar';
import { getTheme } from 'react-native-material-kit';



export default class MainMenu extends Component {
  static navigationOptions = {
    title: 'Main Menu',
  }
  constructor(props) {
    super(props);

    this.state = {  };

    }




  render() {

    const theme = getTheme();


    return (


      <View style={ styles.maincontainer }>

        <View style={theme.cardStyle}>

          <Image source={{uri : ''}} style={theme.cardImageStyle} />
          <Text style={theme.cardTitleStyle}>Welcome</Text>
          <Text style={theme.cardContentStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Mauris sagittis pellentesque lacus eleifend lacinia...
          </Text>

          <View style={theme.cardMenuStyle}>Blah</View>
          <Text style={theme.cardActionStyle}>My Action</Text>
        </View>

   </View>

)}
}

const styles = StyleSheet.create({
  maincontainer: {
      top: 30,
    }
});
