// import { Promise } from '@babel/polyfill' // eslint-disable-line no-unused-vars
// import { fetch } from 'whatwg-fetch'

// Sets the correct transition-end event depending on browser
const transitionEvent = (function whichTransitionEvent() {
  const el = document.createElement('fakeelement')
  const transitions = {
    transition: 'transitionend',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  }
  for (const t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t]
    }
  }
})()

// Sets the correct animation-end event depending on browser
const animationEvent = (function whichAnimationEvent() {
  const el = document.createElement('fakeelement')
  const animations = {
    animation: 'animationend',
    MozAnimation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd'
  }
  for (const a in animations) {
    if (el.style[a] !== undefined) {
      return animations[a]
    }
  }
})()

// Helper function to see if we're in a child element (for elements added dynamically)
function checkParents(el, selector) {
  let cur = el
  const all = document.querySelectorAll(selector)
  while (cur) {
    for (let i = 0; i < all.length; i++) {
      if (all[i] === cur) {
        return cur
      }
    }
    cur = cur.parentNode
  }
  return false
}

function handleAjax(url, success, fail, args) {
  const req = new XMLHttpRequest()
  req.open('GET', url, true)
  req.onload = () => {
    console.log(req.response)
    const data = JSON.parse(req.response)
    if (req.status === 200 && data) {
      success(data, args)
    }
    else {
      fail(args)
    }
  }
  req.onerror = () => {
    fail(args)
  }
  req.send()
  // fetch(url)
  //   .then(res => {
  //     if (res.status === 200) {
  //       res.json().then(data => {
  //         success(data, args)
  //       })
  //     }
  //     else {
  //       fail()
  //     }
  //   })
  //   .catch(err => {
  //     fail(args)
  //     console.error(err)
  //   })
}


// Helper function for scrolling
function onScreen(el, visible) {
  const rect = el.getBoundingClientRect()
  // element is hidden
  if (el.offsetParent === null) {
    return false
  }
  // visible is a percentage
  if (visible.substring(visible.length - 1, visible.length) === '%') {
    visible = Number(visible.replace(/%/g, ''))
    return !(
      Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / (rect.height * -1)) * 100)) < visible ||
      Math.floor(100 - ((rect.bottom - window.innerHeight) / rect.height) * 100) < visible
    )
  }
  // visible is in pixels
  visible = Number(visible.replace(/[px]+/g, ''))
  return (rect.top < window.innerHeight + visible &&
    rect.bottom >= 0 - visible)
}

function defaultFocusHandler(e) {
  e.preventDefault()
  e.target.focus({ preventScroll: true })
  e.relatedTarget.focus()
}


// Prevent focus from leaving element children
function trapFocus(element, handleFocus) {
  if (handleFocus === undefined) {
    handleFocus = defaultFocusHandler
  }
  const preDiv = document.createElement('div')
  preDiv.tabIndex = 0
  element.insertBefore(preDiv, element.firstChild)
  const postDiv = document.createElement('div')
  postDiv.tabIndex = 0
  element.appendChild(postDiv)
  preDiv.addEventListener('focus', handleFocus)
  postDiv.addEventListener('focus', handleFocus)
}

// Allow focus to leave element children
function releaseFocus(element, handleFocus) {
  if (handleFocus === undefined) {
    handleFocus = defaultFocusHandler
  }
  element.firstElementChild.removeEventListener('focus', handleFocus)
  element.lastElementChild.removeEventListener('focus', handleFocus)
  element.firstElementChild.parentNode.removeChild(element.firstElementChild)
  element.lastElementChild.parentNode.removeChild(element.lastElementChild)
}

// Helper function for sending form data via ajax
function serializeForm(form) {
  const s = []
  for (const el of form.elements) {
    if (el.name && !el.disabled && el.type !== 'file' && el.type !== 'reset' && el.type !== 'submit' && el.type !== 'button') {
      if (el.type === 'select-multiple') {
        el.options.forEach(option => {
          if (option.selected) {
            s[s.length] = `${encodeURIComponent(el.name)}=${encodeURIComponent(option.value)}`
          }
        })
      }
      else if ((el.type !== 'checkbox' && el.type !== 'radio') || el.checked) {
        s[s.length] = `${encodeURIComponent(el.name)}=${encodeURIComponent(el.value)}`
      }
    }
  }
  return s.join('&').replace(/%20/g, '+')
}

// Returns unique id
function uniqid() {
  const time = Date.now()
  const last = uniqid.last || time
  uniqid.last = time > last ? time : last + 1
  return uniqid.last.toString(36)
}

export { transitionEvent, animationEvent, checkParents, handleAjax, onScreen, trapFocus, releaseFocus, serializeForm, uniqid }
