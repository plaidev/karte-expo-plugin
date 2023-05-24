import {
  ConfigPlugin,
  withDangerousMod,
  AndroidConfig,
  withGradleProperties,
  ExportedConfigWithProps,
} from "expo/config-plugins";
import fs from "fs";
import path from "path";

import { ConfigProps } from "./types";

export const withKarteAndroid: ConfigPlugin<ConfigProps> = (config, props) => {
  config = withDangerousMod(config, [
    "android",
    (config) => {
      copyKarteXml(config, props);
      return config;
    },
  ]);
  config = withGradleProperties(config, (config) => {
    AndroidConfig.BuildProperties.updateAndroidBuildProperty(
      config.modResults,
      "android.kotlinVersion",
      "1.6.10"
    );
    return config;
  });
  return config;
};

function copyKarteXml(config: ExportedConfigWithProps, props: ConfigProps) {
  if (!props.karteXml) {
    throw new Error(
      "Path to karte.xml is not defined. Please specify the `expo.android.karteXml` field in app.json."
    );
  }
  const xmlPath = path.resolve(config.modRequest.projectRoot, props.karteXml);
  if (!fs.existsSync(xmlPath)) {
    throw new Error(
      `karte.xml doesn't exist in ${xmlPath}. Place it there or configure the path in app.json`
    );
  }

  const destPath = path.resolve(
    config.modRequest.platformProjectRoot,
    "app/src/main/res/values/karte.xml"
  );
  fs.copyFileSync(xmlPath, destPath);
}
