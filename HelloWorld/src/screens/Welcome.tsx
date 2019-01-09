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

interface State {
  email: string;
  
} 

class Welcome extends React.Component<{}, State> {
  readonly state: State = {
    email: ""
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" borderTopWidth={100} borderTopColor={colors.WHITE}>
        <View style={styles.form}>
          <Text style={styles.text}> BATATA!  </Text>
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

export default Welcome;