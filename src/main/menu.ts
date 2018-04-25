import { app, Menu, dialog } from "electron";

const editMenu = {
  label: "Edit",
  submenu: [
    { role: "undo" },
    { role: "redo" },
    { type: "separator" },
    { role: "cut" },
    { role: "copy" },
    { role: "paste" },
    { role: "selectall" }
  ]
};

const viewMenu = {
  label: "View",
  submenu: [
    { role: "reload" },
    { role: "toggledevtools" },
    { type: "separator" },
    { role: "resetzoom" },
    { role: "zoomin" },
    { role: "zoomout" }
  ]
};

const windowMenu = {
  role: "window",
  submenu: [{ role: "minimize" }, { role: "close" }]
};

const helpMenu = {
  role: "help",
  submenu: [
    {
      label: "Report Issue",
      click() {
        require("electron").shell.openExternal("https://github.com/hokaccha/electron-starter/issues/new");
      }
    }
  ]
};

const template: any = [editMenu, viewMenu, windowMenu, helpMenu];

const checkForUpdateItem = {
  label: "Check for Updates...",
  click() {
    // TODO
    dialog.showMessageBox({ message: "There are currently no updates available." });
  }
};

if (process.platform === "darwin") {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: "about" },
      checkForUpdateItem,
      { type: "separator" },
      { role: "hide" },
      { role: "hideothers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" }
    ]
  });
} else {
  helpMenu.submenu.push(checkForUpdateItem);
}

export function initMenu() {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
