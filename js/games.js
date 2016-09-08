import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

function Games(props) {
  return (
    <View>
      <Text>{props.game.homeTeam}</Text>
      <Text>{props.game.awayTeam}</Text>
      <Text>{props.game.homeScore}</Text>
      <Text>{props.game.awayScore}</Text>
      <Text>{props.game.period}</Text>
      <Text>{props.game.clock}</Text>
    </View>
  );
}

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
