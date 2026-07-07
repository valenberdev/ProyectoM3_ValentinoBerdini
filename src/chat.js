import { saveMessage, getHistory } from './storage.js'
import { toGeminiFormat } from './utils.js'

export async function sendMessage(content, currentCharacter, messagesContainer) {
  const userMessage = {
    role: 'user',
    content,
    timestamp: new Date().toISOString(),
  }
  saveMessage(currentCharacter.id, userMessage)

  renderMessage(userMessage, currentCharacter, messagesContainer)

  const typingIndicator = messagesContainer.querySelector('.chat-typing-indicator')
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
      throw new Error('Fallo la respuesta del servidor')
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
    renderErrorMessage(messagesContainer)
  } finally {
    typingIndicator.classList.add('is-hidden')
  }
}

export function renderMessage(message, currentCharacter, container) {
    const messageElement = document.createElement('div')
    const roleClass = message.role === 'user' ? 'chat-message--user' : 'chat-message--character'
    messageElement.className = `chat-message ${roleClass}`
    if(message.role === 'character') {
        const avatar = document.createElement('div')
        avatar.className = 'chat-message__avatar'
        avatar.textContent = currentCharacter.avatar
        messageElement.appendChild(avatar)
    }
  const bubble = document.createElement('div')
    bubble.className = 'chat-message__bubble'
    bubble.textContent = message.content
    messageElement.appendChild(bubble)
    container.appendChild(messageElement)
    container.scrollTop = container.scrollHeight
}

export function renderErrorMessage(container) {
    const errorElement = document.createElement('div')
    errorElement.className = 'chat-message chat-message--error'
    errorElement.textContent = 'Error al enviar el mensaje. Por favor, intenta de nuevo.'
    container.appendChild(errorElement)
    container.scrollTop = container.scrollHeight
}