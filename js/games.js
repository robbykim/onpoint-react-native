import React, { Component } from 'react';
import {
  View,
  Text,
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

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.score}>{props.game.homeScore}  {props.game.homeTeam}</Text>
        <Text style={styles.score}>{props.game.awayScore}  {props.game.awayTeam}</Text>
      </View>
      <View>
        <Text style={[styles.score, styles.time]}>{quarter}</Text>
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
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'lightgray',
    margin: 5
  },
  score: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 3,
    paddingTop: 3,
  },
  team: {
    paddingLeft: 0
  },
  time: {
    justifyContent: 'flex-end'
  }
});


module.exports = Games;

/*
{
  homeTeam:
  awayTeam:
  homeScore:
  awayScore:
  period:
  clock:
  startTime:
}
*/
