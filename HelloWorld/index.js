/** @format */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


import {Navigation} from 'react-native-navigation';
import { registerScreens } from './src/lib/screens'
import UserList from './src/screens/UserList';
import Login from './src/screens/Login';
import Home from './src/screens/Home';

registerScreens();
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {

      component: {
        name: 'Login'
        // name: 'Home'
      }
    },
  });
});
