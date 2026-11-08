
import { useState } from 'react'
import './App.css'

type Analysis = {
  riskLevel: 'high' | 'caution' | 'uncertain'
  summary: string
  scamType: {
    name: string
    explanation: string
  }
  warningSigns: {
    title: string
    evidence: string
    explanation: string
  }[]
  actionSteps: string[]
  recommendation: string
  helpAdvice: string
}

function App() {
  const [message, setMessage] = useState('')
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showHelp, setShowHelp] = useState(false)

  async function handleCheck() {
    if (!message.trim() || loading) return

    setLoading(true)
    setError('')
    setAnalysis(null)
    setShowHelp(false)

    try {
      const response = await fetch('http://localhost:3001/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Der opstod en fejl')
      }

      if (!data.structuredAnalysis) {
        throw new Error('AI-resultatet mangler')
      }

      setAnalysis(data.structuredAnalysis)
    } catch (err) {
      console.error('Fejl ved AI-analyse:', err)
      setError('Kunne ikke hente AI-analysen. Prøv igen senere.')
    } finally {
      setLoading(false)
    }
  }

  function riskTitle(level: Analysis['riskLevel']) {
    if (level === 'high') return 'Flere alvorlige advarselstegn'
    if (level === 'caution') return 'Mulige tegn på svindel'
    return 'Kan ikke vurderes sikkert'
  }

  const scamName = analysis?.scamType.name.toLowerCase() ?? ''
  const hasScamType =
    analysis !== null &&
    analysis.riskLevel !== 'uncertain' &&
    !scamName.includes('ukendt') &&
    !scamName.includes('ingen identificeret')

  return (
    <main>
      <h1>FupTjek</h1>
      <p>Er du i tvivl om en SMS?</p>
      <p>Vi hjælper dig med at forstå beskeden.</p>

      <textarea
        placeholder="Indsæt din mistænkelige SMS her..."
        rows={5}
        maxLength={5000}
        value={message}
        onChange={(event) => {
          setMessage(event.target.value)
          setAnalysis(null)
          setError('')
          setShowHelp(false)
        }}
      />

      <button
        type="button"
        onClick={handleCheck}
        disabled={loading || !message.trim()}
      >
        {loading ? 'Analyserer...' : 'Tjek besked'}
      </button>

      {loading && <p role="status">Analyserer din besked...</p>}
      {error && <p role="alert">{error}</p>}

      {analysis && (
        <section aria-label="Resultat">
          <h2>Din vurdering</h2>

          {/* 1. Vurdering */}
          <section>
            <h3>{riskTitle(analysis.riskLevel)}</h3>
            <p>{analysis.summary}</p>

            {analysis.warningSigns.length > 0 && (
              <ul>
                {analysis.warningSigns.slice(0, 3).map((sign, index) => (
                  <li key={index}>
                    <strong>{sign.title}</strong>
                    {sign.evidence && <span> – "{sign.evidence}"</span>}
                    <p>{sign.explanation}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* 2. Mulig svindeltype */}
          {hasScamType && (
            <section>
              <h3>Hvilken slags svindel?</h3>
              <strong>{analysis.scamType.name}</strong>
              <p>{analysis.scamType.explanation}</p>
            </section>
          )}

          {/* 3. Konkrete råd */}
          <section>
            <h3>Hvad skal du gøre?</h3>
            <ol>
              {analysis.actionSteps.slice(0, 3).map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>

          {/* Ekstra hjælp */}
          <section>
            <button
              type="button"
              aria-expanded={showHelp}
              onClick={() => setShowHelp(!showHelp)}
            >
              Har du allerede klikket eller betalt?
              {showHelp ? ' ▲' : ' ▼'}
            </button>

            {showHelp && (
              <div>
                <h3>Vi hjælper dig</h3>
                <p>{analysis.helpAdvice}</p>
              </div>
            )}
          </section>
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
