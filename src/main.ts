import { app, BrowserWindow } from 'electron'
import express from 'express'
import path from 'path'

const PORT = 7259

let win: BrowserWindow | null

const createWindow = () => {
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    autoHideMenuBar: true
  })

  win.title = 'Simple Clock'
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
