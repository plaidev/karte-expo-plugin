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
  return config;
};
