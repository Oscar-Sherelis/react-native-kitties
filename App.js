import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Kitties from './components/Kitties';

export default function App() {
  return (
    <View style={styles.container}>
      <Kitties></Kitties>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
