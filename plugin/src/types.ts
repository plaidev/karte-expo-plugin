export type IntentFilter = {
  activity: string;
  scheme: string;
};

export type ConfigProps = {
  karteInfoPlist: string;
  karteXml: string;
  intentFilters: IntentFilter[];
};
