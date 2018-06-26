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
    } from 'react-native';
import { Constants } from 'expo';


export default class ViewImgBasePhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      filteredTags: '',
     };

    this._onImgPress = this._onImgPress.bind(this);
    this.filterTagsFromProps = this.filterTagsFromProps.bind(this);
    }

  _onImgPress() {
      // add img objs to active array in PhotosList state
      this.props.updateActiveArr(this.props.resphoto);
      // Alert.alert(`Touchable working (${this.props.resphoto.fields.uri})`);
    }

  filterTagsFromProps() {
    this.setState({ filteredTags: '' })
    // take tags from props, filter, move that to state, use in inputbox
    kwarray = []
    lowercaseterms = this.props.resphoto.fields.tags.toLowerCase()
    filtered = lowercaseterms.replace(/[^a-zA-Z0-9,]/g, "")
    filteredtags = filtered.split(',').join(' ')
    // console.log('filtered tags:' , filteredtags)
    this.setState({
      filteredTags: filteredtags
    })

  }

  componentDidMount() {
    this.filterTagsFromProps();
  }


  render() {

    return (

      <TouchableHighlight
        onPress={this._onImgPress}
        key={this.props.resphoto.fields.filename} >

            <View style={ this.state.isActive ? styles.activeContainer : styles.imgContainer } >

                    <Image
                      key={this.props.resphoto.fields.filename}
                      source={this.props.resphoto.fields}
                      resizeMode="contain"
                      style={ styles.resimg }
                    />

                    {this.props.activePhotos.map(statephoto => {
                      if (statephoto.filename === this.props.resphoto.fields.filename) { this.state.isActive = true }
                    }) }

                    {/* { this.state.isActive && !this.props.fromImgbase
                      ? <Text name="removeactive" onPress={() => Alert.alert('Remove pressed') } style={ styles.removeactive } > X </Text>
                      : this.state.isActive } */}


                    { this.props.fromImgbase
                      ? <TextInput name="edittags" value={this.state.filteredTags} onChangeText={(text) => this.setState({filteredTags: text})} placeholder={'Edit Tags'} style={ styles.tagsbox } numberOfLines={4}/>
                      : this.state.isActive }



                </View>

          </TouchableHighlight>

)}
}

const styles = StyleSheet.create({
  removeactive: {
    zIndex: 50,
    width: 20,
    height: 20,
    // backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    top: 20,
    right: 20,
    position: 'absolute',
  },
  tagsbox: {
    maxWidth: 300,
    marginLeft: 30,
    marginTop: 15,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 18,
    backgroundColor: 'white',
    height: 30,
  },
  imgContainer: {
    width: 360,
    display: 'block',
    display: 'flex',
    marginTop: 20,
    marginLeft: 7.5,
    borderWidth: 1,
    borderRadius: 20,
    paddingBottom: 15,
  },
  activeContiner: {
    width: 400,
    display: 'block',
    display: 'flex',
    marginTop: 20,
    marginLeft: 4,
    borderWidth: 1,
    borderRadius: 20,
    paddingBottom: 15,
  },

  touchable: {
    // backgroundColor: 'red',

  },
  resimg: {
    height: 320,
    width: 250,
    resizeMode: 'contain',
    display: 'flex',
    marginTop: 10,
    marginLeft: 0,
    padding: '50%',
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
