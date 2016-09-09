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
        <Text>This Week's Games</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        {progressGames.length ? progressGames : <Text>All Games Have Completed This Week</Text>}
      </ScrollView>
    </View>
  );
}

module.exports = Page;
