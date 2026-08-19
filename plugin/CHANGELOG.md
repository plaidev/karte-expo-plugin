# Releases - xxxx.xx.xx

### karte-expo-plugin 0.2.0-beta.0

**🔨CHANGED**

* AndroidのInAppMessagingで、isEdgeToEdgeEnabledオプションが有効化されるようにしました。isEdgeToEdgeEnabledオプションに関しては、以下のページをご参照ください。
   * https://app.developers.karte.io/app-faq/notes-for-android-environments-with-target-sdk-version-35-later


# Releases - 2026.08.18

### karte-expo-plugin 0.1.5

**🔨CHANGED**

* Android設定の適用でDangerous Modを使用せず、`karte.xml`の値を`strings.xml`へ統合するように変更しました。

# Releases - 2025.03.05

### karte-expo-plugin 0.1.4

**🔨CHANGED**

* Expo SDK 52系との互換性を保つため、Kotlinバージョンの上書き処理を削除しました。

# Releases - 2024.08.16

### karte-expo-plugin 0.1.3

**🔨CHANGED**

* AndroidビルドでJava/Kotlin 11を強制するJVMツールチェーン設定を削除しました。

### karte-expo-plugin 0.1.2

**💊FIXED**

* Gradle 8系およびJDK 17で発生するビルドエラーを修正しました。

# Releases - 2024.03.15

### karte-expo-plugin 0.1.1

**💊FIXED**

* AndroidのソースJAR生成タスクで使用していた `classifier` を `archiveClassifier` に変更しました。

# Releases - 2023.07.13

### karte-expo-plugin 0.1.0

**🎉FEATURE**

* 初回リリースを行いました。
