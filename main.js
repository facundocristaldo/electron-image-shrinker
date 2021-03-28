const path = require("path")
const os = require("os")
const { app, BrowserWindow, Menu, globalShortcut, ipcMain, shell } = require("electron")
const { menu } = require('./src/MenuTemplate')
const { isMac, isDev } = require('./src/Constants')
const log = require("electron-log")

const imagemin = require("imagemin")
const imageminMozjpeg = require("imagemin-mozjpeg")
const imageminPngquant = require("imagemin-pngquant")
const slash = require("slash")

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Image Shrinker",
    width: 500,
    height: 750,
    icon: `./assets/icons/Icon_256x256.png`,
    resizable: isDev,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
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

ipcMain.on("image:minimize", (event, options) => {
  shrinkImage(options)

})

async function shrinkImage({ imgPaths, quality, dest }) {
  try {
    const pngQuality = quality / 100
    mainWindow.webContents.send('image:start')
    const slashedFilePaths = [];
    for (index in imgPaths) {
      if (imgPaths[index]) slashedFilePaths.push(slash(imgPaths[index]))
    }
    const files = await imagemin(
      slashedFilePaths,
      {
        destination: dest,
        plugins: [
          imageminMozjpeg({ quality }),
          imageminPngquant({ quality: [pngQuality, pngQuality] })
        ]
      }
    )
    shell.openPath(dest)
    mainWindow.webContents.send('image:done')
  } catch (error) {
    log.error(error)
  }
}

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