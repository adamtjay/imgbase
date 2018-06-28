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


export default class Login extends Component {
  static navigationOptions = {
    title: 'Login / Register',
  }
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        usertoken: null,
        failedlogin: false
     };

    this.loginUser = this.loginUser.bind(this);
    }


    loginUser() {

      //clear stored token, if there is one
      AsyncStorage.removeItem("@token")
        .catch(err => console.log(err))

          let data = JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          })

          axios.post(`https://imgbase-api.herokuapp.com/api/token/`, data, {
              headers: {
                "Content-Type": "application/json",
              }
           })
              .then((res) => {
                console.log('Login Data: ', res.data)
                AsyncStorage.setItem("@token", res.data.access)
                  .catch(err => console.log(err))
            })
                .catch(err => console.log(err))
            .then( () =>
              AsyncStorage.getItem('@token')
              .then(res => {
                this.setState({ usertoken: res })
                console.log('Token state: ', this.state.usertoken)
              })
                .catch(err => console.log(err))
          )
          .then( () => {
            if (this.state.usertoken) {
             this.props.navigation.navigate("MainMenu")
           } else {
             this.setState({ failedlogin: true })
           }
           });

        }


  render() {

    return (


    <View style={ styles.maincontainer }>

        <View style={ styles.dividerline } />
        <Text style={styles.maintext}> Login </Text>
        <View style={ styles.bottomdividerline } />

        <Text style={styles.secondarytext}> Username </Text>
        { this.state.failedlogin === false
          ? <TextInput name="username" onChangeText={(text) => this.setState({username: text})} placeholder="Username" style={styles.inputbox} />
          : <TextInput name="username" onChangeText={(text) => this.setState({username: text})} placeholder="Username" style={styles.inputfailedlogin} />
        }

        <Text style={styles.secondarytext}> Password </Text>
        { this.state.failedlogin === false
          ? <TextInput name="password" onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholder="Password" style={styles.inputbox} />
          : <TextInput name="password" onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholder="Password" style={styles.inputfailedlogin} />
        }

          <View style={{marginTop: 20}}>
              <TouchableOpacity
                   onPress={this.loginUser}
                   style={[styles.buttonLargeContainer, styles.primaryButton]} >
                  <Text style={styles.buttonText}> Login </Text>
             </TouchableOpacity>

             <TouchableOpacity
                  style={[styles.buttonLargeContainer, styles.primaryButton]}
                  onPress={() => this.props.navigation.navigate("Register")} >
                 <Text style={styles.buttonText}> Register </Text>
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
    marginLeft: 40,
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
    marginLeft: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
    backgroundColor: 'white',
    height: 40,
  },
  inputfailedlogin: {
    maxWidth: 300,
    marginLeft: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
    backgroundColor: '#f9c3c0',
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
