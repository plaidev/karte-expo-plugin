import fs from "fs";
import { withAndroidManifest, AndroidConfig } from "@expo/config-plugins";

import { withKarteAndroid } from "../withKarteAndroid";

jest.mock("fs", () => {
  return {
    existsSync: jest.fn(),
    copyFileSync: jest.fn(),
    promises: {
      readFile: jest.fn(),
    },
  };
});

jest.mock("path", () => {
  return {
    resolve: jest.fn(),
  };
});

jest.mock("@expo/config-plugins", () => {
  const mainApp = {};
  return {
    ...(jest.requireActual("@expo/config-plugins") as object),
    withDangerousMod: jest.fn().mockImplementation((config, [_, callback]) =>
      callback({
        ...config,
        modRequest: {
          projectRoot: "projectRoot",
          platformProjectRoot: "platformRoot",
        },
      })
    ),
    withAndroidManifest: jest.fn().mockImplementation((config, callback) =>
      callback({
        ...config,
        modResults: {},
      })
    ),
    AndroidConfig: {
      Manifest: {
        getMainApplicationOrThrow: jest.fn(() => mainApp),
        addMetaDataItemToMainApplication: jest.fn(),
      },
    },
    withGradleProperties: jest.fn(),
  };
});

const exp = { name: "foo", slug: "bar" };

describe(withKarteAndroid, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should not throw if xml path is set", () => {
    jest.spyOn(fs, "existsSync").mockImplementation((_: any) => {
      return true;
    });
    expect(() =>
      withKarteAndroid(exp, {
        karteInfoPlist: "",
        karteXml: "karte.xml",
      })
    ).not.toThrow();
  });

  it("should throw if xml path is not set", () => {
    jest.spyOn(fs, "existsSync").mockImplementation((_: any) => {
      return true;
    });
    expect(() => withKarteAndroid(exp, {} as any)).toThrow(
      /^Path to karte.xml is not defined. Please specify the `expo.android.karteXml` field in app.json.$/
    );
  });

  it("should throw if xml file is not exists", () => {
    jest.spyOn(fs, "existsSync").mockImplementation((_: any) => {
      return false;
    });
    expect(() =>
      withKarteAndroid(exp, {
        karteInfoPlist: "",
        karteXml: "karte.xml",
      })
    ).toThrow(/karte.xml doesn't exist/);
  });

  it("should add metadata when isEdgeToEdgeEnabled is defined", () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(true);
    withKarteAndroid(exp, {
      karteInfoPlist: "",
      karteXml: "karte.xml",
      isEdgeToEdgeEnabled: true,
    });

    const { Manifest } = AndroidConfig;
    expect(Manifest.getMainApplicationOrThrow).toHaveBeenCalled();
    expect(Manifest.addMetaDataItemToMainApplication).toHaveBeenCalledWith(
      expect.any(Object),
      "KARTE_EDGE_TO_EDGE_ENABLED",
      "true"
    );
    expect(withAndroidManifest).toHaveBeenCalled();
  });

  it("should add metadata when isEdgeToEdgeEnabled is false", () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(true);
    withKarteAndroid(exp, {
      karteInfoPlist: "",
      karteXml: "karte.xml",
      isEdgeToEdgeEnabled: false,
    });

    const { Manifest } = AndroidConfig;
    expect(Manifest.getMainApplicationOrThrow).toHaveBeenCalled();
    expect(Manifest.addMetaDataItemToMainApplication).toHaveBeenCalledWith(
      expect.any(Object),
      "KARTE_EDGE_TO_EDGE_ENABLED",
      "false"
    );
    expect(withAndroidManifest).toHaveBeenCalled();
  });

  it("should not add metadata when isEdgeToEdgeEnabled is undefined", () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(true);
    withKarteAndroid(exp, {
      karteInfoPlist: "",
      karteXml: "karte.xml",
    });

    const { Manifest } = AndroidConfig;
    expect(Manifest.getMainApplicationOrThrow).not.toHaveBeenCalled();
    expect(
      Manifest.addMetaDataItemToMainApplication
    ).not.toHaveBeenCalled();
    expect(withAndroidManifest).not.toHaveBeenCalled();
  });
});
