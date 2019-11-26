function init() {
  document.querySelectorAll('.archive-filters select, .archive-filters .listbox input').forEach(el => {
    el.addEventListener('change', e => {
      document.querySelector('form[action="#filtered"]').submit()
    })
  })
}

export { init }
