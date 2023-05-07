import {
  ConfigPlugin,
  withDangerousMod,
  AndroidConfig,
  withGradleProperties,
  ExportedConfigWithProps,
} from "expo/config-plugins";
import { ConfigProps } from "./types";
import path from 'path';
import fs from 'fs';

function copyKarteXml(
  config: ExportedConfigWithProps,
  props: ConfigProps
) {
  if (!props.karteXml) {
    throw new Error(
      'Path to karte.xml is not defined. Please specify the `expo.android.karteXml` field in app.json.',
    );
  }
  const srcPath = path.resolve(config.modRequest.projectRoot , props.karteXml);
  const destPath = path.resolve(config.modRequest.platformProjectRoot, 'app/src/main/res/karte.xml');
  
  fs.copyFileSync(srcPath, destPath);
}

export const withKarteAndroid: ConfigPlugin<ConfigProps> = (config, props) => {
  config = withDangerousMod(config, [
    'android',
    (config) => {
      copyKarteXml(config, props);
      return config;
    },
  ]);
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
