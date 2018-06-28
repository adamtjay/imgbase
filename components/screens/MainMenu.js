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
  TextInput,
  List,
  FlatList,
  ListItem,
  TouchableOpacity,
    } from 'react-native';
import { Constants } from 'expo';


import { getTheme } from 'react-native-material-kit';

import Login from './Login';


export default class MainMenu extends Component {
  static navigationOptions = {
    title: 'Main Menu',
    headerLeft: null,
  }
  constructor(props) {
    super(props);

    this.state = {  };

    }


  render() {

    const { navigate } = this.props.navigation;

    return (


      <View style={ styles.maincontainer }>

        <View style={ styles.dividerline } />

        <Text style={ styles.maintext}> imgBase </Text>
        <Text style={ styles.secondarytext}> &laquo; Turn your photos into a searchable database &raquo; </Text>

        <View style={ styles.dividerline } />

        <FlatList
          data={[
                  { link:
                     <TouchableOpacity
                           style={[styles.buttonLargeContainer, styles.primaryButton]}
                           onPress={() => navigate("CameraRollPhotosList")} >
                          <Text style={styles.buttonText}> Tag New Photos </Text>
                     </TouchableOpacity>
                      , key: '1' },
                  { link:
                    <TouchableOpacity
                          style={[styles.buttonLargeContainer, styles.primaryButton]}
                          onPress={() => navigate("ImgbasePhotosList")} >
                         <Text style={styles.buttonText}> Search My imgBase </Text>
                    </TouchableOpacity>
                    , key: '2' },
                  // { link: <Button title={'Logout'} onPress={()=> navigate('logout')} style={ styles.menubutton } />, key: '3' },
                  { link:
                    <TouchableOpacity
                          style={[styles.buttonLargeContainer, styles.primaryButton, styles.logout]}
                          onPress={() => navigate("Login")} >
                         <Text style={styles.buttonText}> Logout </Text>
                    </TouchableOpacity>
                    , key: '3' },

               ]}
          renderItem={ ({item}) => <View> {item.link} </View>}
        />

          <View style={styles.footer}>
            <Text>Created by Adam Julier</Text>
            <Text> &laquo; adamtj.com &raquo; </Text>
          </View>

   </View>

)}
}

const styles = StyleSheet.create({
  logout: {
    marginTop: (Dimensions.get('window').height)/2.8,
  },
  buttonLargeContainer: {
    alignItems: 'center',
    marginTop: 10,
    width: 300,
    marginLeft: (Dimensions.get('window').width)/7,
  },
primaryButton: {
    backgroundColor: '#a6cbfc',
    borderRadius: 20,
  },
buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  maintext: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 5,
  },
  secondarytext: {
    fontSize: 15,
    textAlign: 'center',
    paddingBottom: 20,
  },
  footer: {
    bottom: -40,
    // marginTop: 200,
    // flex: 1,
    alignItems: 'center',
  },
  menubutton: {
    // fontSize: 45,
    padding: 50,
  },
  dividerline: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  maincontainer: {
      top: 10,
    }
});
