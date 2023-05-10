import {
  ConfigPlugin,
  withDangerousMod,
  AndroidConfig,
  withGradleProperties,
  ExportedConfigWithProps,
  withAndroidManifest,
  AndroidManifest,
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
  const destPath = path.resolve(config.modRequest.platformProjectRoot, 'app/src/main/res/values/karte.xml');
  
  fs.copyFileSync(srcPath, destPath);
}

function setIntentFilters(
  config: ExportedConfigWithProps<AndroidManifest>,
  props: ConfigProps
): ExportedConfigWithProps<AndroidManifest> {
  if (!props.intentFilters) {
    return config;
  }
  for (const filter of props.intentFilters) {
    if (!filter.activity || !filter.scheme) {
      continue;
    }
    const intentFilter = {
      action: 'android.intent.action.VIEW',
      categories: [
        'android.intent.category.DEFAULT',
        'android.intent.category.BROWSABLE'
      ],
      data: {
        scheme: filter.scheme,
        host: "karte.io",
      },
    };
    const androidManifest = config.modResults as AndroidManifest;
    const targetActivities: AndroidConfig.Manifest.ManifestActivity[] = [];
    for (const application of androidManifest.manifest.application || []) {
      for (const activity of application.activity || []) {
        if (activity.$?.['android:name'] === filter.activity) {
          targetActivities.push(activity);
        }   
      }
    }
    for (const targetActivity of targetActivities) {
      targetActivity['intent-filter'] = [
        ...(targetActivity['intent-filter'] || []),
        {
          action: [{ $: { 'android:name': intentFilter.action } }],
          category: intentFilter.categories.map(category => ({
            $: { 'android:name': category },
          })), 
          data: [{ $: intentFilter.data }],
        }
      ]
    }
    config.modResults = androidManifest;
  }
  return config;
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
  config = withAndroidManifest(config, (config) => {
    config = setIntentFilters(config, props);
    return config;
  });
  return config;
};
