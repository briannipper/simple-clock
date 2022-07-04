import axios from 'axios'
import { CurrentTime } from '../CurrentTime'

export class TimeApi {
  getAvailableTimeZones = async () => {
    try {
      const response = await axios.get<{ data: CurrentTime }>('https://www.timeapi.io/api/TimeZone/AvailableTimeZones')
      return response
    } catch (err) {
      console.error('axios-timeapi_io-get-available-time-zones-api', err)
    }
  }

  getCurrentTime = async () => {
    try {
      const response = await axios.get<{ data: CurrentTime }>('https://www.timeapi.io/api/Time/current/zone?timeZone=America/New_York')
      return response
    } catch (err) {
      console.error('axios-timeapi_io-get-current-time-api', err)
    }
  }
}
