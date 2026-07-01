export default function chatView(container, currentCharacter, allCharacters) {
  container.innerHTML = ''

  const layout = document.createElement('div')
  layout.className = 'chat-layout'

  const sidebar = createSidebar(
    allCharacters.filter(c => c.id !== currentCharacter.id),
    currentCharacter.id
  )
  const overlay = document.createElement('div')
  overlay.className = 'chat-overlay'
  const main = createMain(currentCharacter)

  layout.append(sidebar, overlay, main)
  container.appendChild(layout)

  const toggle = main.querySelector('.chat-header__toggle')
  toggle.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      layout.classList.add('chat-layout--sidebar-open')
    }
  })
  overlay.addEventListener('click', () => {
    layout.classList.remove('chat-layout--sidebar-open')
  })
}

function stringToColor(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return `hsl(${Math.abs(hash) % 360}, 45%, 50%)`
}

function createSidebar(characters) {
  const sidebar = document.createElement('aside')
  sidebar.className = 'chat-sidebar'

  const header = document.createElement('div')
  header.className = 'chat-sidebar__header'
  header.textContent = 'Chats'

  const list = document.createElement('div')
  list.className = 'chat-sidebar__list'

  characters.forEach(char => {
    const item = document.createElement('button')
    item.className = 'chat-sidebar__item'
    item.dataset.character = char.id
    item.setAttribute('aria-label', `Conversar con ${char.name}`)

    const avatar = document.createElement('div')
    avatar.className = 'chat-sidebar__avatar'
    avatar.style.background = stringToColor(char.name)
    avatar.textContent = char.name.charAt(0).toUpperCase()

    const name = document.createElement('span')
    name.className = 'chat-sidebar__name'
    name.textContent = char.name

    item.append(avatar, name)
    list.appendChild(item)
  })

  sidebar.append(header, list)
  return sidebar
}

function createMain(character) {
  const main = document.createElement('div')
  main.className = 'chat-main'

  const header = createHeader(character)

  const messages = document.createElement('div')
  messages.className = 'chat-messages'
  messages.id = 'chat-messages'

  const sampleCharacter = document.createElement('div')
  sampleCharacter.className = 'chat-message chat-message--character'
  const avatarChar = document.createElement('div')
  avatarChar.className = 'chat-message__avatar'
  avatarChar.style.background = stringToColor(character.name)
  avatarChar.textContent = character.name.charAt(0).toUpperCase()
  const bubbleChar = document.createElement('div')
  bubbleChar.className = 'chat-message__bubble'
  bubbleChar.textContent = '¡Nakama! ¿Cómo estás hoy?'
  sampleCharacter.append(avatarChar, bubbleChar)

  const sampleUser = document.createElement('div')
  sampleUser.className = 'chat-message chat-message--user'
  const bubbleUser = document.createElement('div')
  bubbleUser.className = 'chat-message__bubble'
  bubbleUser.textContent = '¡Muy bien! ¿Listo para la aventura?'
  sampleUser.appendChild(bubbleUser)

  messages.append(sampleCharacter, sampleUser)

  const inputArea = createInputArea()

  main.append(header, messages, inputArea)
  return main
}

function createHeader(character) {
  const header = document.createElement('header')
  header.className = 'chat-header'

  const toggle = document.createElement('button')
  toggle.className = 'chat-header__toggle'
  toggle.setAttribute('aria-label', 'Abrir menú lateral')
  toggle.innerHTML =
    '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>'

  const avatar = document.createElement('div')
  avatar.className = 'chat-header__avatar'
  avatar.style.background = stringToColor(character.name)
  avatar.textContent = character.name.charAt(0).toUpperCase()

  const name = document.createElement('h1')
  name.className = 'chat-header__name'
  name.textContent = character.name

  header.append(toggle, avatar, name)
  return header
}

function createInputArea() {
  const container = document.createElement('div')
  container.className = 'chat-input'

  const input = document.createElement('input')
  input.type = 'text'
  input.className = 'chat-input__field'
  input.placeholder = 'Escribe un mensaje…'

  const send = document.createElement('button')
  send.className = 'chat-input__send'
  send.setAttribute('aria-label', 'Enviar mensaje')
  send.innerHTML =
    '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>'

  container.append(input, send)
  return container
}
