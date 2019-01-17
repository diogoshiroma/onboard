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
import { StyleSheet, View, KeyboardAvoidingView, Text, ActivityIndicator, Button, TouchableOpacity, Alert, TextInput } from "react-native";
import colors from '../config/colors';
import { retrieveItem } from '../lib/asyncStorage';
import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from "react-native";
import { goToLogin } from '../lib/navigation';

interface State {
  userName: string,
  token: string,
  userId: string
} 

class Home extends React.Component<{componentId:any}, State> {
  readonly state: State = {
    userName: '',
    token: '',
    userId: ''
  };
  constructor(props: any){
    super(props);
    retrieveItem('userName').then((name) => this.setState({ userName: name }))
    retrieveItem('token').then((token) => this.setState({ token: token }))
  };

  handleUserList = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'UserList',
        options: {
          topBar: {
            title: {
              text: 'User List'
            }
          }
        },
        passProps: {
          token: this.state.token
        }
      }
    })
  };

  handleCreateUser = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'CreateUser',
        options: {
          topBar: {
            title: {
              text: 'Create User'
            }
          }
        },
        passProps: {
          token: this.state.token
        }
      }
    });
  };

  handleLogoutPress = async () => {
    AsyncStorage.removeItem('token');
    // await Alert.alert('You have been logged out.');
    goToLogin();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" >
        <View style={styles.form}>
          <Text style={ styles.text }> Welcome, {this.state.userName}!! </Text>

          <TouchableOpacity style={ styles.buttonContainer } onPress={this.handleUserList} >
            <Text style={ styles.buttonText }> Users list</Text>
          </TouchableOpacity>


          <TouchableOpacity style={ styles.buttonContainer } onPress={this.handleCreateUser} >
            <Text style={styles.buttonText}>Create user</Text>
          </TouchableOpacity>


          <TouchableOpacity style={ styles.buttonContainer } onPress={this.handleLogoutPress} >
              <Text style={ styles.buttonText }> Logout </Text>
          </TouchableOpacity>
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

export default Home;