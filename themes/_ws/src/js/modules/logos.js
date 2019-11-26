function init() {
  document.querySelectorAll('.ws-block-logos').forEach(el => {
    const logos = el.querySelectorAll('.wp-block-image')
    logos.forEach((logo, i) => {
      if (i < 6) {
        logo.classList.add('show')
      }
    })
    setTimeout(() => {
      changeLogo(logos, 0)
    }, 2000)
  })
}

function changeLogo(logos, i) {
  const current = logos[i]
  const next = getNextLogo(logos, i)
  current.classList.remove('show')
  current.classList.add('hide')
  next.classList.remove('hide')
  next.classList.add('show')
  i = i >= logos.length - 1 ? 0 : i + 1
  setTimeout(() => {
    changeLogo(logos, i)
  }, 2000)
}

function getNextLogo(logos, i) {
  let next = i + 6
  if (next >= logos.length) {
    next = next - logos.length
  }
  return logos[next]
}

export { init }
