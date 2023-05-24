import { initialize, trackEvent } from "@aptabase/electron/main";
import { BrowserWindow, app } from "electron";
import { join } from "path";

app.whenReady().then(() => {
  initialize("A-DEV-7523634193").then(() => {
    trackEvent("app_started");
  });

  const win = new BrowserWindow({
    title: "Main window",
    webPreferences: {
      preload: join(__dirname, "./preload.js"),
    },
  });

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    // Load your file
    win.loadFile("dist/index.html");
  }
});
