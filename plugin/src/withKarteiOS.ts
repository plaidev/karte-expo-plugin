import { ConfigPlugin } from "expo/config-plugins";
import { ConfigProps } from "./types";

export const withKarteiOS: ConfigPlugin<ConfigProps> = (config, props) => {
    return config;
};