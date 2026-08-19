import {
  ConfigPlugin,
  withStringsXml,
  AndroidConfig,
} from "expo/config-plugins";
import fs from "fs";
import path from "path";

import { ConfigProps } from "./types";

export const withKarteAndroid: ConfigPlugin<ConfigProps> = (config, props) => {
  return withStringsXml(config, (config) => {
    config.modResults = mergeKarteXMLToStrings(config, props);
    return config;
  });
};

// Merges values in karte.xml into strings.xml.
function mergeKarteXMLToStrings(
  config: any,
  props: ConfigProps
): AndroidConfig.Resources.ResourceXML {
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

  const karteXmlContent = fs.readFileSync(xmlPath, "utf-8");

  // Extract string elements using regex pattern matching.
  const stringRegex = /<string\s+name="([^"]+)"[^>]*>([^<]*)<\/string>/g;
  const matches = [...karteXmlContent.matchAll(stringRegex)];

  const stringItems: AndroidConfig.Resources.ResourceItemXML[] = matches.map(
    ([, name, value]) => ({
      $: { name },
      _: value,
    })
  );
  return AndroidConfig.Strings.setStringItem(stringItems, config.modResults);
}
