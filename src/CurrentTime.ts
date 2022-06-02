export class CurrentTime {
  public year: number
  public month: number
  public day: number
  public hour: number
  public minute: number
  public seconds: number
  public milliSeconds: number
  public dateTime: string
  public date: Date
  public time: string
  public timeZone: string
  public dayOfWeek: string
  public dstActive: boolean

  constructor () {
    this.year = 0
    this.month = 0
    this.day = 0
    this.hour = 0
    this.minute = 0
    this.seconds = 0
    this.milliSeconds = 0
    this.dateTime = ''
    this.date = new Date()
    this.time = ''
    this.timeZone = ''
    this.dayOfWeek = ''
    this.dstActive = false
  }
}
