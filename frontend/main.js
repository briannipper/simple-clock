function loadDoc (
  msgButton,
  msgHeading) {
  const xhttp = new XMLHttpRequest()
  msgButton.disabled = true
  xhttp.onreadystatechange = (res) => {
    if (res.target.readyState === 4) {
      msgButton.disabled = false
    }
    if (res.target.readyState === 4 && res.target.status === 200) {
      msgButton.disabled = true
      msgHeading.innerHTML = res.target.responseText
      setTimeout(() => {
        msgButton.disabled = false
        msgHeading.innerHTML = ''
      }, 5000)
    }
  }
  xhttp.open('GET', 'http://localhost:7259/api/hello', true)
  xhttp.send()
}

const msgButtonElm = document.getElementById('messageButton')
const msgHeaderElm = document.getElementById('heading')

msgButtonElm.addEventListener('click', () => { loadDoc(msgButtonElm, msgHeaderElm) })
