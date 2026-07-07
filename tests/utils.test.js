import { describe, it, expect } from 'vitest'
import { toGeminiFormat, extractGeminiText } from '../src/utils.js'

describe('toGeminiFormat', () => {
  it('transforma mensajes al formato que espera Gemini', () => {
    const mensajes = [
      { role: 'user', content: 'hola', timestamp: '...' },
      { role: 'character', content: 'yohoho', timestamp: '...' },
    ]

    const resultado = toGeminiFormat(mensajes)

    expect(resultado).toEqual([
      { role: 'user', parts: [{ text: 'hola' }] },
      { role: 'model', parts: [{ text: 'yohoho' }] },
    ])
  })
})

describe('extractGeminiText', () => {
  it('extrae el texto cuando la respuesta es válida', () => {
    const response = {
      candidates: [
        {
          content: {
            parts: [{ text: 'Yohoho, encantado de conocerte' }],
            role: 'model',
          },
        },
      ],
    }

    const resultado = extractGeminiText(response)

    expect(resultado).toBe('Yohoho, encantado de conocerte')
  })

  it('devuelve string vacío cuando no hay candidates', () => {
    const response = { candidates: [] }

    const resultado = extractGeminiText(response)

    expect(resultado).toBe('')
  })
})