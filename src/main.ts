import { app, BrowserWindow } from 'electron'
import express from 'express'
import path from 'path'
import { ClockApp } from './ClockApp'
import axios from 'axios'
import { CurrentTime } from './CurrentTime'

const PORT = 7259

let win: BrowserWindow | null
const clockApp: ClockApp = new ClockApp()

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

expressApp.disable('etag')

expressApp.use(express.static(path.join(__dirname, '../frontend')))

expressApp.use(express.static(path.join(__dirname, '../dist')))

const getCurrentTime = async () => {
  try {
    const response = await axios.get<{ data: CurrentTime }>('https://www.timeapi.io/api/Time/current/zone?timeZone=America/New_York')
    return response
  } catch (err) {
    console.error('axios-timeapi_io-get-current-time-api', err)
  }
}

expressApp.get('/api/current/time', async (req, res) => {
  const currentTime = await getCurrentTime()
  if (currentTime !== null && currentTime !== undefined) {
    res.status(200).send(currentTime.data)
  } else {
    res.status(404).send()
  }
})

expressApp.get('/api/hello', async (req, res) => {
  res.status(200).send('Howdy! From expressApp api end-point.')
})

expressApp.all('*', async (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'))
})

expressApp.listen(process.env.PORT || PORT, () => {
  console.log(`Running (port ${process.env.PORT || PORT})`)
})
