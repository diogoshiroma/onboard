import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import { WebView } from "react-native";
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { Button, List, ListItem, Icon } from 'react-native-elements';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const UserIcon = <Icon type='font-awesome' name='user' size={20} reverse/>



@observer
class Test extends Component{

  // @observable value = 1;
  @observable data=[{name: "aaaaaa", role: 'admin'}, {name: 'b', role: 'user'}]


  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={{marginTop:150}}> Result: {this.value} </Text>
        <Text > Computed Result: {this.computedValue} </Text>
        <Button title="Roll" onPress={this.handleRoll}/> */}

       {this.renderItem}
        <Button title="add" onPress={this.addItem}/>

      </View>
    );
  }

  // @computed get computedValue () {
  //   return this.value > 3 ? "WIN" : "LOSE"
  // }

  // handleRoll = () => {
  //   this.value = Math.floor(Math.random()*6) + 1;
  // }

  @computed get renderItem () {return (
    
      this.data.map((item, i) => (
        <ListItem
          key={i}
          title={item.name}
          subtitle={item.role}
          leftIcon={UserIcon}
        />
      ))
    
  )};

  addItem = () => {
    this.data.push({name:"lolol", role:"user"})
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Test;