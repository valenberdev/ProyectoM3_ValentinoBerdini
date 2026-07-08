const NAV_LINKS = [
  { path: '/home', label: 'Inicio' },
  { path: '/chat', label: 'Personajes' },
  { path: '/about', label: 'Info' },
]

const THEME_KEY = 'theme'

const sunIcon = '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>'
const moonIcon = '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>'

export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light'
  document.documentElement.setAttribute('data-theme', savedTheme)
}

function toggleTheme(button) {
  const currentTheme = document.documentElement.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem(THEME_KEY, newTheme)

  button.innerHTML = newTheme === 'dark' ? sunIcon : moonIcon
}

export function renderNav(container, currentPath) {
  const nav = document.createElement('nav')
  nav.className = 'app-nav'

  NAV_LINKS.forEach(({ path, label }) => {
    const link = document.createElement('a')
    link.href = path
    link.textContent = label
    link.dataset.link = ''

    if (path === currentPath) {
      link.classList.add('app-nav__link--active')
    }

    nav.appendChild(link)
  })

  const themeButton = document.createElement('button')
  themeButton.type = 'button'
  themeButton.className = 'app-nav__theme-toggle'
  themeButton.setAttribute('aria-label', 'Cambiar tema claro/oscuro')

  const currentTheme = document.documentElement.getAttribute('data-theme')
  themeButton.innerHTML = currentTheme === 'dark' ? sunIcon : moonIcon

  themeButton.addEventListener('click', () => toggleTheme(themeButton))

  nav.appendChild(themeButton)

  container.appendChild(nav)
}