import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

const CLIENT_KEY = 'uqqaepdgdqttrvgxn2g876g4';

class OnPointFantasy extends Component {
  constructor() {
    super();
    this.state = {
      currentWeek: 0
    };
  }

  fetchJSON() {
    console.log('will fetch game info');
    const url = `https://api.sportradar.us/nfl-ot1/games/2016/REG/schedule.json?api_key=${CLIENT_KEY}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(jsonData => {
        console.log(jsonData);
      })
      .catch(err => console.log(`fetch error ${err}`));
  }

  componentDidMount() {
    this.fetchJSON();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu TEST
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

AppRegistry.registerComponent('OnPointFantasy', () => OnPointFantasy);
