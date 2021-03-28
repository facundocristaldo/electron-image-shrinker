const { BrowserWindow } = require("electron")
let initilizeAboutWindow;

function createAboutWindow() {
  initilizeAboutWindow = new BrowserWindow({
    title: "About Image Shrinker",
    width: 300,
    height: 300,
    icon: `./assets/icons/Icon_256x256.png`,
    resizable: false,
    backgroundColor: "white"
  })
  initilizeAboutWindow.loadURL(`file://${__dirname}/../app/about.html`)
}

module.exports = { createAboutWindow }