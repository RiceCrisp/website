import * as utils from './utils.js'

function init() {
  document.addEventListener('click', (e) => {
    const shareButton = utils.checkParents(e.target, '.share-button')
    if (shareButton) {
      e.preventDefault()
      window.open(shareButton.getAttribute('href'), shareButton.getAttribute('target'), 'resizeable,width=550,height=520')
    }
  })
}

export { init }
