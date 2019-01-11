import { Navigation } from 'react-native-navigation'

export const goToAuth = () => Navigation.setRoot({
  root: {
    component: {
        name: 'Home'
    }
  }
});

export const goToUserList = () => Navigation.setRoot({
  root: {
    component: {
        name: 'UserList'
    }
  }
});

export const goHome = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'Home',
          }
        }
    ],
    }
  }
})