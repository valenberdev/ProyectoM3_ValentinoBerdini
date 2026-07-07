export function toGeminiFormat(messages) {
  return messages.map((msg) => ({
    role: msg.role === 'character' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }))
}