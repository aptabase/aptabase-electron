import { initialize, trackEvent } from "@aptabase/electron/main";
import { BrowserWindow, app } from "electron";
import { join } from "path";

initialize("A-DEV-000");

app.whenReady().then(() => {
  trackEvent("app_started");

  const win = new BrowserWindow({
    title: "Main window",
    webPreferences: {
      preload: join(__dirname, "./preload.js"),
      devTools: true,
    },
  });

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // Load your file
    win.loadFile("dist/index.html");
  }
});
