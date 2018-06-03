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
    } from 'react-native';
import { Constants } from 'expo';


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
    const { navigate } = this.props.navigation;

    return (


      <View style={ styles.maincontainer }>

        <View style={ styles.dividerline } />

        <Text style={ styles.maintext}> imgBase </Text>
        <Text style={ styles.secondarytext}> &laquo; Turn your photos into a searchable database &raquo; </Text>

        <View style={ styles.dividerline } />

        <FlatList
          data={[
                  { link: <Button title={'Tag New Photos'} onPress={()=> navigate('CameraRollPhotosList')} style={ styles.menubutton } />, key: '1' },
                  { link: <Button title={'Search imgBase'} onPress={()=> navigate('ImgBaseList')} style={ styles.menubutton } />, key: '2' },
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
    marginTop: 420,
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
