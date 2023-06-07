# example

This repository has a sample Expo project that demonstrates `karte-expo-plugin` in action.

## Prerequisite

To install this plugin, the prerequisites `@react-native-firebase/app` and `@react-native-firebase/messaging` must be installed first. Please refer to the react-native-firebase [documentation](https://rnfirebase.io/) for details.

## Plugin options

You can specify the path of the KARTE configuration files to the plugin in the `app.json` file like this.

```json
"plugins": [
    [
        "karte-expo-plugin",
        {
            "karteInfoPlist": "./Karte-Info.plist",
            "karteXml": "./karte.xml"
        }
    ],
]
```

## Apply plugin
You can apply the plugin by running the expo [prebuild](https://docs.expo.dev/guides/adopting-prebuild/#prebuild) command.

```sh
npx expo prebuild --clean
```
