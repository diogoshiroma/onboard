import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('Login', () => require('../screens/Login').default);
  // Navigation.registerComponent('Initializing', (sc) => require('./Initializing').default);
  Navigation.registerComponent('Home', () => require('../screens/Home').default);
}