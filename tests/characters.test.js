import { describe, it, expect } from 'vitest'
import { getCharacterById } from '../src/characters.js'

describe('getCharacterById', () => {
  it('devuelve el personaje correcto cuando el id existe', () => {
  const character = getCharacterById('luffy')
  expect(character.id).toBe('luffy')
  expect(character.nombre).toBe('Monkey D. Luffy')
    })

  it('devuelve undefined cuando el id no existe', () => {
    const character = getCharacterById('999')
    expect(character).toBeUndefined()
  })
})