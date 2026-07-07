import { describe, it, expect, beforeEach } from 'vitest'
import { getHistory, saveMessage, clearHistory } from '../src/storage.js'

// Mock simple de localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value },
    removeItem: (key) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

global.localStorage = localStorageMock

beforeEach(() => {
  localStorageMock.clear()
})


describe('clearHistory', () => {
    it('debería limpiar el historial de un personaje', () => {
        const characterId = 'char1'
        const message = { role: 'user', content: 'Hola', timestamp: '2024-01-01T00:00:00Z' }
        saveMessage(characterId, message)
        clearHistory(characterId)
        const history = getHistory(characterId)
        expect(history).toEqual([])
    })
})

describe('getHistory', () => {
    it('debería devolver un array vacío si no hay historial', () => {
        const characterId = 'char2'
        const history = getHistory(characterId)
        expect(history).toEqual([])
    })
})

describe('saveMessage', () => {
    it('debería guardar un mensaje en el historial de un personaje', () => {
        const characterId = 'char3'
        const message = { role: 'user', content: 'Hola', timestamp: '2024-01-01T00:00:00Z' }
        saveMessage(characterId, message)
        const history = getHistory(characterId)
        expect(history).toEqual([message])
    })
})