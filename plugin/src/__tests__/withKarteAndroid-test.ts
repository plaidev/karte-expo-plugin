import fs from "fs";

import { withKarteAndroid } from "../withKarteAndroid";

jest.mock("fs", () => {
  return {
    existsSync: jest.fn(),
    readFileSync: jest.fn(),
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
    withStringsXml: jest.fn().mockImplementation((config, callback) =>
      callback({
        ...config,
        modRequest: {
          projectRoot: "projectRoot",
        },
        modResults: {
          resources: {
            string: [],
          },
        },
      })
    ),
    withGradleProperties: jest.fn(),
  };
});

const exp = { name: "foo", slug: "bar" };

const mockKarteXmlContent = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="karte_app_key">test_app_key</string>
    <string name="karte_app_key_2">test_app_key_2</string>
</resources>`;

describe(withKarteAndroid, () => {
  it("should not throw if xml path is set", () => {
    jest.spyOn(fs, "existsSync").mockImplementation((_: any) => {
      return true;
    });
    jest.spyOn(fs, "readFileSync").mockImplementation((_: any) => {
      return mockKarteXmlContent;
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
