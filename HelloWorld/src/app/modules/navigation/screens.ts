import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('Login', () => require('../../../screens/Login').default);
  Navigation.registerComponent('Initializing', () => require('./initializing').default);
  Navigation.registerComponent('Home', () => require('../../../screens/Home').default);
  Navigation.registerComponent('UserList', () => require('../../../screens/UserList').default);
  Navigation.registerComponent('UserDetails', () => require('../../../screens/UserDetails').default);
  Navigation.registerComponent('CreateUser', () => require('../../../screens/CreateUser').default);
  
  Navigation.registerComponent('Test', () => require('../../../screens/Test').default);
}