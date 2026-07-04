import homeView from './views/home.js'
import chatView from './views/chatView.js'
import aboutView from './views/about.js'
import characters, { getCharacterById } from './characters.js'
import { ACTIVE_CHARACTER_KEY } from './storage.js'

const routes = {
  '/home': homeView,
  '/chat': chatView,
  '/about': aboutView,
}

const container = document.getElementById('app')

function renderRoute(path) {
  const view = routes[path] || routes['/home']
  const resolvedPath = routes[path] ? path : '/home'

  if (resolvedPath === '/chat') {
    const activeId = localStorage.getItem(ACTIVE_CHARACTER_KEY)
    const currentCharacter = getCharacterById(activeId)

    if (!currentCharacter) {
      navigate('/home')
      return
    }

    chatView(container, currentCharacter, characters, navigate)
    return
  }

  view(container, navigate)
}

export function navigate(path) {
  window.history.pushState({}, '', path)
  renderRoute(path)
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-link]')
  if (!link) return
  if (e.ctrlKey || e.metaKey || e.shiftKey || link.target === '_blank') return

  e.preventDefault()
  navigate(link.getAttribute('href'))
})

window.addEventListener('popstate', () => {
  renderRoute(window.location.pathname)
})

export function initRouter() {
  const initialPath = window.location.pathname === '/' ? '/home' : window.location.pathname
  window.history.replaceState({}, '', initialPath)
  renderRoute(initialPath)
}