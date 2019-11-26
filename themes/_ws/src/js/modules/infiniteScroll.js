import * as utils from './utils'
import * as lazy from './lazy.js'

function init() {
  document.querySelectorAll('.infinite-scroll').forEach(el => {
    const load = document.createElement('div')
    load.classList.add('col-xs-12')
    load.classList.add('load-more')
    load.innerHTML = 'Loading...'
    el.appendChild(load)
  })
  function scrollsEvent(e) {
    document.querySelectorAll('.infinite-scroll').forEach((el, i) => {
      const load = el.querySelector('.load-more')
      if (utils.onScreen(load, -100)) {
        const loop = el.querySelector('.loop-var') ? el.querySelector('.loop-var').value : ''
        const type = el.hasAttribute('type') ? `&type=${el.getAttribute('type')}` : ''
        const url = `/wp-admin/admin-ajax.php?action=_ws_get_more_posts&page=${(el.getAttribute('page') || '2')}&loop=${encodeURIComponent(loop)}${type}`
        utils.handleAjax(url, scrollSuccess, scrollFail, { el: el, callback: scrollsEvent })
      }
    })
  }
  window.removeEventListener('throttleScroll', scrollsEvent, false)
  window.addEventListener('throttleScroll', scrollsEvent, false)
}

function scrollSuccess(data, args) {
  const load = args.el.querySelector('.load-more')
  const page = args.el.getAttribute('page')
  load.insertAdjacentHTML('beforebegin', data.output)
  args.el.setAttribute('page', page ? parseInt(page) + 1 : 3)
  if (!data.more) {
    load.parentNode.removeChild(load)
  }
  lazy.init()
  args.callback()
}

function scrollFail(args) {
  const load = args.el.querySelector('.load-more')
  load.outerHTML = 'We are sorry, but it appears that something has gone wrong. Please try again at a later time.'
}

export { init, scrollSuccess, scrollFail }
