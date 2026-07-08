import { initRouter } from './router.js'
import { initTheme } from './nav.js'

function setRealViewportHeight() {
  if (!window.visualViewport) return
  const vh = window.visualViewport.height
  document.documentElement.style.setProperty('--real-vh', `${vh}px`)
}

if (window.visualViewport) {
  setRealViewportHeight()
  window.visualViewport.addEventListener('resize', setRealViewportHeight)
}

initTheme()
initRouter()