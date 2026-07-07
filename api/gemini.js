import { toGeminiFormat, extractGeminiText } from '../src/utils.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Usá POST.' })
  }

  const { history, systemPrompt } = req.body

  if (!history || !Array.isArray(history) || !systemPrompt) {
    return res.status(400).json({ error: 'Faltan datos requeridos: history y systemPrompt.' })
  }

  try {
    const geminiResponse = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent',
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: toGeminiFormat(history),
        }),
      }
    )

    if (!geminiResponse.ok) {
      console.error('Error de Gemini:', geminiResponse.status, await geminiResponse.text())
      return res.status(502).json({ error: 'No se pudo obtener respuesta del personaje.' })
    }

    const data = await geminiResponse.json()
    const text = extractGeminiText(data)

    return res.status(200).json({ text })
  } catch (error) {
    console.error('Error en la función de Gemini:', error)
    return res.status(500).json({ error: 'Error interno del servidor.' })
  }
}