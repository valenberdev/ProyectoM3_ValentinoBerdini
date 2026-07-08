import { initRouter } from './router.js'
import { initTheme } from './nav.js'

function setRealViewportHeight() {
  if (!window.visualViewport) return
  const vh = window.visualViewport.height
  document.documentElement.style.setProperty('--real-vh', `${vh}px`)

  const keyboardOpen = window.innerHeight - vh > 150
  document.documentElement.classList.toggle('is-keyboard-open', keyboardOpen)
}

function resetNativeScroll() {
  window.scrollTo(0, 0)
}

if (window.visualViewport) {
  setRealViewportHeight()
  window.visualViewport.addEventListener('resize', setRealViewportHeight)
  window.visualViewport.addEventListener('scroll', resetNativeScroll)
}

initTheme()
initRouter()