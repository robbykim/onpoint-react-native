import React from 'react';
import {
  View,
  Text,
  ActivityIndicatorIOS,
  StyleSheet
} from 'react-native';

function LoadingScreen(props) {
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

module.exports = LoadingScreen;
