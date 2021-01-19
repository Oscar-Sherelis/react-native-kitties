import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Kitties from './components/KittyList';

// readData()
export default function App() {
  return (
    <View style={styles.container}>
      {/* <img src="https://placekitten.com/855/400/" alt=""/>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}
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
