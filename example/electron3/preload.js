const { ipcRenderer } = require("electron");

window.aptabase = {
  trackEvent: (...args) => ipcRenderer.send("aptabase:trackEvent", ...args),
};
