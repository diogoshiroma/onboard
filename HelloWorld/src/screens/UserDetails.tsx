/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, {Component} from 'react';
import { Image, StyleSheet, View, KeyboardAvoidingView, Text, ActivityIndicator, Button, TouchableOpacity, AlertIOS, TextInput } from "react-native";
import colors from '../config/colors';
import { retrieveItem } from '../lib/asyncStorage';
import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from "react-native";
import getUserById from '../lib/getUser';
import FormTextInput from '../components/FormTextInput';

interface State {
  userName: string,
  userEmail: string
} 

class UserDetails extends React.Component<{componentId:any, userId:number, token:string}, State> {
  readonly state: State = {
    userName: '',
    userEmail: ''
  };

  componentDidMount = () => {
      getUserById(this.props.token, this.props.userId)
      .then(response => response.data)
      .then(responseJson => {
        console.log(responseJson)
        this.setState({ userName: responseJson.data.name });
        this.setState({ userEmail: responseJson.data.email });
      })
      ;
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" >
        <View style={styles.form}>
            <Text style={ styles.text } > User name: {this.state.userName}!! </Text>
            <Text style={ styles.text }> User email: {this.state.userEmail} </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
  },
  form: {
    alignItems: "center",    
    justifyContent: "center",
    width: "80%"
  },
  text: {
    color: colors.DODGER_BLUE
  },

  buttonContainer: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.BLACK,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.7)",
    marginTop: 100
  },
  buttonText: {
    color: colors.WHITE,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    height: 20
  }
});

export default UserDetails;