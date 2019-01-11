import {Navigation} from 'react-native-navigation';
import UserList from '../screens/UserList';

export function registerScreens() {
  Navigation.registerComponent('Login', () => require('../screens/Login').default);
  // Navigation.registerComponent('Initializing', (sc) => require('./Initializing').default);
  Navigation.registerComponent('Home', () => require('../screens/Home').default);
  Navigation.registerComponent('UserList', () => require('../screens/UserList').default);
}