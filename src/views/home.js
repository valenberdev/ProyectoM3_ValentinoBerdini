import characters from '../characters.js'

export default function homeView(container) {
  container.innerHTML = ''

  const section = document.createElement('section')
  section.className = 'home'
  section.setAttribute('aria-labelledby', 'home-title')

  const main = document.createElement('main')
  main.className = 'home-main'

  const header = document.createElement('header')
  header.className = 'home-header'

  const title = document.createElement('h1')
  title.className = 'home-header__title'
  title.id = 'home-title'
  title.textContent = '¡Elegí a tu nakama!'

  const text = document.createElement('p')
  text.className = 'home-header__text'
  text.textContent =
    'Estás por comenzar una conversación con la tripulación de los Sombrero de Paja. Elegí un personaje y descubrí cómo responde cada uno con su estilo único.'

  header.append(title, text)

  const grid = document.createElement('div')
  grid.className = 'home-grid'

  characters.forEach((char) => {
    const card = document.createElement('button')
    card.type = 'button'
    card.className = 'character-card'
    card.dataset.character = char.id

    const inner = document.createElement('div')
    inner.className = 'character-card__inner'

    const avatar = document.createElement('span')
    avatar.className = 'character-card__avatar'
    avatar.textContent = char.avatar

    const nombre = document.createElement('span')
    nombre.className = 'character-card__name'
    nombre.textContent = char.nombre

    const desc = document.createElement('span')
    desc.className = 'character-card__description'
    desc.textContent = char.descripcionCorta

    inner.append(avatar, nombre, desc)
    card.appendChild(inner)
    grid.appendChild(card)
  })

  main.append(header, grid)
  section.appendChild(main)
  container.appendChild(section)
}
