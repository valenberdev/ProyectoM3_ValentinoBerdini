export const ACTIVE_CHARACTER_KEY = 'activeCharacterId'

function historyKey(characterId) {
  return `chat_history_${characterId}`
}

export function getHistory(characterId) {
  const raw = localStorage.getItem(historyKey(characterId))
  if (!raw) return []
  return JSON.parse(raw)
}

export function saveMessage(characterId, message) {
  const history = getHistory(characterId)
  history.push(message)
  localStorage.setItem(historyKey(characterId), JSON.stringify(history))
}

export function clearHistory(characterId) {
    localStorage.removeItem(historyKey(characterId))
}