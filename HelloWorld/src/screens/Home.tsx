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
import { Image, StyleSheet, View, KeyboardAvoidingView, Alert, Text, ActivityIndicator } from "react-native";
import colors from '../config/colors';
import { retrieveItem } from '../lib/asyncStorage';

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

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" borderTopWidth={100} borderTopColor={colors.WHITE}>
        <View style={styles.form}>
          <Text style={ styles.text } onPress= {() => {
            retrieveItem('userName').then(response => this.setState({userName : response}))
          }}> 
          Welcome, {this.state.userName}!!</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center"
  },
  form: {
    alignItems: "center",    
    justifyContent: "center",
    width: "80%"
  },
  text: {
    color: colors.DODGER_BLUE
  }
});

export default Home;