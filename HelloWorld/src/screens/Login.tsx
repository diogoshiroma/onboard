import * as React from "react";
import { Image, StyleSheet, View, KeyboardAvoidingView, Alert, Text, ActivityIndicator } from "react-native";
import LoginButton from "../components/LoginButton";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../assets/images/logo.png";
import colors from "../config/colors";
import strings from "../config/strings";
import Loader from "../components/Loader";
import authentication from "../lib/authentication";
import { goHome } from "../lib/navigation"
import { storeItem, retrieveItem } from "../lib/asyncStorage";
import { validateEmail } from "../lib/validations";

interface State {
  email: string;
  password: string;
  loading: boolean;
  token: string;
  error: string;
  emailError: boolean;
  passwordError: boolean
}

class Login extends React.Component<{}, State> {
  readonly state: State = {
    email: "",
    password: "",
    loading: false,
    token: "",
    error: "",
    emailError: false,
    passwordError:false
  };

  handleLoginPress = () => {
    const {email, password} = this.state;

    if(email==""){
      this.setState({ error : "Fill email field!", emailError: true, passwordError:false });
    }
    else if(!validateEmail(this.state.email)){
      this.setState({ error : "Invalid email!", emailError: true, passwordError: false });
    }
    else if(password==""){
      this.setState({ error : "Invalid password!", passwordError: true, emailError: false });
    }
    else{
      this.setState({ error : "" , emailError: false, passwordError: false, loading: true});

      authentication(this.state.email, this.state.password)
      .then( response => response.data )
      .then(responseJson => {
        console.log(responseJson);
        storeItem("token", responseJson.data.token);
        storeItem("userName", responseJson.data.user.name);

        goHome();      
      })
      .catch((error) => {
        this.setState({ error: 'Invalid email or password!', loading: false });  
        console.log(error);
        throw (error.message);
      });
    }
  };


  render() {
    return (
      <KeyboardAvoidingView style={ styles.container } behavior="padding">
        <Image source={ imageLogo } style={ styles.logo } />
        <View style={ styles.form }>
        
          <Text style={ styles.error }> { this.state.error } </Text>
          <FormTextInput
            style={ this.state.emailError==true ? styles.validationError : null }
            value={this.state.email }
            onChangeText={ email => {
              this.setState({email})
           }}
            placeholder={strings.EMAIL_PLACEHOLDER}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <FormTextInput
            style={ this.state.passwordError==true ? styles.validationError : null }
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            placeholder={strings.PASSWORD_PLACEHOLDER}
            secureTextEntry
            autoCapitalize="none"
          />
          <LoginButton label={strings.LOGIN} onPress={this.handleLoginPress} />
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
    alignItems: "center",
    marginTop: 100,
    marginBottom: 0
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
    width: "80%",
    marginBottom: 100
  },

  error: {
    color: colors.TORCH_RED, 
    textAlign: 'center'
  },

  validationError: {
    borderWidth: 1,
    borderColor: colors.TORCH_RED
  }
});

export default Login;