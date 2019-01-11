import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
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

interface State {
  loading: boolean,
  data: [],
  page: number,
  seed: number,
  error: any,
  refreshing: boolean,
}

export default class UserList extends Component {
  readonly state: State = {
    loading: false,
    data: [],
    page: 1,
    seed: 1,
    error: null,
    refreshing: false,
  };

  // constructor(props : any) {
  //   super(props);

  //   this.state = {
  //     loading: false,
  //     data: [],
  //     page: 1,
  //     seed: 1,
  //     error: null,
  //     refreshing: false,
  //   };
  // }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
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
                title={`${item.name.first} ${item.name.last}`}
                subtitle={item.email}
                avatar={{ uri: item.picture.thumbnail }}
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
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
