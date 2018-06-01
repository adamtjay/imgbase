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
    } from 'react-native';
import { Constants } from 'expo';

import CameraPhotosList from './CameraPhotosList';

import ViewLargePhoto from './partials/ViewLargePhoto';
import Navbar from './partials/nav/Navbar';
import Menu from './screens/Menu';


export default class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: {}
    }

  }

  fetchTest() {
    fetch('https://imgbase-api.herokuapp.com/api/media/3/?format=json', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   firstParam: 'yourValue',
      //   secondParam: 'yourOtherValue',
      // }),
    })
    .then(res => res.json())
    .then(data => {
      // console.log('MainView fetch: ', data.tags)
      // console.log('MainView fetch: ', data.user.id)
      console.log('MainView fetch: ', data)
      this.setState({
        photo: JSON.stringify(data)
      })
      // return data;
    }
    )
  }


  componentDidMount() {
      this.fetchTest();
      // this.postTest();
    }


  render() {

    const { photo } = this.state;

    // singlephoto props needs to be an object w/ uri property, that's then JSON stringified
    const testphoto = JSON.stringify({ 'uri': 'assets-library://asset/asset.PNG?id=FCEBD138-770F-488A-8211-AAA87BE0BAA0&ext=PNG' })

    return (

      // <Menu />


     <ScrollView>

        <Navbar  />

        <ScrollView style={ styles.maincontainer }>

          <CameraPhotosList />

        </ScrollView>

    </ScrollView>



  // <ScrollView >
  //
  //   <Navbar  />
  //
  //   <ScrollView style={ styles.maincontainer }>
  //
  //             {photo.length > 1
  //             ? <ViewLargePhoto resphoto={photo} />
  //             : <Text>Loading</Text> }
  //             />
  //
  //       </ScrollView>
  //
  // </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    top: 50,
  }
})
