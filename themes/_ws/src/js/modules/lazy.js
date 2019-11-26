/* global objectFitPolyfill */
import * as utils from './utils.js'
import 'objectFitPolyfill/dist/objectFitPolyfill.min.js'

function init() {
  lazyEvent()
  window.addEventListener('load', () => {
    lazyEvent()
    // lazyVideo()
  })
  window.removeEventListener('throttleScroll', lazyEvent, false)
  window.addEventListener('throttleScroll', lazyEvent, false)
  window.removeEventListener('resize', lazyEvent, false)
  window.addEventListener('resize', lazyEvent, false)
  // window.removeEventListener('resize', lazyVideo, false)
  // window.addEventListener('resize', lazyVideo, false)
}

function lazyEvent() {
  document.querySelectorAll('.lazy-load').forEach(el => {
    if (utils.onScreen(el, '200px')) {
      if (el.tagName === 'IMG') {
        if (el.hasAttribute('data-sizes')) {
          el.sizes = el.getAttribute('data-sizes')
        }
        if (el.hasAttribute('data-srcset')) {
          el.srcset = el.getAttribute('data-srcset')
        }
        if (el.hasAttribute('data-src')) {
          el.src = el.getAttribute('data-src')
        }
        if (el.hasAttribute('data-object-fit')) {
          objectFitPolyfill(el)
        }
      }
      else if (el.tagName === 'VIDEO') {
        const node = document.createElement('SOURCE')
        node.setAttribute('type', 'video/mp4')
        node.setAttribute('src', el.getAttribute('data-src'))
        el.appendChild(node)
        el.load()
      }
      else {
        if (!el.style.backgroundImage && el.getAttribute('data-src')) {
          el.style.backgroundImage = `url(${el.getAttribute('data-src')})`
        }
      }
      el.classList.remove('lazy-load')
    }
  })
}

function lazyVideo() {
  if (window.innerWidth > 768) {
    document.querySelectorAll('.bg-video.lazy').forEach(video => {
      for (let i = 0; i < video.children.length; i++) {
        const source = video.children[i]
        if (typeof source.tagName === 'string' && source.tagName === 'SOURCE') {
          source.src = source.getAttribute('data-src')
        }
      }
      video.load()
      video.classList.remove('lazy')
    })
  }
}

export { init, lazyEvent }
