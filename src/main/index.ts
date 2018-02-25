import electron from "electron";
import log from "electron-log";
import { autoUpdater } from "electron-updater";

const app = electron.app;
let mainWindow: electron.BrowserWindow;

log.transports.file.level = "debug";
autoUpdater.logger = log;

function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1280,
    height: 780,
    title: "Electron Starter"
  });

  mainWindow.loadURL(`file://${__dirname}/../index.html`);
  mainWindow.once("closed", () => {
    mainWindow = null;
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
