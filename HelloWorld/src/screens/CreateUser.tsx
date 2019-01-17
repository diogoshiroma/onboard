import * as React from "react";
import { StyleSheet, View, KeyboardAvoidingView, Text, Linking, Alert} from "react-native";
import LoginButton from "../components/LoginButton";
import FormTextInput from "../components/FormTextInput";
import colors from "../config/colors";
import strings from "../config/strings";
import Loader from "../components/Loader";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { validateEmail, validateName, validatePassword } from "../lib/validations";
import { goToLogin, goHome } from '../lib/navigation';
import createUser from "../lib/createUser";
import { Icon, Button } from "react-native-elements"


interface State {
  email: string;
  name: string;
  password: string;
  passConfirmation: string;
  role: string;
  loading: boolean;
  error: string;
  emailError: boolean;
  nameError: boolean;
  passwordError: boolean;
  confirmationError: boolean;
}

class CreateUser extends React.Component<{token: string}, State> {
  readonly state: State = {
    email: "",
    name: "",
    password: "",
    role: "",
    passConfirmation: '',
    loading: false,
    error: "",
    emailError: false,
    nameError: false,
    passwordError:false,
    confirmationError: false
  };

  handleCreatePress = () => {
    const {email, password, passConfirmation, name, role} = this.state;
    const token = this.props.token;

    if(name == ""){
        this.setState({ 
            error : "Name field is required!", 
            nameError: true, 
            emailError: false, 
            passwordError: false,
            confirmationError: false
        });
      }
    else if(!validateName(name)){
        this.setState({ 
            error : "Name must have only letters!", 
            nameError: true, 
            emailError: false, 
            passwordError: false,
            confirmationError: false
        });
      }

    else if(email==""){
      this.setState({ 
          error : "Fill email field!", 
          nameError: false, 
          emailError: true, 
          passwordError:false,
          confirmationError: false
        });
    }
    else if(!validateEmail(email)){
      this.setState({ 
          error : "Invalid email!", 
          nameError: false, 
          emailError: true, 
          passwordError: false,
          confirmationError: false
        });
    }
    else if(!validatePassword(password)){
      this.setState({ 
          error : "Invalid password!", 
          nameError: false, 
          emailError: false,
          passwordError: true, 
          confirmationError: false
        });
    }
    else if(password != passConfirmation){
        this.setState({ 
            error : "Those passwords didn`t match!", 
            nameError: false, 
            emailError: false,
            passwordError: false, 
            confirmationError: true
        });
    }
    else if(role != "admin" && role != "user"){
        this.setState({ 
        error : "Role required!", 
        nameError: false, 
        emailError: false,
        passwordError: false, 
        confirmationError: false
    });
    }
    else{
        this.setState({ 
          error : "" , 
          nameError: false, 
          emailError: false, 
          passwordError: false, 
          confirmationError: false,
          loading: true
        });

        createUser(token, name, email, password, role)
        .then( response => response.data)
        .then( responseJson => {
          console.log(responseJson);
          console.warn("User successfully created!");
        })
        .catch( error => {
            console.log(error);
            console.warn(error);
            throw (error.message);
        });
    }
  };

    _menu : Menu = null;
    _role = "Role"
 
  setMenuRef = (ref : any) => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    if(this._menu) this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };

  selectAdmin = () => {
    this.setState({ role: "admin" })
    this._role = "Admin"
    this._menu.hide();
  }
  
  selectUser = () => {
    this.setState({ role: "user" })
    this._role = "User"
    this._menu.hide();
  }

  render() {
    return (
      <KeyboardAvoidingView style={ styles.container } >
        <View style={ styles.form }>

            <Text style={ styles.error }> { this.state.error } </Text>

            <FormTextInput
            style={ this.state.nameError==true ? styles.validationError : null }
            value={this.state.name }
            onChangeText={ name => {
                this.setState({name});
            }}
            placeholder="Name"
            autoCapitalize="none"
            />

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

            <FormTextInput
            style={this.state.confirmationError==true ? styles.validationError : null}
            value={this.state.passConfirmation}
            onChangeText={passConfirmation => this.setState({passConfirmation})}
            placeholder="Confirm password"
            secureTextEntry
            autoCapitalize="none"
            />

            <Menu
            style={styles.menu}
            ref={this.setMenuRef}
            // button={<Text style={{marginTop: 10}}onPress={this.showMenu}>{this._role}</Text>}
            button={
              <Button 
              buttonStyle={styles.menuButton}
              backgroundColor={colors.LIGHT_GRAY}
              textStyle={{color: colors.SILVER}}
              onPress={ this.showMenu } 
              title={this._role}
              rightIcon={{name:"chevron-down", type:"entypo"}}
              fontSize={14}
            />
            }
            >
                <MenuItem onPress={this.selectUser}>User</MenuItem>
                <MenuItem onPress={this.selectAdmin}>Admin</MenuItem>
            </Menu>
            
            <LoginButton label="Create" onPress={this.handleCreatePress} />
            <Text style={{textAlign:"center"}} onPress={() => goHome()}>or return to home</Text>
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
    marginBottom: 0
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
  },

  menu: {
    marginTop: 40,
    marginLeft: 14
  },

  menuButton: {
    width: 80,
    padding: 10,
  }
});

export default CreateUser;