function init() {
  document.querySelectorAll('.wp-block-ws-tabbed-panels').forEach(tp => {
    addTabbedPanelsListener(tp)
    selectTab(tp.querySelector('.tab:first-child'), tp)
  })
}

function addTabbedPanelsListener(tp) {
  const tabs = tp.querySelectorAll('.tab')
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', e => {
      selectTab(tab, tp)
    })
    tab.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
      }
    })
    tab.addEventListener('keyup', e => {
      if (e.key === 'ArrowLeft') {
        if (i === 0) {
          selectTab(tabs[tabs.length - 1], tp)
        }
        else {
          selectTab(tabs[i - 1], tp)
        }
      }
      if (e.key === 'ArrowRight') {
        if (i === tabs.length - 1) {
          selectTab(tabs[0], tp)
        }
        else {
          selectTab(tabs[i + 1], tp)
        }
      }
    })
  })
}

function selectTab(tab, tp) {
  const tabs = tp.querySelectorAll('.tab')
  const panels = tp.querySelectorAll('.panel')
  // Clear tabs
  tabs.forEach(tab => {
    tab.classList.remove('current')
    tab.setAttribute('aria-selected', false)
    tab.setAttribute('tabindex', -1)
  })
  // Clear panels
  panels.forEach(panel => {
    panel.classList.remove('current')
    panel.setAttribute('hidden', 'hidden')
  })
  // Select tab
  const panel = document.querySelector(`#${tab.getAttribute('aria-controls')}`)
  tab.classList.add('current')
  tab.setAttribute('aria-selected', true)
  tab.removeAttribute('tabindex', true)
  tab.focus()
  panel.classList.add('current')
  panel.removeAttribute('hidden')
}

export { init }
