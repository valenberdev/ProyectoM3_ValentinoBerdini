import { ACTIVE_CHARACTER_KEY, getHistory } from "../storage.js"
import { sendMessage, renderMessage } from "../chat.js"
import { renderNav } from "../nav.js"

const WELCOME_MESSAGES = {
  luffy: '¡Yo! ¿Listo para una aventura? ¿De qué querés hablar?',
  brook: 'Buenas noches... o buenos días, ¡según corresponda! ¿En qué puedo ayudarte? Yohoho!',
  franky: '¡¡¡SÚPER!!! ¿Qué onda? ¿De qué querés charlar, muchacho/a?',
}

export default function chatView(container, currentCharacter, allCharacters, navigate) {
  container.innerHTML = ''

  if (window.__chatEscapeHandler) {
    document.removeEventListener('keydown', window.__chatEscapeHandler)
  }

  const layout = document.createElement('div')
  layout.className = 'chat'

  const sidebar = createSidebar(allCharacters, currentCharacter.id, container, navigate)

  const content = createContent(currentCharacter)

  const overlay = document.createElement('div')
  overlay.className = 'chat-overlay'

  layout.append(sidebar, content, overlay)

  const bottomNav = document.createElement('div')
  bottomNav.className = 'chat-bottom-nav'
  renderNav(bottomNav, window.location.pathname)

  container.append(layout, bottomNav)

  const toggle = content.querySelector('.chat-header__toggle')
  toggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('is-open')
    overlay.classList.toggle('is-open')
    toggle.setAttribute('aria-expanded', String(isOpen))
  })
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('is-open')
    overlay.classList.remove('is-open')
    toggle.setAttribute('aria-expanded', 'false')
  })
  const escapeHandler = (e) => {
  if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
    sidebar.classList.remove('is-open')
    overlay.classList.remove('is-open')
    toggle.setAttribute('aria-expanded', 'false')
  }
}
document.addEventListener('keydown', escapeHandler)
window.__chatEscapeHandler = escapeHandler
// TODO: reemplazar este parche con un sistema real de limpieza de vistas en el router)
}

function createSidebar(characters, activeId, container, navigate) {
  const sidebar = document.createElement('aside')
  sidebar.className = 'chat-sidebar'
  sidebar.id = 'chat-sidebar'

  const header = document.createElement('div')
  header.className = 'chat-sidebar__header'
  header.textContent = 'Chats'

  const list = document.createElement('div')
  list.className = 'chat-sidebar__list'

  characters.forEach(char => {
    const item = document.createElement('button')
    item.className = 'chat-sidebar__item'
    item.dataset.character = char.id
    item.setAttribute('aria-label', `Conversar con ${char.nombre}`)

    if (char.id === activeId) {
      item.classList.add('chat-sidebar__item--active')
      item.setAttribute('aria-current', 'true')
    }

    const avatar = document.createElement('img')
    avatar.className = 'chat-sidebar__avatar'
    avatar.src = char.avatar
    avatar.alt = char.nombre

    const name = document.createElement('span')
    name.className = 'chat-sidebar__name'
    name.textContent = char.nombre

    item.addEventListener('click', () => {
      if (char.id === activeId) return
      localStorage.setItem(ACTIVE_CHARACTER_KEY, char.id)
      chatView(container, char, characters, navigate)
    })

    item.append(avatar, name)
    list.appendChild(item)
  })

  sidebar.append(header, list)
  return sidebar
}

function createContent(character) {
  const content = document.createElement('div')
  content.className = 'chat-content'

  const header = createHeader(character)

  const main = document.createElement('div')
  main.className = 'chat-main'

  const messages = document.createElement('div')
  messages.className = 'chat-messages'
  messages.id = 'chat-messages'

  const history = getHistory(character.id)

  if (history.length === 0) {
    messages.appendChild(createEmptyState(character))
  } else {
    history.forEach(msg => {
      renderMessage(msg, character, messages)
    })
  }

  const typingIndicator = document.createElement('div')
  typingIndicator.className = 'chat-typing-indicator is-hidden'
  typingIndicator.textContent = 'escribiendo…'
  messages.appendChild(typingIndicator)

  main.appendChild(messages)

  const footer = document.createElement('footer')
  footer.className = 'chat-footer'

  const form = document.createElement('form')
  form.className = 'chat-form'

  const input = document.createElement('input')
  input.type = 'text'
  input.id = 'chat-input'
  input.className = 'chat-input__field'
  input.placeholder = 'Escribe un mensaje…'

  const send = document.createElement('button')
  send.className = 'chat-input__send'
  send.setAttribute('aria-label', 'Enviar mensaje')
  send.innerHTML =
    '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>'

  form.append(input, send)
  footer.appendChild(form)

  content.append(header, main, footer)

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const message = input.value.trim()
    if (!message) return
    input.value = ''
    await sendMessage(message, character, messages)
  })

  return content
}

function createEmptyState(character) {
  const empty = document.createElement('div')
  empty.className = 'chat-empty-state'

  const avatar = document.createElement('img')
  avatar.className = 'chat-empty-state__avatar'
  avatar.src = character.avatar
  avatar.alt = character.nombre

  const title = document.createElement('h2')
  title.className = 'chat-empty-state__title'
  title.textContent = `Hola, soy ${character.nombre}`

  const subtitle = document.createElement('p')
  subtitle.className = 'chat-empty-state__subtitle'
  subtitle.textContent = WELCOME_MESSAGES[character.id]

  empty.append(avatar, title, subtitle)
  return empty
}

function createHeader(character) {
  const header = document.createElement('header')
  header.className = 'chat-header'

  const toggle = document.createElement('button')
  toggle.className = 'chat-header__toggle'
  toggle.setAttribute('aria-label', 'Abrir menú lateral')
  toggle.setAttribute('aria-expanded', 'false')
  toggle.setAttribute('aria-controls', 'chat-sidebar')
  toggle.textContent = '\u2630'

  const avatar = document.createElement('img')
  avatar.className = 'chat-header__avatar'
  avatar.src = character.avatar
  avatar.alt = character.nombre

  const name = document.createElement('h1')
  name.className = 'chat-header__name'
  name.textContent = character.nombre

  const navContainer = document.createElement('div')
  navContainer.className = 'chat-header__nav'
  renderNav(navContainer, window.location.pathname)

  header.append(toggle, avatar, name, navContainer)
  return header
}
