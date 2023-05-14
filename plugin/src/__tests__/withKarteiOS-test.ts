import { withXcodeProject, XcodeProject } from "@expo/config-plugins";
import fs from "fs";

import { withKarteiOS } from "../withKarteiOS";

jest.mock("fs", () => {
  return {
    existsSync: jest.fn(),
    copyFileSync: jest.fn(),
    readdirSync: jest.fn(),
    promises: {
      readFile: jest.fn(),
    },
  };
});

jest.mock("@expo/config-plugins", () => {
  return {
    ...(jest.requireActual("@expo/config-plugins") as object),
    withXcodeProject: jest.fn(),
    IOSConfig: {
      Paths: {
        getSourceRoot: () => "",
      },
      XcodeUtils: {
        getProjectName: () => "",
        addResourceFileToGroup: () => "",
      },
    },
  };
});

const mockXcodeProject = (mock: XcodeProject) => {
  const xcodeProject = { ...mock };
  // @ts-ignore
  withXcodeProject.mockImplementation((config, callback) => {
    // @ts-ignore
    return callback({
      ...config,
      modRequest: {
        projectRoot: "projectRoot",
      },
      modResults: {
        hasFile: () => false,
      },
      xcodeProject,
    });
  });
};

const exp = { name: "foo", slug: "bar" };

describe(withKarteiOS, () => {
  beforeEach(() => {
    (withXcodeProject as any).mockClear();
  });

  it("should not throw if plist path is set", () => {
    mockXcodeProject({});
    jest.spyOn(fs, "existsSync").mockImplementation((_: any) => {
      return true;
    });
    expect(() =>
      withKarteiOS(exp, {
        karteInfoPlist: "karte.plist",
        karteXml: "",
      })
    ).not.toThrow();
  });

  it("should throw if plist path is not set", () => {
    mockXcodeProject({});
    jest.spyOn(fs, "existsSync").mockImplementation((_: any) => {
      return true;
    });
    expect(() => withKarteiOS(exp, {} as any)).toThrow(
      /^Path to Karte-Info.plist is not defined. Please specify the path in app.json.$/
    );
  });

  it("should throw if plist file is not exists", () => {
    mockXcodeProject({});
    jest.spyOn(fs, "existsSync").mockImplementation((_: any) => {
      return false;
    });
    expect(() =>
      withKarteiOS(exp, {
        karteInfoPlist: "karte.plist",
        karteXml: "",
      })
    ).toThrow(/Karte-Info.plist doesn't exist/);
  });
});
