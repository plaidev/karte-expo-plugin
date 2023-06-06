# plugin

[Config plugins](https://docs.expo.dev/config-plugins/introduction/) and [Expo Modules API](https://docs.expo.dev/modules/overview/) implementation for [karte-react-native](https://github.com/plaidev/karte-react-native/).

This plugin automatically initializes Karte SDK and sets up to receive push notifications.

# Installation

Add the plugin to your expo project.
```sh
yarn add karte-expo-plugin
```

# Develop

## Prerequisite

- node v18.x
- yarn

## Install node packages

```sh
yarn install
```

## Build

```sh
yarn build
```

## Test

```
yarn test
```

## Directories

- ./src

  - [Config plugins](https://docs.expo.dev/config-plugins/introduction/) implementation.

- ./android

  - [Expo Modules API](https://docs.expo.dev/modules/overview/) implementation for Android.

- ./ios
  - [Expo Modules API](https://docs.expo.dev/modules/overview/) implementation for iOS.
