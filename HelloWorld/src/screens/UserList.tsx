import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements'

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
]


export default class UserList extends Component {

  render() {
    return (
      // <View style={styles.container}>
      //   <FlatList
      //     data={[
      //       {key: 'Devin'},
      //       {key: 'Jackson'},
      //       {key: 'James'},
      //       {key: 'Joel'},
      //       {key: 'John'},
      //       {key: 'Jillian'},
      //       {key: 'Jimmy'},
      //       {key: 'Julie'},
      //     ]}
      //     renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      //   />
      // </View>
      <View style={styles.container}>
        <List containerStyle={{marginBottom: 20}}>
          {
            list.map((l) => (
              <ListItem
                roundAvatar
                avatar={{uri:l.avatar_url}}
                key={l.name}
                title={l.name}
                subtitle={l.subtitle}
              />
            ))
          }
        </List>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
