
import { useState } from 'react'
import { detectTimePressure } from './utils/scamDetector'
import './App.css'

function App() {
  // SMS'en, som brugeren skriver
  const [message, setMessage] = useState('')

  // Resultatet fra vores regelbaserede tjek
  const [result, setResult] = useState<boolean | null>(null)

  // Resultatet fra OpenAI
  const [aiResult, setAiResult] = useState('')

  // Viser om AI'en arbejder
  const [loading, setLoading] = useState(false)

  // Fejlbesked, hvis noget går galt
  const [error, setError] = useState('')

  async function handleCheck() {
    if (!message.trim() || loading) {
      return
    }

    setLoading(true)
    setError('')
    setAiResult('')

    // 1. Vores eksisterende regelbaserede tjek
    const hasTimePressure = detectTimePressure(message)
    setResult(hasTimePressure)

    try {
      // 2. Send SMS'en til vores Node.js-backend
      const response = await fetch('http://localhost:3001/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      // 3. Læs svaret fra backenden
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Der opstod en fejl')
      }

      if (typeof data.analysis !== 'string' || !data.analysis.trim()) {
        throw new Error('AI-analysen var tom')
      }

      // 4. Gem AI-resultatet, så React viser det
      setAiResult(data.analysis)

    } catch (err) {
      console.error('Fejl ved AI-analyse:', err)
      setError('Kunne ikke hente AI-analysen. Prøv igen senere.')

    } finally {
      // Kører både ved succes og fejl
      setLoading(false)
    }
  }

  return (
    <main>
      <h1>FupTjek</h1>

      <p>Er du i tvivl om en SMS?</p>
      <p>Vi hjælper dig med at finde advarselstegn.</p>

      <textarea
        placeholder="Indsæt din mistænkelige SMS her..."
        rows={5}
        value={message}
        onChange={(event) => {
          setMessage(event.target.value)
          setResult(null)
          setAiResult('')
          setError('')
        }}
      />

      <button
        type="button"
        onClick={handleCheck}
        disabled={loading || !message.trim()}
      >
        {loading ? 'Analyserer...' : 'Tjek besked'}
      </button>

      {result !== null && (
        <section>
          <h2>Regelbaseret tjek</h2>

          {result ? (
            <p>
              Advarsel: Beskeden indeholder tegn på tidspres.
            </p>
          ) : (
            <p>
              Ingen af vores kendte tegn på tidspres blev fundet.
              Det betyder ikke, at beskeden er sikker.
            </p>
          )}
        </section>
      )}

      {loading && (
        <p>AI'en analyserer din besked...</p>
      )}

      {aiResult && (
        <section>
          <h2>AI-analyse</h2>

          <p style={{ whiteSpace: 'pre-wrap' }}>
            {aiResult}
          </p>
        </section>
      )}

      {error && (
        <p role="alert">{error}</p>
      )}

      {result !== null && (
        <section>
          <h2>Gode råd</h2>

          <p>
            Klik ikke på mistænkelige links.
            Kontakt altid virksomheden via dens officielle hjemmeside.
          </p>
        </section>
      )}

      <p>
        FupTjek giver vejledende vurderinger og kan ikke
        garantere, om en besked er sikker eller svindel.
      </p>
    </main>
  )
}

export default App
