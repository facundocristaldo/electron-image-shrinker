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
  ...(isDev && [
    {
      label: "Developer",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { type: "separator" },
        { role: "toggledevtools" },

      ]
    }
  ]),
  ...(!isMac ? [{
    label: "Help",
    submenu: [{
      label: "About",
      click: createAboutWindow
    }]
  }] : [])
]

module.exports = { menu }