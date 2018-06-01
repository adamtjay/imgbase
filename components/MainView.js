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

import ViewLargePhoto from './partials/ViewLargePhoto';


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

    return (

          // <PhotosList />

<View>
        {photo.length > 1
        ? <ViewLargePhoto resphoto={photo} />
        : <Text>Loading</Text> }
        />
</View>
      // <ViewLargePhoto resphoto={this.state.photo} />
      // <SinglePhotoView />

    );
  }
}
