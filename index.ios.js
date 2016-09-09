import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicatorIOS,
  RefreshControl
} from 'react-native';

// module that allows swiping
const Swiper = require('react-native-swiper');

// Games component that creates each individual cell component
const Games = require('./js/games');

// Internal storage of all 32 NFL team IDs
const teamStorage = require('./js/teamStorage');

// for each swiping page
const Pages = require('./js/pages');
const LoadingScreen = require('./js/loadingScreen');

// API Client Token for Stattleship and CONSTANTS
const CLIENT_KEY = '907bed7a31d8fa587d85ccea44e158c9';
const FIRST_DAY = 1473220800000;
const ONE_WEEK = 604800000;

/** Primary Component for App */
class OnPointFantasy extends Component {

  // constructor function that holds the state for the games that were loaded
  // and the whether or not the application is loading to display a loading Page
  constructor() {
    super();
    this.state = {
      games: [],
      isLoading: true,
      refreshing: false,
    };

    this._onRefresh = this._onRefresh.bind(this);
  }

  // Fetch request happens in here where it will call the API and receive the
  // current weeks schedule. it will then pass the list of games to this.getGames
  fetchSchedule() {
    // Algorithm to get the current week
    // starts with getting the current time in milliseconds
    const currentTime = new Date().getTime();
    let week = 1;

    // subtracts the current time with the first day of the NFL season (Wed 9/7)
    let timeDiff = currentTime - FIRST_DAY;

    // while the difference is greater than 1 week in ms, it will loop
    while (timeDiff > ONE_WEEK) {
      // subtracts by a week every iteration and iterates what week it is
      timeDiff -= ONE_WEEK;
      week++;
    }

    // API url to get the games of a given week. week (number) is calculated above
    const url = `https://api.stattleship.com/football/nfl/games?week=${week}`;
    // passing specific headers that the api requires. API receives
    // auth token only via a authorization header
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

  // getGames will take the games array from this.fetchSchedule and for each game,
  // push an object into the games array and then set this.state.games to the new array
  getGames(games) {
    const gamesArray = [];

    // grabbing the matching team names given a team id
    games.forEach(game => {
      const homeTeam = teamStorage.filter(team => {
        return team.id === game.home_team_id;
      })[0];

      const awayTeam = teamStorage.filter(team => {
        return team.id === game.away_team_id;
      })[0];

      gamesArray.push({
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        homeScore: game.home_team_score,
        awayScore: game.away_team_score,
        period: game.period,
        clock: game.clock,
        startTime: game.started_at,
        status: game.status,
      });
    });

    // sets a new state and changes isLoading to false
    this.setState({
      games: gamesArray,
      isLoading: false,
      refreshing: false,
    });
  }

  // will render when isLoading is true
  renderLoadingMessage() {
    return (
      <LoadingScreen />
    );
  }

  // will render when isLoading is false
  renderResults() {
    const progressGames = [];
    const completedGames = [];

    // for each game in the new state.games it will add to an array based off
    // whether a game is completed or not. Games component creates each individual
    // box score that will display on the screen
    this.state.games.forEach((game, index) => {
      if (game.status === 'closed') {
        completedGames.unshift(
          <Games game={game} key={index} />
        );
      } else {
        progressGames.unshift(
          <Games game={game} key={index} />
        );
      }
    });

    return (
      <View style={styles.container}>
        <Swiper
          dot={<View style={styles.dot}/>}
          activeDot={<View style={styles.activeDot}/>}
          loop={false}
        >
          <Pages
            title={<Text>This Week's Games</Text>}
            refreshing={this.state.refreshing}
            _onRefresh={this._onRefresh}
            games={progressGames}
          />
          <Pages
            title={<Text>Completed Games</Text>}
            refreshing={this.state.refreshing}
            _onRefresh={this._onRefresh}
            games={completedGames}
          />
        </Swiper>
      </View>
    );
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.fetchSchedule();
  }
  // when component first mounts, it will fetch the schedule
  componentDidMount() {
    this.fetchSchedule();
  }

  // will determine if app is loading or not and run either
  // this.renderLoadingMessage or this.renderResults
  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return this.renderLoadingMessage();
    } else {
      return this.renderResults();
    }
  }
}

// stylesheet for the Component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C5C3C6'
  },

  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: 8,
    height: 8,
    borderRadius: 10,
    margin: 3,
  },

  activeDot: {
    backgroundColor: '#fff',
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
  }
});

AppRegistry.registerComponent('OnPointFantasy', () => OnPointFantasy);
