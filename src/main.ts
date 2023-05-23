import { IpcMainEvent, app, ipcMain } from "electron";
import { EnvironmentInfo, getEnvironmentInfo } from "./env";

export type AptabaseOptions = {
  host?: string;
};

let _appKey = "";
let _apiUrl = "";
let _env: EnvironmentInfo | undefined;

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

export async function initialize(
  appKey: string,
  options?: AptabaseOptions
): Promise<void> {
  if (!app || !ipcMain) {
    console.warn(
      "Aptabase: `initialize` must be invoked from the main process. Tracking will be disabled."
    );
    return;
  }

  if (!app.isReady()) {
    console.warn(
      "Aptabase: `initialize` must be invoked after the app is ready. Tracking will be disabled."
    );
    return;
  }

  const parts = appKey.split("-");
  if (parts.length !== 3 || _hosts[parts[1]] === undefined) {
    console.warn(
      `The Aptabase App Key "${appKey}" is invalid. Tracking will be disabled.`
    );
    return;
  }

  const baseUrl = getBaseUrl(parts[1], options);
  _apiUrl = `${baseUrl}/api/v0/event`;
  _env = await getEnvironmentInfo();
  _appKey = appKey;

  ipcMain.on(
    "aptabase-track-event",
    (
      event: IpcMainEvent,
      eventName: string,
      props?: Record<string, string | number | boolean>
    ) => {
      trackEvent(eventName, props);
    }
  );
}

export function trackEvent(
  eventName: string,
  props?: Record<string, string | number | boolean>
) {
  if (!_appKey || !_env) return;

  const body = JSON.stringify({
    timestamp: new Date().toISOString(),
    sessionId: "", // TODO
    eventName: eventName,
    systemProps: {
      isDebug: _env.isDebug,
      locale: _env.locale,
      osName: _env.osName, // TODO
      osVersion: _env.osVersion,
      engineName: _env.engineName,
      engineVersion: _env.engineVersion,
      appVersion: _env.appVersion,
      sdkVersion: _env.sdkVersion,
    },
    props: props,
  });

  console.log(body);
}
