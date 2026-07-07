export function toGeminiFormat(messages) {
  return messages.map((msg) => ({
    role: msg.role === 'character' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }))
}

export function extractGeminiText(response) {
  const text = response.candidates?.[0]?.content?.parts?.[0]?.text
  return text || ''
}