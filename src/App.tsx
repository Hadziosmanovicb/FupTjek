
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

type Source = {
  title: string
  url: string
}

function App() {
  const [message, setMessage] = useState('')
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [sources, setSources] = useState<Source[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showHelp, setShowHelp] = useState(false)

  async function handleCheck() {
    if (!message.trim() || loading) return

    setLoading(true)
    setError('')
    setAnalysis(null)
    setSources([])
    setShowHelp(false)

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL ||
        'http://localhost:3001'

      const response = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Der opstod en fejl'
        )
      }

      if (!data.structuredAnalysis) {
        throw new Error('AI-resultatet mangler')
      }

      setAnalysis(data.structuredAnalysis)
      setSources(data.sources ?? [])
    } catch (err) {
      console.error('Fejl ved AI-analyse:', err)
      setError(
        'Kunne ikke hente analysen. Prøv igen.'
      )
    } finally {
      setLoading(false)
    }
  }

  function riskTitle(level: Analysis['riskLevel']) {
    if (level === 'high') {
      return 'Flere alvorlige advarselstegn'
    }

    if (level === 'caution') {
      return 'Mulige tegn på svindel'
    }

    return 'Kan ikke vurderes sikkert'
  }

  const scamName =
    analysis?.scamType.name.toLowerCase() ?? ''

  const hasScamType =
    analysis !== null &&
    analysis.riskLevel !== 'uncertain' &&
    !scamName.includes('ukendt') &&
    !scamName.includes('ingen identificeret') &&
    !scamName.includes('ingen bestemt')

  return (
    <div className="site">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <div
              className="brand-icon"
              aria-hidden="true"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>

            <span>FupTjek</span>
          </div>

          <span className="header-label">
            Din digitale svindelhjælper
          </span>
        </div>
      </header>

      <main className="container main-content">
        <section className="hero">
          <span className="eyebrow">
            TRYGHED STARTER MED ET TJEK
          </span>

          <h1>Er den besked ægte?</h1>

          <p>
            Modtaget en SMS, du er i tvivl om?
            Vi hjælper dig med at forstå beskeden
            og finde ud af, hvad du skal gøre.
          </p>
        </section>

        <section className="input-card">
          <label
            htmlFor="sms-message"
            className="input-label"
          >
            Indsæt din SMS her
          </label>

          <p className="input-hint">
            Kopiér beskeden ind i feltet nedenfor.
          </p>

          <textarea
            id="sms-message"
            placeholder="Eksempel: Din pakke er tilbageholdt. Betal 45 kr. inden 24 timer..."
            rows={6}
            maxLength={5000}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value)
              setAnalysis(null)
              setSources([])
              setError('')
              setShowHelp(false)
            }}
          />

          <div className="input-footer">
            <span className="character-count">
              {message.length} / 5000 tegn
            </span>
          </div>

          <button
            className="analyze-button"
            type="button"
            onClick={handleCheck}
            disabled={loading || !message.trim()}
          >
            {loading
              ? 'Analyserer din besked...'
              : 'Tjek min besked'}
          </button>

          <div className="privacy-notice">
            <strong>Sådan bruger vi din SMS</strong>
            <p>
              Når du trykker på knappen, sendes
              beskeden til vores server og videre
              til OpenAI for at blive analyseret.
              Undgå CPR-numre, MitID-koder,
              adgangskoder og følsomme oplysninger.
            </p>
            <p>
              Du kan læse mere i vores
              privatlivspolitik nederst på siden.
            </p>
          </div>
        </section>

        {loading && (
          <div
            className="loading-card"
            role="status"
          >
            <div
              className="spinner"
              aria-hidden="true"
            />

            <div>
              <strong>
                Vi gennemgår din besked
              </strong>
              <p>Din vurdering er på vej...</p>
            </div>
          </div>
        )}

        {error && (
          <div
            className="error-card"
            role="alert"
          >
            {error}
          </div>
        )}

        {analysis && (
          <section
            className="results"
            aria-label="Resultat af SMS-analyse"
          >
            <div className="results-heading">
              <h2>Din vurdering</h2>
              <p>
                Her er, hvad FupTjek har fundet.
              </p>
            </div>

            <article className="result-card">
              <div
                className={
                  `risk-banner risk-${analysis.riskLevel}`
                }
              >
                <div
                  className="risk-symbol"
                  aria-hidden="true"
                >
                  {analysis.riskLevel === 'uncertain'
                    ? '?'
                    : '!'}
                </div>

                <div>
                  <span className="risk-label">
                    VURDERING
                  </span>

                  <h3>
                    {riskTitle(analysis.riskLevel)}
                  </h3>

                  <p>{analysis.summary}</p>
                </div>
              </div>

              {analysis.warningSigns.length > 0 && (
                <div className="result-section">
                  <h3>
                    Hvorfor er beskeden mistænkelig?
                  </h3>

                  <div className="warning-list">
                    {analysis.warningSigns
                      .slice(0, 3)
                      .map((sign, index) => (
                        <div
                          className="warning-item"
                          key={index}
                        >
                          <span
                            className="warning-dot"
                            aria-hidden="true"
                          />

                          <div>
                            <h4>{sign.title}</h4>

                            {sign.evidence && (
                              <p className="evidence">
                                Fra SMS'en: "
                                {sign.evidence}"
                              </p>
                            )}

                            <p>
                              {sign.explanation}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {hasScamType && (
                <div className="result-section">
                  <h3>
                    Hvilken slags svindel kan det være?
                  </h3>

                  <div className="scam-type-box">
                    <strong>
                      {analysis.scamType.name}
                    </strong>

                    <p>
                      {analysis.scamType.explanation}
                    </p>
                  </div>
                </div>
              )}

              <div className="result-section">
                <h3>Hvad skal du gøre?</h3>

                <ol className="action-list">
                  {analysis.actionSteps
                    .slice(0, 3)
                    .map((step, index) => (
                      <li key={index}>
                        <span
                          className="step-number"
                          aria-hidden="true"
                        >
                          {index + 1}
                        </span>

                        <span>{step}</span>
                      </li>
                    ))}
                </ol>
              </div>

              {sources.length > 0 && (
                <div className="result-section">
                  <h3>
                    Relateret officiel vejledning
                  </h3>

                  <p>
                    FupTjek har fundet
                    sikkerhedsviden knyttet til
                    følgende officielle kilder:
                  </p>

                  <ul className="source-list">
                    {sources.map((source) => (
                      <li key={source.url}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {source.title} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="help-section">
                <button
                  className="help-button"
                  type="button"
                  aria-expanded={showHelp}
                  onClick={() => {
                    setShowHelp(!showHelp)
                  }}
                >
                  <span>
                    Har du allerede klikket eller betalt?
                  </span>

                  <span aria-hidden="true">
                    {showHelp ? '−' : '+'}
                  </span>
                </button>

                {showHelp && (
                  <div className="help-content">
                    <h3>Vi hjælper dig videre</h3>
                    <p>{analysis.helpAdvice}</p>
                  </div>
                )}
              </div>
            </article>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <strong>FupTjek</strong>

          <p>
            FupTjek giver vejledende
            AI-vurderinger. Vi kan ikke
            garantere, om en besked er
            sikker eller svindel.
          </p>

          <div className="legal-panels">
            <details
              className="legal-panel"
              id="privacy-policy"
            >
              <summary>Privatlivspolitik</summary>

              <div className="legal-content">
                <h3>
                  Privatlivspolitik for FupTjek
                </h3>

                <p>
                  FupTjek er en gratis,
                  AI-baseret tjeneste, som
                  hjælper brugere med at
                  vurdere mistænkelige SMS'er.
                </p>

                <h4>
                  1. Hvem står bag FupTjek?
                </h4>

                <p>
                  FupTjek drives som et
                  personligt projekt af
                  Benjamin Hadziosmanovic.
                </p>

                <p>
                  Kontakt:
                  {' '}
                  <a href="mailto:benjamin.hadziosman@gmail.com">
                    benjamin.hadziosman@gmail.com
                  </a>
                </p>

                <h4>
                  2. Hvilke oplysninger behandler vi?
                </h4>

                <p>
                  Vi behandler den SMS-tekst,
                  du selv indtaster, for at
                  kunne analysere den.
                  Teksten kan indeholde
                  personoplysninger, hvis
                  du vælger at indsætte dem.
                </p>

                <p>
                  Serveren kan desuden
                  behandle tekniske
                  oplysninger, blandt andet
                  IP-adresser, til sikkerhed
                  og begrænsning af misbrug.
                </p>

                <h4>
                  3. Hvordan bruges din SMS?
                </h4>

                <p>
                  Når du sender en SMS til
                  analyse, går teksten fra
                  din browser til vores
                  backend hos Render og
                  videre til OpenAI.
                </p>

                <p>
                  OpenAI behandler teksten
                  for at udarbejde en
                  vejledende risikovurdering,
                  forklaring og forslag
                  til næste skridt.
                </p>

                <p>
                  FupTjek bruger også lokalt
                  gemte sikkerhedsnoter til
                  at finde relevante
                  kildehenvisninger.
                </p>

                <h4>
                  4. Hvem modtager oplysninger?
                </h4>

                <p>
                  Vi bruger Render til
                  hosting og OpenAI til
                  AI-analysen.
                  Oplysninger kan blive
                  behandlet af disse
                  leverandører efter deres
                  gældende vilkår.
                </p>

                <p>
                  OpenAI bruger som
                  udgangspunkt ikke data
                  fra API-kald til at
                  træne sine modeller,
                  medmindre der særskilt
                  er givet tilladelse.
                </p>

                <h4>
                  5. Opbevaring
                </h4>

                <p>
                  Den nuværende FupTjek-kode
                  gemmer ikke dine SMS'er
                  i en særskilt database.
                  Oplysninger kan dog
                  blive behandlet eller
                  opbevaret af vores
                  tjenesteudbydere til
                  drift og sikkerhed.
                </p>

                <p>
                  Derfor kan vi ikke love,
                  at alle oplysninger
                  slettes øjeblikkeligt,
                  når analysen er færdig.
                </p>

                <h4>
                  6. Dine rettigheder
                </h4>

                <p>
                  Hvis vi behandler
                  personoplysninger om dig,
                  kan du efter
                  databeskyttelsesreglerne
                  blandt andet have ret
                  til indsigt, rettelse,
                  sletning, begrænsning
                  og indsigelse.
                  Rettighederne afhænger
                  af situationen.
                </p>

                <p>
                  Kontakt os på
                  {' '}
                  <a href="mailto:benjamin.hadziosman@gmail.com">
                    benjamin.hadziosman@gmail.com
                  </a>
                  {' '}
                  hvis du har spørgsmål
                  eller ønsker at gøre
                  brug af dine rettigheder.
                </p>

                <p>
                  Du kan også klage til
                  {' '}
                  <a
                    href="https://www.datatilsynet.dk/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Datatilsynet
                  </a>.
                </p>

                <h4>
                  7. Vigtige oplysninger
                </h4>

                <p>
                  Indsæt ikke CPR-numre,
                  adgangskoder, MitID-koder,
                  bankoplysninger eller
                  følsomme personoplysninger.
                </p>

                <p>
                  FupTjek er et uafhængigt
                  projekt og er ikke
                  tilknyttet MitID,
                  Sikkerdigital eller
                  offentlige myndigheder.
                </p>
              </div>
            </details>

            <details
              className="legal-panel"
              id="contact"
            >
              <summary>Kontakt</summary>

              <div className="legal-content">
                <h3>Kontakt FupTjek</h3>

                <p>
                  Har du spørgsmål,
                  oplevet en fejl eller
                  har forslag til at
                  forbedre FupTjek?
                </p>

                <p>
                  Du er velkommen til
                  at kontakte personen
                  bag hjemmesiden.
                </p>

                <p>
                  <strong>
                    Benjamin Hadziosmanovic
                  </strong>
                </p>

                <a
                  className="contact-email"
                  href="mailto:benjamin.hadziosman@gmail.com?subject=Kontakt%20FupTjek"
                >
                  Send en e-mail
                </a>

                <p>
                  E-mail:
                  {' '}
                  benjamin.hadziosman@gmail.com
                </p>

                <p className="legal-small">
                  Send ikke CPR-numre,
                  MitID-koder eller andre
                  følsomme oplysninger
                  via e-mail.
                </p>
              </div>
            </details>
          </div>

          <p className="legal-copyright">
            © {new Date().getFullYear()} FupTjek
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
