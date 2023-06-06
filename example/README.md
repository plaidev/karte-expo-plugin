# example

This is an Expo example project showing that karte-expo-plugin works.

## Plugin options

Specify the path of the configuration file to the plugin in the `app.json` file like this.

```
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

```
npx expo prebuild --clean
```