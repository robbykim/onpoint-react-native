import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl
} from 'react-native';

function Page(props) {
  return (
    <View style={{flex: 1}}>
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>
          {props.title}
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={props.refreshing}
            onRefresh={props._onRefresh}
          />
        }
      >
        {props.games.length ? props.games : <Text>All Games Have Completed This Week</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleBar: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1985A1',
    paddingTop: 15,
    marginBottom: 10,
  },

  titleText: {
    color: '#DCDCDD',
    fontFamily: 'FrancoisOne-Regular',
    fontSize: 20,
    letterSpacing: 1
  }
});

module.exports = Page;
