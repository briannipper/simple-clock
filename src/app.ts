function loadDoc (msgButton: HTMLElement, msgHeading: HTMLElement) {
  const msgBtnInputElem: HTMLInputElement = msgButton as HTMLInputElement
  msgBtnInputElem.disabled = true
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function (res: Event) {
    if (res.target !== null) {
      res.target.addEventListener('readystatechange', () => {
        if (this.readyState === 4) {
          msgBtnInputElem.disabled = false
        }
        if (this.readyState === 4 && this.status === 200) {
          msgBtnInputElem.disabled = true
          msgHeading.innerHTML = this.responseText
          setTimeout(() => {
            msgBtnInputElem.disabled = false
            msgHeading.innerHTML = ''
          }, 5000)
        }
      })
    }
  }
  xhttp.open('GET', 'http://localhost:7259/api/hello', true)
  xhttp.send()
}

const msgButtonElm: HTMLElement =
  document.getElementById('messageButton') || new HTMLElement()
const msgHeaderElm: HTMLElement =
  document.getElementById('messageHeader') || new HTMLElement()

msgButtonElm.addEventListener('click', () => {
  loadDoc(msgButtonElm, msgHeaderElm)
})
