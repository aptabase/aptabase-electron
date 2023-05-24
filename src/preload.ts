import { contextBridge, ipcRenderer } from "electron";

export function exposeAptabase() {
  const ipc = {
    trackEvent: (
      eventName: string,
      props?: Record<string, string | number | boolean>
    ) => ipcRenderer.send("aptabase-track-event", eventName, props),
  };

  (window as any).__APTABASE__ = ipc;

  try {
    contextBridge.exposeInMainWorld("__APTABASE__", ipc);
  } catch {
    // This may fail if contextIntegration is disabled, but that's fine as the IPC was set up above.
  }
}
