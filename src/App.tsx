
import { useState } from 'react'
import './App.css'

// Sådan ser AI'ens strukturerede svar ud
type Analysis = {
  riskLevel: 'high' | 'caution' | 'uncertain'
  summary: string
  warningSigns: {
    title: string
    explanation: string
  }[]
  recommendation: string
}

function App() {
  const [message, setMessage] = useState('')
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCheck() {
    if (!message.trim() || loading) return

    setLoading(true)
    setError('')
    setAnalysis(null)

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
          setAnalysis(null)
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

      {loading && <p>AI'en analyserer din besked...</p>}

      {analysis && (
        <section>
          <h2>
            {analysis.riskLevel === 'high'
              ? 'Flere alvorlige advarselstegn'
              : analysis.riskLevel === 'caution'
                ? 'Mulige advarselstegn'
                : 'Ikke nok information eller ingen tydelige tegn'}
          </h2>

          <p>{analysis.summary}</p>

          {analysis.warningSigns.length > 0 && (
            <>
              <h3>Hvad har vi fundet?</h3>

              {analysis.warningSigns.map((sign, index) => (
                <div key={index}>
                  <h4>{sign.title}</h4>
                  <p>{sign.explanation}</p>
                </div>
              ))}
            </>
          )}

          <h3>Hvad skal du gøre?</h3>
          <p>{analysis.recommendation}</p>
        </section>
      )}

      {error && <p role="alert">{error}</p>}

      <p>
        FupTjek giver vejledende vurderinger og kan ikke
        garantere, om en besked er sikker eller svindel.
      </p>
    </main>
  )
}

export default App
