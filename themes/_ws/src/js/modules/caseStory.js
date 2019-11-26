import * as utils from './utils.js'

function init() {
  document.querySelectorAll('.ws-block-case-story-timeline ').forEach(el => {
    createNav(el)
  })
  if (document.querySelectorAll('.ws-block-case-story-timeline')) {
    window.removeEventListener('throttleScroll', caseStoryEvent, false)
    window.addEventListener('throttleScroll', caseStoryEvent, false)
  }
}

function createNav(el) {
  let navs = '<div><ul>'
  el.querySelectorAll('.wp-block-ws-case-story-milestone-left .anchor').forEach((anchor, i) => {
    const heading = anchor.nextElementSibling.innerHTML
    navs += `<li><a ${i === 0 ? 'class="current"' : ''} href="#${anchor.id}" aria-label="${heading}"><span>${heading}</span></a></li>`
  })
  navs += '</ul></div>'
  document.querySelector('.timeline-nav').innerHTML = navs
}

function caseStoryEvent(e) {
  const buttons = document.querySelectorAll('.timeline-nav a')
  document.querySelectorAll('.wp-block-ws-case-story-milestone-left').forEach(milestone => {
    if (utils.onScreen(milestone, '100%')) {
      const anchor = milestone.querySelector('.anchor').getAttribute('id')
      buttons.forEach(el => {
        if (el.getAttribute('href') === `#${anchor}`) {
          el.classList.add('current')
        }
        else {
          el.classList.remove('current')
        }
      })
    }
  })
}

export { init }
