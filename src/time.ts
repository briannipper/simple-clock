function loadCurrentTimeZone (
  clockBtn: HTMLElement,
  clockHeader: HTMLElement,
  elmCollection: { id: string, elm: HTMLElement }[]) {
  const clockBtnInputElem: HTMLInputElement = clockBtn as HTMLInputElement
  clockBtnInputElem.disabled = true
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function (res: Event) {
    if (res.target !== null) {
      res.target.addEventListener('readystatechange', () => {
        if (this.readyState === 4) {
          clockBtnInputElem.disabled = false
        }
        if (this.readyState === 4 && this.status === 200) {
          clockBtnInputElem.disabled = true
          clockHeader.innerHTML = this.responseText
          elmCollection[0].elm.innerHTML = 'YEAR'
          setTimeout(() => {
            clockBtnInputElem.disabled = false
            clockHeader.innerHTML = ''
          }, 5000)
        }
      })
    }
  }
  xhttp.open('GET', 'http://localhost:7259/api/current/time', true)
  xhttp.send()
}

const clockButtonElm: HTMLElement =
  document.getElementById('clockButton') || new HTMLElement()
const clockHeaderElm: HTMLElement =
  document.getElementById('clockHeading') || new HTMLElement()
const yearElm: HTMLElement =
  document.getElementById('year') || new HTMLElement()
const monthElm: HTMLElement =
  document.getElementById('month') || new HTMLElement()
const elmCollection = [
  { id: 'yearElm', elm: yearElm },
  { id: 'monthElm', elm: monthElm }
]

clockButtonElm.addEventListener('click', () => {
  loadCurrentTimeZone(
    clockButtonElm,
    clockHeaderElm,
    elmCollection)
})
