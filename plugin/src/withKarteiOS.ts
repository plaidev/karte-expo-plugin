import {
  ConfigPlugin,
  IOSConfig,
  XcodeProject,
  withXcodeProject,
} from "expo/config-plugins";
import fs from "fs";
import path from "path";

import { ConfigProps } from "./types";

export const withKarteiOS: ConfigPlugin<ConfigProps> = (config, props) => {
  return withXcodeProject(config, (config) => {
    if (!props?.karteInfoPlist) {
      throw new Error(
        "Path to Karte-Info.plist is not defined. Please specify the path in app.json."
      );
    }

    config.modResults = setKarteInfoPlist(
      config.modRequest.projectRoot,
      config.modResults,
      props.karteInfoPlist
    );
    return config;
  });
};

function setKarteInfoPlist(
  projectRoot: string,
  project: XcodeProject,
  karteInfoPlistPath: string
): XcodeProject {
  const karteInfoPlistFilePath = path.resolve(projectRoot, karteInfoPlistPath);
  if (!fs.existsSync(karteInfoPlistFilePath)) {
    throw new Error(
      `Karte-Info.plist doesn't exist in ${karteInfoPlistFilePath}. Place it there or configure the path in app.json`
    );
  }

  fs.copyFileSync(
    karteInfoPlistFilePath,
    path.join(IOSConfig.Paths.getSourceRoot(projectRoot), "Karte-Info.plist")
  );

  const projectName = IOSConfig.XcodeUtils.getProjectName(projectRoot);
  const plistFilePath = `${projectName}/Karte-Info.plist`;
  if (!project.hasFile(plistFilePath)) {
    project = IOSConfig.XcodeUtils.addResourceFileToGroup({
      filepath: plistFilePath,
      groupName: projectName,
      project,
      isBuildFile: true,
    });
  }
  return project;
}
