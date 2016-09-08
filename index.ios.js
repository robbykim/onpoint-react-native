import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicatorIOS
} from 'react-native';

const Games = require('./js/games');
const teamStorage = require('./js/teamStorage');
const CLIENT_KEY = '907bed7a31d8fa587d85ccea44e158c9';
const FIRST_DAY = 1473220800000;
const ONE_WEEK = 604800000;

class OnPointFantasy extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      isLoading: true,
    };
  }

  fetchSchedule() {
    const currentTime = new Date().getTime();
    let week = 1;
    let timeDiff = currentTime - FIRST_DAY;
    while (timeDiff > ONE_WEEK) {
      timeDiff -= ONE_WEEK;
      week++;
    }

    const url = `https://api.stattleship.com/football/nfl/games?week=${week}`;
    const init = {
      headers: {
        Accept: 'application/vnd.stattleship.com; version=1',
        'Content-Type': 'application/json',
        Authorization: `Token token=${CLIENT_KEY}`,
      }
    }

    fetch(url, init)
      .then(response => response.json())
      .then(jsonData => {
        this.getGames(jsonData.games);
      })
      .catch(err => console.log(err));
  }

  getGames(games) {
    const gamesArray = [];
    games.forEach(game => {
      const homeTeam = teamStorage.filter(team => {
        return team.id === game.home_team_id;
      })[0];

      const awayTeam = teamStorage.filter(team => {
        return team.id === game.away_team_id;
      })[0];

      gamesArray.push({
        homeTeam: homeTeam.name,
        awayTeam: awayTeam.name,
        homeScore: game.home_team_score,
        awayScore: game.away_team_score,
        period: game.period,
        clock: game.clock,
        startTime: game.started_at,
        status: game.status,
      });
    });

    this.setState({
      games: gamesArray,
      isLoading: false,
    });
  }

  renderLoadingMessage() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicatorIOS
          animating={true}
          color={'#fff'}
          size={'small'}
          style={{ margin: 15 }}
        />
        <Text style={{ color: '#fff' }}>Loading Scores</Text>
      </View>
    );
  }

  renderResults() {
    const gamesArray = [];
    this.state.games.forEach((game, index) => {
      gamesArray.unshift(
        <Games game={game} key={index} />
      );
    });

    return (
      <View>
        <View style={styles.title}>
          <Text>This Week's Games</Text>
        </View>
        <ScrollView>
          {gamesArray}
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    this.fetchSchedule();
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return this.renderLoadingMessage();
    } else {
      return this.renderResults();
    }
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555',
  }
});

AppRegistry.registerComponent('OnPointFantasy', () => OnPointFantasy);
