import { Navigation } from 'react-native-navigation'

export const goToLogin = () => Navigation.setRoot({
  root: {
    component: {
        name: 'Login'
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
            options: {
              topBar: {
                title: {
                  text: "Home"
                }
              }
            }
          }
        }
    ],
    }
  }
})