import * as React from "react";
import { StyleSheet, View, KeyboardAvoidingView, Text, Linking} from "react-native";
import LoginButton from "../components/LoginButton";
import FormTextInput from "../components/FormTextInput";
import colors from "../config/colors";
import strings from "../config/strings";
import Loader from "../components/Loader";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { validateEmail, validateName, validatePassword } from "../lib/validations";
import { goToLogin, goHome, goToUserDetails } from '../lib/navigation';
import editUser from "../lib/editUser";
import { Navigation } from "react-native-navigation";
import getUserById from '../lib/getUser';

interface State {
  email: string;
  name: string;
  role: string;
  loading: boolean;
  error: string;
  emailError: boolean;
  nameError: boolean;
  editable: boolean;
  buttonText: string
}

class UserDetails extends React.Component<{componentId:string, token: string, userId:number}, State> {
  readonly state: State = {
    name: "",
    email: "",
    role: "",
    loading: false,
    error: "",
    emailError: false,
    nameError: false,
    editable: false,
    buttonText: "Edit"
  };

  constructor(props:any){
    super(props);
    getUserById(this.props.token, this.props.userId)
      .then(response => response.data)
      .then(responseJson => {
        console.log(responseJson)
        this.setState({ name: responseJson.data.name });
        this.setState({ email: responseJson.data.email });
        this.setState({ role: responseJson.data.role });
      })
      ;
  }

  handleEditPress = () => {
    this.setState({ 
      editable: true,
      buttonText : "Save Changes"
     });
  }

  handleSavePress = () => {
    const {email, name, role} = this.state;
    const token = this.props.token;
    const userId = this.props.userId;
    
    if(name == ""){
        this.setState({ 
            error : "Name field is required!", 
            nameError: true, 
            emailError: false, 
        });
      }
    else if(!validateName(name)){
        this.setState({ 
            error : "Name must have only letters!", 
            nameError: true, 
            emailError: false, 
        });
      }

    else if(email==""){
      this.setState({ 
          error : "Fill email field!", 
          nameError: false, 
          emailError: true, 
        });
    }
    else if(!validateEmail(email)){
      this.setState({ 
          error : "Invalid email!", 
          nameError: false, 
          emailError: true,
        });
    }
    else if(role != "admin" && role != "user"){
        this.setState({ 
        error : "Role required!", 
        nameError: false, 
        emailError: false,
    });
    }
    else{
        this.setState({ 
          error : "" , 
          nameError: false, 
          emailError: false, 
          loading: true
        });

        editUser(token, userId, name, email, role)
        .then( response => response.data)
        .then( responseJson => {
          console.log(responseJson);
          console.warn("Changes saved!");
          this.setState({ error: "", loading: false });        
          Navigation.pop(
              this.props.componentId
            )
        })
        .catch( error => {
            this.setState({ error: "Failed to edit!", loading: false });
            console.log(error);
            console.warn(error);
            throw (error.message);
        });
    }
    this.setState({ editable: false, buttonText: "Edit" });
  };

    _menu: Menu = null;
    _role = "Role"
 
  setMenuRef = (ref:any) => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
      if(this.state.editable) this._menu.show();
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
                this.setState({name})
            }}
            placeholder="Name"
            autoCapitalize="none"
            editable={this.state.editable}
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
            editable={this.state.editable}
            />

            <Menu
            style={styles.menu}
            ref={this.setMenuRef}
            button={<Text style={{marginTop: 10}} onPress={this.showMenu}>{this._role}</Text>}
            >
                <MenuItem onPress={this.selectUser}>User</MenuItem>
                <MenuItem onPress={this.selectAdmin}>Admin</MenuItem>
            </Menu>
            
            <LoginButton label={this.state.buttonText} onPress={() => {
                this.state.editable == false ? this.handleEditPress() : this.handleSavePress()
            }} />
            <Text style={{textAlign:"center"}} onPress={() => goHome()}>or return to home</Text>
            <Loader loading={this.state.loading} />
            
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const batata : string = "";

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
    marginTop: 30
  }
});

export default UserDetails;