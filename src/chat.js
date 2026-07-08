import { saveMessage, getHistory } from './storage.js'
import { toGeminiFormat } from './utils.js'

export async function sendMessage(content, currentCharacter, messagesContainer) {
  const emptyState = messagesContainer.querySelector('.chat-empty-state')
  if (emptyState) emptyState.remove()

  const userMessage = {
    role: 'user',
    content,
    timestamp: new Date().toISOString(),
  }
  saveMessage(currentCharacter.id, userMessage)
  renderMessage(userMessage, currentCharacter, messagesContainer)

  const typingIndicator = messagesContainer.querySelector('.chat-typing-indicator')
  messagesContainer.appendChild(typingIndicator) // lo mueve al final, debajo del último mensaje
  typingIndicator.classList.remove('is-hidden')

  try {
    const history = getHistory(currentCharacter.id)
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        history,
        systemPrompt: currentCharacter.systemPrompt,
      }),
    })

    if (!response.ok) {
      console.error(`Error del servidor: ${response.status} ${response.statusText}`)
      throw new Error('server')
    }

    const data = await response.json()

    const characterMessage = {
      role: 'character',
      content: data.text,
      timestamp: new Date().toISOString(),
    }
    saveMessage(currentCharacter.id, characterMessage)
    renderMessage(characterMessage, currentCharacter, messagesContainer)

  } catch (error) {
    console.error('Error al enviar mensaje:', error)
    const isNetworkError = error instanceof TypeError
    renderErrorMessage(messagesContainer, isNetworkError)
  } finally {
    typingIndicator.classList.add('is-hidden')
  }
}

export function renderMessage(message, currentCharacter, container) {
  const messageElement = document.createElement('div')
  const roleClass = message.role === 'user' ? 'chat-message--user' : 'chat-message--character'
  const horaFormateada = new Date(message.timestamp).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  })
  messageElement.className = `chat-message ${roleClass}`

  if (message.role === 'character') {
    const avatar = document.createElement('img')
    avatar.className = 'chat-message__avatar'
    avatar.src = currentCharacter.avatar
    avatar.alt = currentCharacter.nombre
    messageElement.appendChild(avatar)
  }

  const bubble = document.createElement('div')
  bubble.className = 'chat-message__bubble'
  bubble.textContent = message.content

  const meta = document.createElement('div')
  meta.className = 'chat-message__meta'

  if (message.role === 'character') {
    const copyButton = document.createElement('button')
    copyButton.className = 'chat-message__copy'
    copyButton.setAttribute('aria-label', 'Copiar mensaje')
    const copyIcon = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H8C6.9 5 6 5.9 6 7v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>'
    const checkIcon = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>'
    copyButton.innerHTML = copyIcon

    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(message.content)
        copyButton.innerHTML = checkIcon

        setTimeout(() => {
          copyButton.innerHTML = copyIcon
        }, 1500)
      } catch (error) {
        console.error('Error al copiar:', error)
      }
    })

    meta.appendChild(copyButton)
  }

  const timestamp = document.createElement('span')
  timestamp.className = 'chat-message__timestamp'
  timestamp.textContent = horaFormateada
  meta.appendChild(timestamp)

  bubble.appendChild(meta)

  messageElement.appendChild(bubble)
  container.appendChild(messageElement)
  container.scrollTop = container.scrollHeight
}
export function renderErrorMessage(container, isNetworkError = false) {
    const errorElement = document.createElement('div')
    errorElement.className = 'chat-message chat-message--error'
    errorElement.textContent = isNetworkError
      ? 'No se pudo conectar. Revisá tu conexión a internet e intenta de nuevo.'
      : 'Error al enviar el mensaje. Por favor, intenta de nuevo.'
    container.appendChild(errorElement)
    container.scrollTop = container.scrollHeight
}