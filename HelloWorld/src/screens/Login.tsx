import * as React from "react";
import { Image, StyleSheet, View, KeyboardAvoidingView, Alert, Text, ActivityIndicator } from "react-native";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../assets/images/logo.png";
import colors from "../config/colors";
import strings from "../config/strings";
import Loader from "../components/Loader";
import authentication from "../lib/authentication";
import { goHome, goToAuth } from "./navigation";
import { storeItem, retrieveItem } from "../lib/asyncStorage";

interface State {
  email: string;
  password: string;
  loading: boolean;
  token: string;
  error: string
}

class Login extends React.Component<{}, State> {
  readonly state: State = {
    email: "",
    password: "",
    loading: false,
    token: "",
    error: ""
  };

  validateEmail = (email : string) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  handleLoginPress = () => {
    const {email, password} = this.state;

    if(email==""){
      this.setState({ error : "Fill email field!" });
    }
    else if(!this.validateEmail(this.state.email)){
      this.setState({ error : "Invalid email!" });
    }
    else if(password==""){
      this.setState({ error : "Invalid password!" });
    }
    else{
      this.setState({ error : "" , loading: true});
      // this.closeActivityIndicator();

      authentication(this.state.email, this.state.password)
      .then( response => response.data )
      .then(responseJson => {
        console.log(responseJson);
        storeItem("token", responseJson.data.token);
        storeItem("userName", responseJson.data.user.name);
        retrieveItem("token").then(console.log);
        retrieveItem("userName").then(console.log);
        
        goToAuth();
      
      })
      .catch((error) => {
        this.setState({ error: 'Usuário ou senha incorreta!', loading: false });  
        console.log(error);
        throw (error.message);
      });
    }
  };

  closeActivityIndicator = () => setTimeout(() => this.setState({
    loading: false }), 3000);

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" borderTopWidth={100} borderTopColor={colors.WHITE}>
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form} borderBottomWidth={100} borderBottomColor={colors.WHITE}>
        
          <Text style={styles.error}> {this.state.error} </Text>
          <FormTextInput
            value={this.state.email}
            onChangeText={ email => this.setState({email}) }
            placeholder={strings.EMAIL_PLACEHOLDER}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <FormTextInput
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            placeholder={strings.PASSWORD_PLACEHOLDER}
            secureTextEntry
            autoCapitalize="none"
          />
          <Button label={strings.LOGIN} onPress={this.handleLoginPress} />
          <Loader loading={this.state.loading} />
          
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
  logo: {
    flex: 1,
    width: "70%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  },

  error: {
    color: colors.TORCH_RED, 
    textAlign: 'center'
  }
});

export default Login;