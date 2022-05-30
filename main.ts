// Import modules
import { app, BrowserWindow } from 'electron'
import express from 'express'
import path from 'path'

// Arbitrary port for Electron to use
const PORT = 7259

// Electron App window
let win: BrowserWindow | null

// Function to create a new App window
const createWindow = () => {
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    autoHideMenuBar: true,
  })
  // Load the HTML file from the frontend folder
  win.title = 'Hello World | Electron'
  win.loadURL(`http://localhost:${PORT}`)
  win.on('closed', () => {
    win = null
  })
}

// Setup callbacks for various GUI events
// This is in an if statement to allow for testing from a browser in development
if (app) {
  // When the App initializes, call createWindow 
  app.on('ready', () => {
    createWindow()
  })
  // When all App windows are closed, quit the App (except on MacOS)
  app.on('window-all-closed', () => {
    // It is common for MacOS apps to keep running in the background even when all
    // windows are closed, until the user explicitly quits the App from the dock
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  // When the App is 'activated' (previously running in the background), call createWindow
  // This is only needed due to the 'window-all-closed' MacOS exception above
  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })
}

// Initialize an Express server
const expressApp: express.Application = express()

// Ensure the frontend folder is accessible by clients
expressApp.use(express.static(path.join(__dirname, "../frontend")))

// Hello World endpoint
expressApp.get("/api/hello", async (req, res) => {
  res.status(200).send('Howdy! From expressApp api end-point.')
})

// Add other endpoints here as needed

// All other endpoints redirect to the frontend
expressApp.all("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"))
})

// Start the Express server
expressApp.listen(process.env.PORT || PORT, () => {
  console.log(`Running (port ${process.env.PORT || PORT})`)
})