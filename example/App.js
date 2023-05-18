import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Tracker } from '@react-native-karte/core';

export default function App() {

  const onPressHandler = () => {
    Tracker.track("buy", {
      "id": "P00003",
      "name": "ミネラルウォーター（500ml）",
      "price": 100,
    });
  };

  useEffect(() => {
    Tracker.view("signup", "会員登録");
    Tracker.identify({
      "user_id": "ユーザID（文字列）",  
      "name": "カルテ太郎",
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='Buy a water bottle' onPress={onPressHandler}/>
      <StatusBar style="auto" />
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
