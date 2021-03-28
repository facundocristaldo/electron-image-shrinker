const { app, BrowserWindow, Menu, globalShortcut } = require("electron")
const { menu } = require('./src/MenuTemplate')
const { isMac, isDev } = require('./src/Constants')

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Image Shrinker",
    width: 500,
    height: 600,
    icon: `./assets/icons/Icon_256x256.png`,
    resizable: isDev,
    backgroundColor: "white"
  })
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
}


app.on('ready', () => {
  createMainWindow();
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
  if (isDev) {
    globalShortcut.register("CmdOrCtrl+R", () => mainWindow.reload())
    globalShortcut.register(isMac ? "Command+Alt+I" : "Ctrl+Shift+I", () => mainWindow.webContents.openDevTools())

  }
  mainWindow.on('ready', () => mainWindow = null)
})


app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})