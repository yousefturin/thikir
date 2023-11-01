import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingIndicator = ({ isLoading }) => {
  return (
    isLoading && (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#262626" />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#151515"
  },
});

export default LoadingIndicator;