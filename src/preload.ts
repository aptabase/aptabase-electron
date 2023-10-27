import { contextBridge, ipcRenderer } from "electron";

export function exposeAptabase() {
  contextBridge.exposeInMainWorld("__aptabase_ipc__", {
    trackEvent: (...args: any[]): Promise<void> =>
      ipcRenderer.invoke("trackEvent", ...args),
  });
}
