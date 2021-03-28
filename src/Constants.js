process.env.NODE_ENV = "development"

const isDev = process.env.NODE_ENV == "development"
const isMac = process.platform === "darwin"

module.exports = { isDev, isMac }
