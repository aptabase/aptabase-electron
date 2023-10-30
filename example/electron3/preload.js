const { ipcRenderer } = require("electron");

window.trackEvent = (...args) =>
  ipcRenderer.send("aptabase:trackEvent", ...args);
