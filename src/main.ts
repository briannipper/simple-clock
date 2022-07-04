import { app, BrowserWindow } from 'electron'
import path from 'path'
import { ClockApp } from './ClockApp'
import ExpressServer from './backend/express-app'

let win: BrowserWindow | null
const clockApp: ClockApp = new ClockApp()
const expServer = ExpressServer

const createWindow = () => {
  win = new BrowserWindow({
    autoHideMenuBar: true,
    backgroundColor: '#ffffff',
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true,
      nodeIntegration: true,
      contextIsolation: false
    },
    width: 600
  })

  win.title = clockApp.appTitle
  win.loadURL(`http://localhost:${expServer.port}`)
  win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
}

if (app) {
  app.on('ready', () => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })
}
