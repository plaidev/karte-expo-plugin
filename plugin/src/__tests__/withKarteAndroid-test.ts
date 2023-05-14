import fs from "fs";

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
  return {
    ...(jest.requireActual("@expo/config-plugins") as object),
    withDangerousMod: jest.fn().mockImplementation((config, [_, callback]) =>
      callback({
        ...config,
        modRequest: {
          projectRoot: "projectRoot",
        },
      })
    ),
    withGradleProperties: jest.fn(),
  };
});

const exp = { name: "foo", slug: "bar" };

describe(withKarteAndroid, () => {
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
});
