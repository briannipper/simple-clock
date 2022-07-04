import express from 'express'
import path from 'path'
import { TimeApi } from './timeapi-io'

class ExpressServer {
  public app
  public port = 7259

  constructor() {
    this.app = express()
    this.setHeaders()
    this.setStaticContent()
    this.setRoutes()
    this.setListen()
  }

  setHeaders () {
    this.app.disable('etag')
    this.app.disable('x-powered-by')
  }

  setStaticContent () {
    this.app.use(express.static(path.join(__dirname, '../../frontend')))
    this.app.use(express.static(path.join(__dirname, '../../dist')))
  }

  setRoutes () {
    const timeApi = new TimeApi()

    this.app.get('/api/time-zones', async (req, res) => {
      const timeZones = await timeApi.getAvailableTimeZones()
      if (timeZones !== null && timeZones !== undefined) {
        res.status(200).send(timeZones.data)
      } else {
        res.status(400).send()
      }
    })

    this.app.get('/api/current/time', async (req, res) => {
      const currentTime = await timeApi.getCurrentTime()
      if (currentTime !== null && currentTime !== undefined) {
        res.status(200).send(currentTime.data)
      } else {
        res.status(400).send()
      }
    })

    this.app.get('/api/hello', async (req, res) => {
      res.status(200).send('Howdy! From expressApp api end-point.')
    })

    this.app.all('*', async (req, res) => {
      res.sendFile(path.join(__dirname, '../../frontend/index.html'))
    })
  }

  setListen () {
    this.app.listen(process.env.PORT || this.port, () => {
      console.log(`Running (port ${process.env.PORT || this.port})`)
    })
  }
}

export default new ExpressServer()
