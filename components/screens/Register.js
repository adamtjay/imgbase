import React, { Component } from 'react';
import {
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


export default class Register extends Component {
  static navigationOptions = {
    title: 'Registration',
  }
  constructor(props) {
    super(props);

    this.state = {  };

    }


  render() {

    return (


    <View style={ styles.maincontainer }>

        <View style={ styles.dividerline } />
        <Text style={styles.maintext}> Register New User </Text>
        <View style={ styles.bottomdividerline } />

        <Text style={styles.secondarytext}> Username </Text>
        <TextInput name="username" placeholder="Username" style={styles.inputbox} />

        <Text style={styles.secondarytext}> Password </Text>
        <TextInput name="password" secureTextEntry={true} placeholder="Password" style={styles.inputbox} />

        <Text style={styles.secondarytext}> Confirm Password </Text>
        <TextInput name="confirm_password" secureTextEntry={true} placeholder="Confirm Password" style={styles.inputbox} />

          <View style={{marginTop: 20}}>
             <TouchableOpacity
                  style={[styles.buttonLargeContainer, styles.primaryButton]}
                  onPress={() => this.props.navigation.navigate("Register")} >
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
