import * as mods from './modules'

// Fix foreach in browsers
if (typeof NodeList !== 'undefined' && NodeList.prototype) {
  // forEach
  if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach
  }
  // Iterability
  if (typeof Symbol !== 'undefined' && Symbol.iterator && !NodeList.prototype[Symbol.iterator]) {
    Object.defineProperty(NodeList.prototype, Symbol.iterator, {
      value: Array.prototype[Symbol.itereator],
      writable: true,
      configurable: true
    })
  }
}

const tz = new Date().getTimezoneOffset() // minutes
document.cookie = `tzOffset=${tz};path=/`

// mods.customSelect() // Must come before achiveListener
// mods.accordion()
// mods.archiveListener()
// mods.forceMinMax()
// mods.forms()
// mods.header()
// mods.iframeComm()
// mods.infiniteButton()
// mods.infiniteScroll()
mods.scrollListener()
mods.lazy()
// mods.animate()
// mods.lightbox()
// mods.serviceWorker()
// mods.slider()
// mods.socialShare()
// mods.tabbedPanels()

document.body.classList.remove('no-transitions') // Prevents CSS transitions on page load
