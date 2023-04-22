import { ConfigPlugin, createRunOncePlugin } from "expo/config-plugins";
import { withKarteAndroid } from "./withKarteAndroid";
import { withKarteiOS } from "./withKarteiOS";
import { ConfigProps } from './types';

const withKarte: ConfigPlugin<ConfigProps> = (
  config,
  _props
) => {
  const props = _props || { androidApiKey: "", iosApiKey: "", baseUrl: "" };
  config = withKarteAndroid(config, props);
  config = withKarteiOS(config, props);
  return config;
};

const pkg = require("../package.json");

export default createRunOncePlugin(
  withKarte,
  pkg.name,
  pkg.version
);
