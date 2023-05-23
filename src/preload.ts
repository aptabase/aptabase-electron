import { contextBridge, ipcRenderer } from "electron";

export function exposeAptabase() {
  contextBridge.exposeInMainWorld("aptabase", {
    trackEvent: (
      eventName: string,
      props?: Record<string, string | number | boolean>
    ) => ipcRenderer.send("aptabase-track-event", eventName, props),
  });
}
