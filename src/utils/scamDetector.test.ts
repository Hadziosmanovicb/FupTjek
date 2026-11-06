
import { describe, it, expect } from 'vitest'
import { detectTimePressure } from './scamDetector'

describe('detectTimePressure', () => {
  it('should detect the word straks', () => {
    const result = detectTimePressure('Du skal betale STRAKS!')

    expect(result).toBe(true)
  })

  it('should not flag a normal message', () => {
    const result = detectTimePressure('Hej, kommer du til middag i morgen?')

    expect(result).toBe(false)
  })
})
