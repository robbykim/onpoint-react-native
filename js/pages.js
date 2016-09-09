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
      <View style={styles.title}>
        {props.title}
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
  title: {
    flex: 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555',
    marginBottom: 10
  },
});

module.exports = Page;
