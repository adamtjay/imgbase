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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
    this.getLastLoggedIn = this.getLastLoggedIn.bind(this);
    }

    loginUser() {
      //clear stored token, if there is one
      AsyncStorage.removeItem("@token")
        .catch(err => console.log(err))

          let logindata = JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          })

          axios.post(`https://imgbase-api.herokuapp.com/api/token/`, logindata, {
              headers: {
                "Content-Type": "application/json",
              }
           })
              .then((res) => {
                console.log('Login Data: ', res.data)
                AsyncStorage.setItem("@token", res.data.access)
                  .catch(err => console.log(err))
                AsyncStorage.setItem("@username", this.state.username)
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
            // if login successful, reset state except username, navigate to mainmenu
            if (this.state.usertoken) {
              this.setState({
                password: '',
                usertoken: null,
                failedlogin: false
              })
             this.props.navigation.navigate("MainMenu")
           } else {
             // login not successful, update state to show failed login
             this.setState({
               failedlogin: true,
               password: '',
               usertoken: null,
               loaded: true
              })
           }
           });
        }

        getLastLoggedIn() {
          AsyncStorage.getItem('@username')
          .then(res => {
            this.setState({ username: res })
          })
            .catch(err => console.log(err))
        }

  componentDidMount() {
    this.getLastLoggedIn();
      }

  render() {

    return (

  <View style={ styles.maincontainer }>

        <View style={ styles.dividerline } />
        <Text style={styles.maintext}> imgBase </Text>
        <View style={ styles.bottomdividerline } />

        <Text style={styles.secondarytext}> Username </Text>
        { this.state.failedlogin === false
          ? <TextInput name="username" value={this.state.username} onChangeText={(text) => this.setState({username: text})} placeholder="Username" style={styles.inputbox} />
          : <TextInput name="username" value={this.state.username} onChangeText={(text) => this.setState({username: text})} placeholder="Username" style={styles.inputfailedlogin} />
        }

        <Text style={styles.secondarytext}> Password </Text>
        { this.state.failedlogin === false
          ? <TextInput name="password" value={this.state.password} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholder="Password" style={styles.inputbox} />
          : <TextInput name="password" value={this.state.password} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholder="Password" style={styles.inputfailedlogin} />
        }

          <View style={{marginTop: 20}}>
              <TouchableOpacity
                   onPress={this.loginUser}
                   style={[styles.buttonLargeContainer, styles.primaryButton] } >
                  <Text style={styles.buttonText}> Login </Text>
             </TouchableOpacity>

             <TouchableOpacity
                  style={[styles.buttonLargeContainer, styles.primaryButton]}
                  onPress={() => {
                      this.setState({
                        password: '',
                        usertoken: null,
                        failedlogin: false
                      })
                      this.setState({loaded:false})
                      this.props.navigation.navigate("Register", {resetLoginUser: this.getLastLoggedIn})} } >
                 <Text style={styles.buttonText}> Register New User </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text>Created by Adam Julier</Text>
            <Text> &laquo; adamtj.com &raquo; </Text>
          </View>

     </View>

)}
}

const styles = StyleSheet.create({
  footer: {
    bottom: wp('-70%'),
    // marginTop: 200,
    // flex: 1,
    alignItems: 'center',
  },
  buttonLargeContainer: {
    alignItems: 'center',
    marginTop: 10,
    width: wp('80%'),
    marginLeft: wp('10.7%'),
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
    maxWidth: wp('80%'),
    marginLeft: wp('10.7%'),
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
    backgroundColor: 'white',
    height: 40,
  },
  inputfailedlogin: {
    maxWidth: wp('80%'),
    marginLeft: wp('10.7%'),
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
    }
});
