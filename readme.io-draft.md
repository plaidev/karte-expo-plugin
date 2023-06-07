## 導入手順（Expo）

1. プロジェクトを Managed Workflow で開発する場合は、下記パッケージをインストールします。

```sh
npm install @react-native-karte/notification
npm install @react-native-karte/in-app-messaging
npm install karte-expo-plugin
```

2. React Native Firebase を導入する

```sh
npm install @react-native-firebase/app
npm install @react-native-firebase/messaging
```

導入に関しては、下記ドキュメントをご覧ください。

- [プッシュ通知を受信する](https://developers.karte.io/docs/notification-react-native-sdk-v2#step1-react-native-firebase-%E3%82%92%E5%B0%8E%E5%85%A5%E3%81%99%E3%82%8B)

3. KARTE 設定ファイルをプロジェクトに追加する

iOS, Android それぞれの設定ファイルダウンロードします。

ダウンロード方法に関しては、下記ドキュメントをご覧ください。

- [SDKの設定ファイルをダウンロードする](https://support.karte.io/post/SRlsXvrikIKjpZcfahGdc)

ダウンロードしたファイルをプロジェクトディレクトリに移動します。

4. app.json ファイルを編集する

app.json ファイルに、設定ファイルのパスを指定します。

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

5. ネイティブコードを生成します

```sh
npx expo prebuild --clean
```
