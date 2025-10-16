import {
  ConfigPlugin,
  withDangerousMod,
  withAndroidManifest,
  ExportedConfigWithProps,
  AndroidConfig,
} from "expo/config-plugins";
import fs from "fs";
import path from "path";

import { ConfigProps } from "./types";

const {
  getMainApplicationOrThrow,
  addMetaDataItemToMainApplication,
} = AndroidConfig.Manifest;

export const withKarteAndroid: ConfigPlugin<ConfigProps> = (config, props) => {
  config = withDangerousMod(config, [
    "android",
    (config) => {
      copyKarteXml(config, props);
      return config;
    },
  ]);

  if (props.isEdgeToEdgeEnabled !== undefined) {
    config = withAndroidManifest(config, (androidConfig) => {
      const mainApp = getMainApplicationOrThrow(androidConfig.modResults);
      addMetaDataItemToMainApplication(
        mainApp,
        "KARTE_EDGE_TO_EDGE_ENABLED",
        props.isEdgeToEdgeEnabled!.toString()
      );
      return androidConfig;
    });
  }

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
