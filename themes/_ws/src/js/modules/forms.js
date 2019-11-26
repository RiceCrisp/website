/* global MktoForms2 */
import * as utils from './utils.js'

function init() {
  // emptySelectStyles()
  updateUtmCookies()
  // addMarketoListeners()
  // addHubspotListeners()
  addPardotListeners()
}

function addMarketoListeners() {
  if (typeof MktoForms2 !== 'undefined') {
    MktoForms2.whenReady(form => {
      emptySelectStyles()
      moveSubmit(form.getFormElem()[0])
      // pullUtmCookies(form)
      form.onValidate(() => {
        form.getFormElem()[0].classList.add('submitted')
      })
      form.onSuccess((values, followUpUrl) => {
        form.getFormElem().hide()
        const thankYou = form.getFormElem()[0].nextElementSibling.nextElementSibling
        thankYou.innerHTML = atob(thankYou.innerHTML)
        thankYou.style.display = 'block'
        return false
      })
    })
  }
}

function addHubspotListeners() {
  window.addEventListener('hsvalidatedsubmit', e => {
    e.target.parentElement.style.display = 'none'
    const thankYou = e.target.parentElement.nextElementSibling
    thankYou.innerHTML = atob(thankYou.innerHTML)
    thankYou.style.display = 'block'
  })
}

function addPardotListeners() {
  function receiveMessage(e) {
    if (e.origin !== 'http://go.pardot.com') {
      return
    }
    if (e.data.url) {
      console.log(e.data)
      if (e.data.height) {
        document.querySelector(`iframe[src="${e.data.url}"]`).style.height = `${e.data.height}px`
      }
      if (e.data.submitted) {
        // Send GA event
        const form = document.querySelector(`iframe[src^="${e.data.url}"]`)
        const thankYou = form.nextElementSibling
        if (thankYou.innerHTML !== '') {
          form.style.display = 'none'
          thankYou.innerHTML = atob(thankYou.innerHTML)
          thankYou.style.display = 'block'
        }
      }
    }
  }
  window.addEventListener('message', receiveMessage, false)
}

function updateUtmCookies() {
  if (location.search) {
    const keyValuePairs = location.search.substr(1).split('&')
    keyValuePairs.forEach(keyValuePair => {
      const temp = keyValuePair.split('=')
      const key = temp[0]
      const value = temp[1]
      if (key.indexOf('utm_') === 0 || key === 'gclid') {
        document.cookie = `${key}=${value}; path=/`
      }
    })
  }
  document.cookie = `referrer=${document.referrer}; path=/`
}

function pullUtmCookies(f) {
  const cookies = document.cookie.split('; ').filter(cookie => {
    return cookie.indexOf('utm_') === 0 || cookie.indexOf('gclid')
  })
  cookies.forEach(cookie => {
    const temp = cookie.split('=')
    const field = temp[0]
    const value = temp[1]
    f.vals({ [field]: value })
  })
}

function moveSubmit(form) {
  const btnRow = form.querySelector('.mktoButtonRow')
  const fields = form.querySelectorAll('input:not([type=hidden]), select, textarea')
  const lastField = fields[fields.length - 1].name === 'honeypot' ? fields[fields.length - 2] : fields[fields.length - 1]
  const lastRow = utils.checkParents(lastField, '.mktoFormRow')
  lastRow.insertAdjacentHTML('afterend', btnRow.outerHTML)
  btnRow.parentNode.removeChild(btnRow)
}

function emptySelectStyles() {
  document.querySelectorAll('select').forEach(el => {
    if (el.value === '') {
      el.classList.add('empty')
    }
    else {
      el.classList.remove('empty')
    }
    el.addEventListener('change', emptySelectEvent)
  })
}

function emptySelectEvent(e) {
  if (this.value === '') {
    this.classList.add('empty')
  }
  else {
    this.classList.remove('empty')
  }
}

export { init }
