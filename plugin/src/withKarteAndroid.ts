import {
  ConfigPlugin,
  withProjectBuildGradle,
  withDangerousMod,
  withAppBuildGradle,
  AndroidConfig,
  withGradleProperties,
  ExportedConfigWithProps,
} from "expo/config-plugins";

import { ConfigProps } from "./types";

export const withKarteAndroid: ConfigPlugin<ConfigProps> = (config, props) => {
  config = withGradleProperties(config, (config) => {
    AndroidConfig.BuildProperties.updateAndroidBuildProperty(
      config.modResults,
      "android.kotlinVersion",
      "1.5.20"
    );
    return config;
  });
  return config;
};
