import React from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { goHome, goToLogin } from "./navigation";

class Initializing extends React.Component {
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        goHome();
      } else {
        goToLogin();
      }
    } catch (err) {
      console.log("error: ", err);
      goToLogin();
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Loading</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default Initializing;
