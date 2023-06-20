# plugin

This repository includes the implementation of a [Config plugins](https://docs.expo.dev/config-) for [karte-react-native](https://github.com/plaidev/karte-react-native/plugins/introduction/), as well as the implementation of the [Expo Modules API](https://docs.expo.dev/modules/overview/) for karte-react-native.

This plugin automatically initializes KARTE SDK and configures settings for receiving push notifications.

# Installation

## Prerequisite

To install this plugin, the prerequisites `@react-native-firebase/app` and `@react-native-firebase/messaging` must be installed first. Please refer to the react-native-firebase [documentation](https://rnfirebase.io/) for details.

## Install plugin

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

## Source directories

- src

  - [Config plugins](https://docs.expo.dev/config-plugins/introduction/) implementation.

- android

  - [Expo Modules API](https://docs.expo.dev/modules/overview/) implementation for Android.

- ios
  - [Expo Modules API](https://docs.expo.dev/modules/overview/) implementation for iOS.

## Project for development

`../example` directory is the Expo project for development. You can use this project to check the functions.

# Release

## 1. Update plugin version

```sh
yarn version <strategy>
```

## 2. Create tag

```sh
git tag -a <version>
git push origin <version>
```

## 3. Create release from tag

Create a release in [releases](https://github.com/plaidev/karte-expo-plugin/releases). Then the [publish workflow](https://github.com/plaidev/karte-expo-plugin/blob/main/.github/workflows/publish.yml) is run and the package is published.
