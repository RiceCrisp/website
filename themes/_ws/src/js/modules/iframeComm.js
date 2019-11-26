function init() {
  function receiveMessage(e) {
    if (e.origin !== 'https://iframe.url.com') {
      return
    }
    if (e.data.url) {
      if (e.data.height) {
        document.querySelector(`iframe[src="${e.data.url}"]`).style.height = `${e.data.height}px`
      }
    }
  }
  window.addEventListener('message', receiveMessage, false)

  // Don't use this function here, use in the iframe
  // function sendMessage() {
  //   const docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight)
  //   if (window.location.href) {
  //     window.parent.postMessage({ 'url': window.location.href, 'height': docHeight }, '*')
  //   }
  // }
  // setInterval(sendMessage, 500)
}

export { init }
