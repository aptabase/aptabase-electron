import { ipcMain } from "electron";

// env.PKG_VERSION is replaced by rollup during build phase
const sdkVersion = "aptabase-electron@env.PKG_VERSION";

export type AptabaseOptions = {
  host?: string;
  appVersion?: string;
};

let _appKey = "";
let _locale = ""; // TODO
let _apiUrl = "";
let _isDebug = false; // TODO
let _options: AptabaseOptions | undefined;

const _hosts: { [region: string]: string } = {
  US: "https://us.aptabase.com",
  EU: "https://eu.aptabase.com",
  DEV: "http://localhost:3000",
  SH: "",
};

function getBaseUrl(
  region: string,
  options?: AptabaseOptions
): string | undefined {
  if (region === "SH") {
    if (!options?.host) {
      console.warn(
        `Host parameter must be defined when using Self-Hosted App Key. Tracking will be disabled.`
      );
      return;
    }
    return options.host;
  }

  return _hosts[region];
}

export function initialize(appKey: string, options?: AptabaseOptions) {
  if (!ipcMain) {
    throw new Error(
      "Aptabase: You need to call `.initialize()` from the main process."
    );
  }

  _appKey = appKey;
  _options = options;

  const parts = appKey.split("-");
  if (parts.length !== 3 || _hosts[parts[1]] === undefined) {
    console.warn(
      `The Aptabase App Key "${appKey}" is invalid. Tracking will be disabled.`
    );
    return;
  }

  const baseUrl = getBaseUrl(parts[1], options);
  _apiUrl = `${baseUrl}/api/v0/event`;

  // ipcMain.on("aptabase-track-event", (event) => {
  //   console.log("aptabase-track-event", event);
  // });
}