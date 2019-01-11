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
import { Image, StyleSheet, View, KeyboardAvoidingView, Text, ActivityIndicator, Button, TouchableOpacity } from "react-native";
import colors from '../config/colors';
import { retrieveItem } from '../lib/asyncStorage';
import { goToUserList } from '../lib/navigation';

interface State {
  userName: string;
} 

class Home extends React.Component<{}, State> {
  readonly state: State = {
    userName: ''
  };
  constructor(props: any){
    super(props);
    retrieveItem('userName').then((name) => this.setState({ userName: name }))
  }

  handleLoginPress = () => {
    goToUserList();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" >
        <View style={styles.form}>
          <Text style={ styles.text } onPress= {() => {
            retrieveItem('userName').then(response => this.setState({userName : response}))
          }}> 
          Welcome, {this.state.userName}!!</Text>
          
        </View>
        <TouchableOpacity style={ styles.buttonContainer } onPress={this.handleLoginPress} >
            <Text style={ styles.buttonText }> Users list</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    marginTop: 100
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

export default Home;