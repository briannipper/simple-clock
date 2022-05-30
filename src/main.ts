import { app, BrowserWindow } from 'electron'
import express from 'express'
import path from 'path'
import { ClockApp } from './ClockApp'

const PORT = 7259

let win: BrowserWindow | null
const clockApp: ClockApp = new ClockApp()

const createWindow = () => {
  win = new BrowserWindow({
    autoHideMenuBar: true,
    backgroundColor: '#ffffff',
    height: 600,
    webPreferences:
    {
      preload: path.join(__dirname, 'preload.js')
    },
    width: 600
  })

  win.title = clockApp.appTitle
  win.loadURL(`http://localhost:${PORT}`)
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

const expressApp: express.Application = express()

expressApp.use(express.static(path.join(__dirname, '../frontend')))

expressApp.get('/api/hello', async (req, res) => {
  res.status(200).send('Howdy! From expressApp api end-point.')
})

expressApp.all('*', async (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'))
})

expressApp.listen(process.env.PORT || PORT, () => {
  console.log(`Running (port ${process.env.PORT || PORT})`)
})
