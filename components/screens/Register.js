import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  Text,
  TouchableHighlight,
  Modal,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
    } from 'react-native';
import { Constants } from 'expo';

import axios from 'axios';


export default class Register extends Component {
  static navigationOptions = {
    title: 'Registration',
  }
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        confirm_password: ''
    };


    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    }

    registerUser() {

      let data = JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        confirm_password: this.state.confirm_password
      })

      axios.post(`https://imgbase-api.herokuapp.com/api/users/`, data, {
          headers: {
            "Content-Type": "application/json",
          }
       })
          .then((res) => {
            console.log('Registered User: ', res.data)
            AsyncStorage.setItem("@username", res.data.username)
              .catch(err => console.log('Register failed: ', err))
              .then( () =>
                AsyncStorage.getItem('@username')
                .then(res => console.log('User storage: ', res))
                  .catch(err => console.log(err))
                );
            })
            .catch(err => console.log(err))
        .then( () =>
          this.loginUser(this.state.username, this.state.password)
        )

        }


        loginUser(username, password) {

              let newuserdata = JSON.stringify({
                username: username,
                password: password
              })

          axios.post(`https://imgbase-api.herokuapp.com/api/token/`, newuserdata, {
              headers: {
                "Content-Type": "application/json",
              }
           })
              .then((res) => {
                console.log('Login res Data: ', res.data)
                AsyncStorage.setItem("@token", res.data.access)
                  .catch(err => console.log(err))
                  .then( () =>  this.props.navigation.navigate("MainMenu") );
            })
                .catch(err => console.log(err))
            .then( () =>
              AsyncStorage.getItem('@token')
              .then(res => console.log('Token storage: ', res))
                .catch(err => console.log(err))
          );

            }


  render() {

    return (


    <View style={ styles.maincontainer }>

        <View style={ styles.dividerline } />
        <Text style={styles.maintext}> Register New User </Text>
        <View style={ styles.bottomdividerline } />

        <Text style={styles.secondarytext} > Username </Text>
        <TextInput name="username" onChangeText={(text) => this.setState({username: text})} placeholder="Username" style={styles.inputbox} />

        <Text style={styles.secondarytext}> Password </Text>
        <TextInput name="password" onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholder="Password" style={styles.inputbox} />

        <Text style={styles.secondarytext}> Confirm Password </Text>
        <TextInput name="confirm_password" onChangeText={(text) => this.setState({confirm_password: text})} secureTextEntry={true} placeholder="Confirm Password" style={styles.inputbox} />

          <View style={{marginTop: 20}}>
             <TouchableOpacity
                  onPress={this.registerUser}
                  style={[styles.buttonLargeContainer, styles.primaryButton]} >
                 <Text style={styles.buttonText}> Sign Up </Text>
            </TouchableOpacity>
          </View>

     </View>

)}
}

const styles = StyleSheet.create({
  buttonLargeContainer: {
    alignItems: 'center',
    marginTop: 10,
    width: 300,
    marginLeft: (Dimensions.get('window').width)/7.5,
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
  inputbox: {
    maxWidth: 300,
    marginLeft: (Dimensions.get('window').width)/7.5,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
    backgroundColor: 'white',
    height: 40,
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
    paddingTop: 20,
    paddingBottom: 10,
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
  bottomdividerline: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingTop: 10,
    marginBottom: 15,
  },
  maincontainer: {
      top: 10,
      // flex: 1,
      // alignItems: 'center',
    }
});
