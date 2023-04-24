import { ConfigPlugin, withAppDelegate } from "expo/config-plugins";
import { ConfigProps } from "./types";

const { mergeContents } = require('@expo/config-plugins/build/utils/generateCode');

function addKarteAppDelegateImport(src: any) {
    const newSrc = ['@import KarteCore;']
    return mergeContents({
        tag: 'karte-import',
        src,
        newSrc: newSrc.join('\n'),
        anchor: /#import "AppDelegate\.h"/,
        offset: 1,
        comment: '//',
    })
}

export const withKarteiOS: ConfigPlugin<ConfigProps> = (config, props) => {
    config = withAppDelegate(config, (config) => {
        config.modResults.contents = addKarteAppDelegateImport(config.modResults.contents).contents;
        return config;
    });
    return config;
};