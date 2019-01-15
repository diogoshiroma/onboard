import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements'
import { retrieveItem } from '../lib/asyncStorage';
import { Navigation } from 'react-native-navigation';

const UserIcon = <Icon type='font-awesome' name='user' size={20} reverse/>

interface State {
  loading: boolean,
  data: [],
  page: number,
  error: any,
  refreshing: boolean
}

export default class UserList extends React.Component<{componentId:any, token: string}, State> {
  readonly state: State = {
    loading: false,
    data: [],
    page: 1,
    error: null,
    refreshing: false,
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    const { page } = this.state;
    const token = this.props.token;
    const url = `https://tq-template-server-sample.herokuapp.com/users?pagination={"page": ${this.state.page} , "window": 10}`;

    this.setState({ loading: true });
    fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }})
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.data : [...this.state.data, ...res.data],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
          marginBottom: 50
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 }, () => this.makeRemoteRequest())
  }

  render() {
    return (
      <View style={styles.container}>
        <List>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={`${item.name}`}
                subtitle={item.role}
                avatar={UserIcon}
                onPress={ () => {
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: 'UserDetails',
                      options: {
                        topBar: {
                          title: {
                            text: 'User Details'
                          }
                        }
                      },
                      passProps: {
                        userId: item.id,
                        token: this.props.token
                      }
                    }
                  })

                }}
              />
            )}
            keyExtractor={item => item.email}
            ListFooterComponent={this.renderFooter}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
