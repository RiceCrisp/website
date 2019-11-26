import * as utils from './utils.js'

function init() {
  updateTabIndex()
  window.addEventListener('resize', updateTabIndex)
  // scrollMenu()
  tabbableDesktopMenu()
  tabbableMobileMenu()
  keyboardDesktopMenu()
  keyboardMobileMenu()
}

function scrollMenu() {
  let lastScrollY = 0
  const menu = document.querySelector('.site-header')
  window.removeEventListener('throttleScroll', scrollMenuEvent, false)
  window.addEventListener('throttleScroll', scrollMenuEvent, false)
  function scrollMenuEvent() {
    if (window.pageYOffset < menu.offsetHeight) {
      menu.classList.add('scroll-header')
    }
    else {
      if (lastScrollY - window.pageYOffset >= 1) {
        menu.classList.add('scroll-header')
      }
      else {
        menu.classList.remove('scroll-header')
      }
    }
    lastScrollY = window.pageYOffset
  }
}

function tabbableDesktopMenu() {
  document.querySelectorAll('.site-header .sub-menu a').forEach(subnav => {
    subnav.addEventListener('focus', e => {
      getParentNav(subnav)
    })
    subnav.addEventListener('blur', e => {
      subnav.parentElement.parentElement.parentElement.classList.remove('hover')
    })
  })
}

function tabbableMobileMenu() {
  document.querySelector('.site-header .hamburger').addEventListener('click', function(e) {
    e.preventDefault()
    if (this.classList.contains('opened')) {
      closeMobileMenu(this)
    }
    else {
      openMobileMenu(this)
    }
  })
  document.querySelectorAll('.site-header .dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', e => {
      console.log('here')
      if (this.classList.contains('opened')) {
        closeMobileDropdown(dropdown)
      }
      else {
        openMobileDropdown(dropdown)
      }
    })
  })
}

function keyboardDesktopMenu() {
  document.querySelectorAll('.site-header .menu > .menu-item > a, .site-header .menu-search-form input').forEach((el, i, a) => {
    // Prevent keyboard scrolling
    el.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
      }
    })
    const submenuItems = el.parentElement.querySelectorAll('.sub-menu a')
    el.addEventListener('keyup', e => {
      if (window.innerWidth >= 992) {
        if (e.key === 'ArrowLeft') {
          if (e.target.getAttribute('type') !== 'search') {
            goToIndex(i - 1, a).focus()
          }
        }
        if (e.key === 'ArrowRight') {
          if (e.target.getAttribute('type') !== 'search') {
            goToIndex(i + 1, a).focus()
          }
        }
        if (submenuItems.length) {
          if (e.key === 'ArrowUp') {
            submenuItems[submenuItems.length - 1].focus()
          }
          if (e.key === 'ArrowDown') {
            submenuItems[0].focus()
          }
        }
      }
    })
    if (submenuItems.length) {
      submenuItems.forEach((el2, i2, a2) => {
        // Prevent keyboard scrolling
        el2.addEventListener('keydown', e => {
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault()
          }
        })
        el2.addEventListener('keyup', e => {
          if (window.innerWidth >= 992) {
            if (e.key === 'ArrowUp') {
              goToIndex(i2 - 1, a2).focus()
            }
            if (e.key === 'ArrowDown') {
              goToIndex(i2 + 1, a2).focus()
            }
            if (e.key === 'ArrowLeft') {
              goToIndex(i - 1, a).focus()
            }
            if (e.key === 'ArrowRight') {
              goToIndex(i + 1, a).focus()
            }
            if (e.key === 'Escape') {
              goToIndex(i, a).focus()
            }
          }
        })
      })
    }
  })
}

function keyboardMobileMenu() {
  document.querySelectorAll('.site-header .menu > .menu-item > a, .site-header .menu-search-form input').forEach((el, i, a) => {
    // Prevent keyboard scrolling
    el.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
      }
    })
    const dropdownBtn = el.parentNode.querySelector('.dropdown')
    const dropdownMenu = el.parentNode.querySelector('.sub-menu')
    if (dropdownBtn) {
      dropdownMenu.querySelectorAll('a').forEach(el => {
        el.setAttribute('tabIndex', '-1')
      })
      dropdownBtn.addEventListener('click', e => {
        if (dropdownBtn.getAttribute('aria-expanded') === 'true') {
          dropdownBtn.setAttribute('aria-expanded', 'false')
          dropdownMenu.querySelectorAll('a').forEach(el => {
            el.setAttribute('tabindex', -1)
          })
        }
        else {
          dropdownBtn.setAttribute('aria-expanded', 'true')
          dropdownMenu.querySelectorAll('a').forEach(el => {
            el.setAttribute('tabindex', 0)
          })
        }
      })
    }
  })
}

function getParentNav(a) {
  const parent = a.parentElement.parentElement
  if (parent.classList.contains('sub-menu')) {
    const li = parent.parentElement
    li.classList.add('hover')
    getParentNav(li.children[0])
  }
}

function updateTabIndex() {
  if (getComputedStyle(document.querySelector('.hamburger')).display !== 'none') {
    // Mobile
    document.querySelectorAll('.site-header .menu-item a, .site-header .dropdown, .site-header .menu-search-form input').forEach(el => {
      el.setAttribute('tabindex', '-1')
    })
  }
  else {
    // Desktop
    document.querySelectorAll('.site-header .menu-item a, .site-header .dropdown, .site-header .menu-search-form input').forEach(el => {
      el.setAttribute('tabindex', '0')
    })
  }
}

function openMobileMenu(hamburger) {
  const menu = document.querySelector('.site-header .menu-container')
  hamburger.classList.remove('closed')
  hamburger.classList.add('opened')
  menu.classList.remove('closed')
  menu.classList.add('opened')
  hamburger.setAttribute('aria-expanded', 'true')
  document.body.classList.add('no-scroll')
  document.querySelectorAll('.site-header .menu > .menu-item > a, .site-header .dropdown, .site-header .menu-search-form input').forEach(el => {
    el.setAttribute('tabindex', '0')
  })
  utils.trapFocus(document.querySelector('.site-header'))
}

function closeMobileMenu(hamburger) {
  const menu = document.querySelector('.site-header .menu-container')
  hamburger.classList.remove('opened')
  hamburger.classList.add('closed')
  menu.classList.remove('opened')
  menu.classList.add('closed')
  hamburger.setAttribute('aria-expanded', 'false')
  document.body.classList.remove('no-scroll')
  document.querySelectorAll('.site-header .menu-item a, .site-header .dropdown, .site-header .menu-search-form input').forEach(el => {
    el.setAttribute('tabindex', '-1')
    if (el.hasAttribute('aria-expanded')) {
      el.setAttribute('aria-expanded', 'false')
    }
  })
  utils.releaseFocus(document.querySelector('.site-header'))
}

function openMobileDropdown(dropdown) {
  dropdown.classList.remove('closed')
  dropdown.classList.add('opened')
  dropdown.setAttribute('aria-expanded', 'true')
  dropdown.nextElementSibling.querySelectorAll('a').forEach(el => {
    el.setAttribute('tabindex', '0')
  })
}

function closeMobileDropdown(dropdown) {
  dropdown.classList.remove('opened')
  dropdown.classList.add('closed')
  dropdown.setAttribute('aria-expanded', 'false')
  dropdown.nextElementSibling.querySelectorAll('a').forEach(el => {
    el.setAttribute('tabindex', '-1')
  })
}

function goToIndex(i, a) {
  if (i < 0) {
    return a[a.length - 1]
  }
  else if (i >= a.length) {
    return a[0]
  }
  return a[i]
}

export { init }
