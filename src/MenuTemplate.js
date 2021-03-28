const { isMac, isDev } = require('./Constants')
const { createAboutWindow } = require('./Helpers')

const menu = [
  ...(isMac ? [{
    label: "Image Shrinker",
    submenu: [{
      label: "About",
      click: createAboutWindow
    }]
  }] : []),
  {
    role: "fileMenu"
  },
  {
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]
  },
  ...(isDev ? [
    {
      label: "Developer",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { type: "separator" },
        { role: "toggledevtools" },

      ]
    }
  ] : []),
  ...(!isMac ? [{
    label: "Help",
    submenu: [{
      label: "About",
      click: createAboutWindow
    }]
  }] : [])
]

module.exports = { menu }