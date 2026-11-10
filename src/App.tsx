
import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
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

type Page = '/' | '/privatlivspolitik' | '/kontakt'

function getPage(): Page {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (path === '/privatlivspolitik') return '/privatlivspolitik'
  if (path === '/kontakt') return '/kontakt'

  return '/'
}

function App() {
  const [page, setPage] = useState<Page>(getPage)
  const [menuOpen, setMenuOpen] = useState(false)

const [darkMode, setDarkMode] = useState(() => {
  const saved = localStorage.getItem('fuptjek-theme')

  if (saved) return saved === 'dark'

  return window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
})

useEffect(() => {
  document.documentElement.classList.toggle(
    'dark-mode',
    darkMode
  )

  localStorage.setItem(
    'fuptjek-theme',
    darkMode ? 'dark' : 'light'
  )
}, [darkMode])

  const [message, setMessage] = useState('')
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [sources, setSources] = useState<Source[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    function onPopState() {
      setPage(getPage())
      setMenuOpen(false)
    }

    window.addEventListener('popstate', onPopState)

    return () => {
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  useEffect(() => {
    const title =
      page === '/privatlivspolitik'
        ? 'Privatlivspolitik – FupTjek'
        : page === '/kontakt'
          ? 'Kontakt – FupTjek'
          : 'FupTjek – Din digitale svindelhjælper'

    document.title = title
  }, [page])

  function navigate(path: Page) {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path)
    }

    setPage(path)
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }

  function handleNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    path: Page
  ) {
    event.preventDefault()
    navigate(path)
  }

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
        throw new Error(data.error || 'Der opstod en fejl')
      }

      if (!data.structuredAnalysis) {
        throw new Error('AI-resultatet mangler')
      }

      setAnalysis(data.structuredAnalysis)
      setSources(data.sources ?? [])
    } catch (err) {
      console.error(
        'Fejl ved AI-analyse:',
        err instanceof Error ? err.name : 'Ukendt fejl'
      )

      setError('Kunne ikke hente analysen. Prøv igen.')
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
      {/* HEADER */}

      <header className="site-header">
        <div className="container header-inner">
          <a
            href="/"
            className="brand brand-link"
            onClick={(event) =>
              handleNavigation(event, '/')
            }
          >
            <div className="brand-icon" aria-hidden="true">
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
          </a>

          <div className="header-actions">
            
<button
  type="button"
  className="theme-toggle"
  onClick={() => setDarkMode(!darkMode)}
  aria-label={
    darkMode
      ? 'Skift til lyst tema'
      : 'Skift til mørkt tema'
  }
  title={
    darkMode
      ? 'Skift til lyst tema'
      : 'Skift til mørkt tema'
  }
>
  {darkMode ? '☀️' : '🌙'}
</button>

            <span className="header-label">
              Din digitale svindelhjælper
            </span>

            <div className="menu-container">
              <button
                type="button"
                className="menu-button"
                aria-expanded={menuOpen}
                aria-controls="fuptjek-menu"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span aria-hidden="true">☰</span>
                Menu
              </button>

              {menuOpen && (
                <nav
                  id="fuptjek-menu"
                  className="menu-dropdown"
                  aria-label="Hovedmenu"
                >
                  <a
                    href="/"
                    onClick={(event) =>
                      handleNavigation(event, '/')
                    }
                  >
                    Forside
                  </a>

                  <a
                    href="/privatlivspolitik"
                    onClick={(event) =>
                      handleNavigation(
                        event,
                        '/privatlivspolitik'
                      )
                    }
                  >
                    Privatlivspolitik
                  </a>

                  <a
                    href="/kontakt"
                    onClick={(event) =>
                      handleNavigation(event, '/kontakt')
                    }
                  >
                    Kontakt
                  </a>
                </nav>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* FORSIDE */}

      {page === '/' && (
        <main className="container main-content">
          <section className="hero">
            <span className="eyebrow">
              TRYGHED STARTER MED ET TJEK
            </span>

            <h1>Er den besked ægte?</h1>

            <p>
              Modtaget en besked, du er i tvivl om?
              Vi hjælper dig med at forstå beskeden
              og finde ud af, hvad du skal gøre.
            </p>
          </section>

          <section className="input-card">
            <label
              htmlFor="message-input"
              className="input-label"
            >
              Indsæt din besked her
            </label>

            <p className="input-hint">
              Indsæt en SMS, e-mail eller chatbesked nedenfor.
            </p>

            <textarea
              id="message-input"
              placeholder="Indsæt den besked, du er i tvivl om..."
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
              <strong>Dit privatliv</strong>

              <p>
                Din besked behandles af AI for at give
                dig en vurdering. Undgå at indsætte
                følsomme oplysninger.
              </p>

              <p>
                <a
                  href="/privatlivspolitik"
                  onClick={(event) =>
                    handleNavigation(
                      event,
                      '/privatlivspolitik'
                    )
                  }
                >
                  Læs vores privatlivspolitik
                </a>
              </p>
            </div>
          </section>

          {loading && (
            <div className="loading-card" role="status">
              <div
                className="spinner"
                aria-hidden="true"
              />

              <div>
                <strong>Vi gennemgår din besked</strong>
                <p>Din vurdering er på vej...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="error-card" role="alert">
              {error}
            </div>
          )}

          {analysis && (
            <section
              className="results"
              aria-label="Resultat af beskedanalysen"
            >
              <div className="results-heading">
                <h2>Din vurdering</h2>
                <p>Her er, hvad FupTjek har fundet.</p>
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
                      Hvorfor skal du være forsigtig?
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
                                  Fra beskeden: "
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
                    <h3>Læs mere hos officielle kilder</h3>

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
                    onClick={() => setShowHelp(!showHelp)}
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
      )}

      {/* PRIVATLIVSPOLITIK */}

      {page === '/privatlivspolitik' && (
        <main className="container legal-page">
          <a
            href="/"
            className="back-link"
            onClick={(event) =>
              handleNavigation(event, '/')
            }
          >
            ← Tilbage til forsiden
          </a>

          <article className="legal-page-card">
            <h1>Privatlivspolitik</h1>

            <p>
              Her kan du læse, hvordan FupTjek
              behandler oplysninger, når du
              bruger hjemmesiden.
            </p>

            <h2>1. Hvilke oplysninger behandler vi?</h2>

            <p>
              Når du bruger FupTjek, behandler vi
              den besked, du indsender, for at
              kunne give dig en AI-baseret vurdering.
              Der kan desuden behandles tekniske
              oplysninger, såsom IP-adresser,
              af hensyn til sikkerhed og drift.
            </p>

            <h2>2. Hvordan bruges oplysningerne?</h2>

            <p>
              Den indsendte tekst behandles for
              at levere vurderingen. Vi benytter
              OpenAI til AI-behandling og Render
              til hosting.
            </p>

            <h2>3. Opbevaring</h2>

            <p>
              FupTjek gemmer ikke indsendte
              beskeder i sin egen database.
              Vores leverandører kan dog
              opbevare oplysninger i forbindelse
              med drift og sikkerhed.
            </p>

            <h2>4. Besøgsstatistik</h2>

            <p>
              Vi bruger Umami Analytics til at
              måle besøg på hjemmesiden,
              eksempelvis antal besøgende
              og omtrentlige geografiske
              oplysninger. Vi sender ikke
              indholdet af dine beskeder
              til Umami.
            </p>

            <h2>5. Annoncer</h2>

            <p>
              FupTjek har ansøgt om Google AdSense.
              Annoncer er ikke aktiveret endnu.
              Hvis vi aktiverer annoncer,
              opdaterer vi oplysningerne om
              annoncebehandling og samtykke.
            </p>

            <h2>6. Dine rettigheder</h2>

            <p>
              Du kan efter GDPR have ret til
              indsigt, rettelse, sletning,
              begrænsning af behandlingen
              og indsigelse.
            </p>

            <p>
              Du kan kontakte os ved spørgsmål
              om dine oplysninger. Du kan
              også klage til{' '}
              <a
                href="https://www.datatilsynet.dk/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datatilsynet
              </a>.
            </p>

            <h2>7. Kontakt</h2>

            <p>
              FupTjek
            </p>

            <p>
              E-mail:{' '}
              <a href="mailto:benjamin.hadziosman@gmail.com">
                benjamin.hadziosman@gmail.com
              </a>
            </p>
          </article>
        </main>
      )}

      {/* KONTAKT */}

      {page === '/kontakt' && (
        <main className="container legal-page">
          <a
            href="/"
            className="back-link"
            onClick={(event) =>
              handleNavigation(event, '/')
            }
          >
            ← Tilbage til forsiden
          </a>

          <article className="legal-page-card contact-page">
            <h1>Kontakt FupTjek</h1>

            <p>
              Har du spørgsmål, oplever du en
              fejl, eller har du forslag til
              forbedringer?
            </p>

            <p>
              Du er altid velkommen til
              at kontakte FupTjek.
            </p>

            <a
              className="contact-email"
              href="mailto:benjamin.hadziosman@gmail.com?subject=Kontakt%20FupTjek"
            >
              Send en e-mail
            </a>

            <p>
              <a href="mailto:benjamin.hadziosman@gmail.com">
                benjamin.hadziosman@gmail.com
              </a>
            </p>

            <p className="legal-small">
              Send ikke CPR-numre, MitID-koder,
              adgangskoder eller andre
              følsomme oplysninger via e-mail.
            </p>
          </article>
        </main>
      )}

      {/* FOOTER */}

      <footer className="site-footer">
        <div className="container footer-inner">
          <strong>FupTjek</strong>

          <p>
            FupTjek giver vejledende AI-vurderinger.
            Vi kan ikke garantere, om en besked
            er sikker eller svindel.
          </p>

          <nav
            className="footer-links"
            aria-label="Information"
          >
            <a
              href="/privatlivspolitik"
              onClick={(event) =>
                handleNavigation(
                  event,
                  '/privatlivspolitik'
                )
              }
            >
              Privatlivspolitik
            </a>

            <a
              href="/kontakt"
              onClick={(event) =>
                handleNavigation(event, '/kontakt')
              }
            >
              Kontakt
            </a>
          </nav>

          <p className="legal-copyright">
            © {new Date().getFullYear()} FupTjek
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
