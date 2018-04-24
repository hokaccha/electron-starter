import electron from "electron";
import { watchUpdate } from "./autoUpdater";
import { initMenu } from "./menu";

const app = electron.app;
let mainWindow: electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1280,
    height: 780,
    frame: process.platform === "darwin",
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
  watchUpdate();
  initMenu();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
