import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

function Games(props) {
  let quarter;
  let clock;
  if (props.game.status === 'upcoming') {
    const date = new Date(props.game.startTime);
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const timeOfDay = date.getHours() > 12 ? 'PM' : 'AM';

    let day;
    switch (date.getDay()) {
      case 0: {
        day = 'Sun';
        break;
      }
      case 1: {
        day = 'Mon';
        break;
      }
      case 4: {
        day = 'Thurs';
        break;
      }
      case 6: {
        day = 'Sat';
        break;
      }
      default: {
        day = '';
      }
    }

    quarter = `${day} ${hour}:${minute} ${timeOfDay}`;
    clock = '';
  } else if (props.game.status === 'in_progress') {
    quarter = `${props.game.period}th Qtr`;
    clock = props.game.clock;
  } else {
    quarter = 'Completed';
    clock = 'FT';
  }
  const time = new Date(props.game.startTime);
  console.log(props.game.homeTeam.logo);

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={[styles.score, styles.logo]}
          source={{ uri: props.game.homeTeam.logo }}
        />
        <Image
          style={[styles.score, styles.logo]}
          source={{ uri: props.game.awayTeam.logo }}
        />
      </View>
      <View>
        <Text style={[styles.score, styles.team]}>
          <Text>{props.game.homeTeam.name}</Text>
        </Text>
        <Text style={styles.score}>
          {props.game.awayTeam.name}
        </Text>
      </View>

      <View>
        <Text style={styles.score}>{props.game.homeScore}</Text>
        <Text style={styles.score}>{props.game.awayScore}</Text>
      </View>
      <View>
        <Text style={styles.score}>{quarter}</Text>
        <Text style={styles.score}>{clock}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#DCDCDD',
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
  },

  score: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 8,
    paddingTop: 8,
    fontFamily: 'OpenSans',
    color: '#46494C',
    // borderColor: 'black',
    // borderStyle: 'solid',
    // borderWidth: 1
  },

  team: {
    width: 180
  },

  logo: {
    width: 30,
    height: 20
  }
});

module.exports = Games;
