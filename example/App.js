import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Tracker } from "@react-native-karte/core";
import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid } from "react-native";
import { Platform } from "react-native";
import { Notification } from "@react-native-karte/notification";

export default function App() {

  const onPressHandler = () => {
    Tracker.track("buy", {
      id: "P00003",
      name: "ミネラルウォーター（500ml）",
      price: 100,
    });
  };

  useEffect(() => {
    Tracker.view("view", "閲覧");

    Tracker.identify({
      user_id: "0",
      name: "user_0",
    });

    async function registerFCMToken() {
      const enable = await requestUserPermission();
      if (enable) {
        messaging()
          .getToken()
          .then((fcmToken) => {
            Notification.registerFCMToken(fcmToken);
          })
          .catch((e) => {
            console.error(e);
          });

        messaging().onTokenRefresh((fcmToken) => {
          Notification.registerFCMToken(fcmToken);
        });
      }
    }
    registerFCMToken();

    messaging().onMessage((remoteMessage) => {
      if (remoteMessage) {
        const notification = Notification.create(remoteMessage);
        if (notification) {
          notification.show();
        }
      }
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      const notification = Notification.create(remoteMessage);
      if (notification) {
        notification.show();
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Buy a water bottle" onPress={onPressHandler} />
      <StatusBar style="auto" />
    </View>
  );
}

async function requestUserPermission() {
  if (Platform.OS == "ios") {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    return enabled;
  } else {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    return status !== "denied";
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
