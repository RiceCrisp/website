import * as utils from './utils'
import * as lazy from './lazy.js'
import * as animate from './animate.js'

function init() {
  document.querySelectorAll('.infinite-scroll-btn').forEach(el => {
    const div = document.createElement('div')
    const btn = document.createElement('button')
    div.classList.add('col-xs-12')
    div.classList.add('load-more')
    // btn.classList.add('btn')
    btn.innerHTML = '+ Load More'
    div.appendChild(btn)
    el.appendChild(div)
  })
  document.removeEventListener('click', buttonEvent, false)
  document.addEventListener('click', buttonEvent, false)
}

function buttonEvent(e) {
  const btn = utils.checkParents(e.target, '.load-more button')
  if (btn) {
    e.preventDefault()
    const loopContainer = btn.parentNode.parentNode
    const loop = loopContainer.querySelector('.loop-var') ? loopContainer.querySelector('.loop-var').value : ''
    const type = loopContainer.hasAttribute('type') ? `&type=${loopContainer.getAttribute('type')}` : ''
    const numposts = loopContainer.hasAttribute('numposts') ? `&numposts=${loopContainer.getAttribute('numposts')}` : ''
    const exclude = loopContainer.hasAttribute('exclude') ? `&exclude=${loopContainer.getAttribute('exclude')}` : ''
    const url = `/wp-admin/admin-ajax.php?action=_ws_get_more_posts&page=${(loopContainer.getAttribute('page') || '2')}&loop=${encodeURIComponent(loop)}${type}${numposts}${exclude}`
    btn.innerHTML = 'Loading...'
    btn.disabled = true
    utils.handleAjax(url, buttonSuccess, buttonFail, btn)
  }
}

function buttonSuccess(data, btn) {
  const loopContainer = btn.parentNode.parentNode
  const page = loopContainer.getAttribute('page')
  btn.parentNode.insertAdjacentHTML('beforebegin', data.output)
  btn.innerHTML = '+ Load More'
  btn.disabled = false
  loopContainer.setAttribute('page', page ? parseInt(page) + 1 : 3)
  if (!data.more) {
    btn.parentNode.removeChild(btn)
  }
  loopContainer.classList.add('animate-group')
  animate.animateEvent()
  lazy.lazyEvent()
}

function buttonFail(btn) {
  btn.outerHTML = 'We are sorry, but it appears that something has gone wrong. Please try again at a later time.'
}

export { init, buttonEvent, buttonSuccess, buttonFail }
