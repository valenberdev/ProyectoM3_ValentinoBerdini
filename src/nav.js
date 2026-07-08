const NAV_LINKS = [
  { path: '/home', label: 'Inicio' },
  { path: '/chat', label: 'Personajes' },
  { path: '/about', label: 'Info' },
]

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

  container.appendChild(nav)
}