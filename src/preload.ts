window.addEventListener('DOMContentLoaded', () => {

    const replaceText = (selector: string, text: string) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
        const processVersion = process.versions[dependency] || '0.0.0';
        replaceText(`${dependency}-version`, processVersion);
    }

})