
export function detectTimePressure(message: string): boolean {
  const text = message.toLowerCase()

  return text.includes('straks')
}
