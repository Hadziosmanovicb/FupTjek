
import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import './App.css'
import { GuidesPage, GuidesTeaser } from './Guides'
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

type Page = '/' | '/privatlivspolitik' | '/kontakt' | '/guider'


function getPage(): Page {
  const path =
    window.location.pathname.replace(/\/+$/, '') || '/'

  if (path === '/en') return '/'
  if (path === '/privatlivspolitik') return '/privatlivspolitik'
  if (path === '/kontakt') return '/kontakt'
  if (path === '/guider') return '/guider'

  return '/'
}


function App() {
  const [page, setPage] = useState<Page>(getPage)
  const [menuOpen, setMenuOpen] = useState(false)

const [language, setLanguage] = useState<'da' | 'en'>(() => {
  return window.location.pathname.startsWith('/en')
    ? 'en'
    : 'da'
})


function switchLanguage() {
  const nextLanguage = language === 'da' ? 'en' : 'da'
  const nextPath = nextLanguage === 'en' ? '/en' : '/'

  setLanguage(nextLanguage)
  setPage('/')
  setMenuOpen(false)

  window.history.pushState(null, '', nextPath)
  window.scrollTo(0, 0)
}



const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem('fuptjek-theme') === 'dark'
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
  setLanguage(
    window.location.pathname.startsWith('/en')
      ? 'en'
      : 'da'
  )
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
body: JSON.stringify({
  message,
  language,
}),      })

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
  if (language === 'en') {
    if (level === 'high') return 'Serious warning signs'
    if (level === 'caution') return 'Possible signs of a scam'
    return 'Unable to assess with confidence'
  }

  if (level === 'high') return 'Flere alvorlige advarselstegn'
  if (level === 'caution') return 'Mulige tegn på svindel'
  return 'Kan ikke vurderes sikkert'
}


const resultText = language === 'en'
  ? {
      assessment: 'ASSESSMENT',
      warning: 'Why should you be cautious?',
      evidence: 'From the message:',
      scamType: 'What kind of scam could this be?',
      actions: 'What should you do?',
      sources: 'Read more from official sources',
      help: 'Have you already clicked or paid?',
      helpTitle: 'Here is what you can do next',
    }
  : {
      assessment: 'VURDERING',
      warning: 'Hvorfor skal du være forsigtig?',
      evidence: 'Fra beskeden:',
      scamType: 'Hvilken slags svindel kan det være?',
      actions: 'Hvad skal du gøre?',
      sources: 'Læs mere hos officielle kilder',
      help: 'Har du allerede klikket eller betalt?',
      helpTitle: 'Vi hjælper dig videre',
    }

  const scamName =
    analysis?.scamType.name.toLowerCase() ?? ''

 
const hasScamType =
  analysis !== null &&
  analysis.riskLevel !== 'uncertain' &&
  !scamName.includes('ukendt') &&
  !scamName.includes('ingen identificeret') &&
  !scamName.includes('ingen bestemt') &&
  !scamName.includes('unknown') &&
  !scamName.includes('no identified') &&
  !scamName.includes('not identified') &&
  !scamName.includes('unspecified')


const t = language === 'en'
  ? {
      eyebrow: 'STAY SAFE ONLINE',
      title: 'Is this message a scam?',
      subtitle:
        'Received a suspicious message? We help you understand it and decide what to do next.',
      inputLabel: 'Paste your message here',
      inputHint:
        'Paste an SMS, email or chat message below.',
      placeholder:
        'Paste the message you are unsure about...',
      button: 'Check my message',
      loading: 'Analysing your message...',
      privacyTitle: 'Your privacy',
      privacyText:
        'Your message is processed by AI to provide an assessment. Avoid sharing sensitive personal information.',
      privacyLink: 'Read our privacy policy',
      loadingTitle: 'We are checking your message',
      loadingText: 'Your assessment is on its way...',
      resultTitle: 'Your assessment',
      resultSubtitle: 'Here is what FupTjek found.',
    }
  : {
      eyebrow: 'TRYGHED STARTER MED ET TJEK',
      title: 'Er den besked ægte?',
      subtitle:
        'Modtaget en besked, du er i tvivl om? Vi hjælper dig med at forstå beskeden og finde ud af, hvad du skal gøre.',
      inputLabel: 'Indsæt din besked her',
      inputHint:
        'Indsæt en SMS, e-mail eller chatbesked nedenfor.',
      placeholder:
        'Indsæt den besked, du er i tvivl om...',
      button: 'Tjek min besked',
      loading: 'Analyserer din besked...',
      privacyTitle: 'Dit privatliv',
      privacyText:
        'Din besked behandles af AI for at give dig en vurdering. Undgå at indsætte følsomme oplysninger.',
      privacyLink: 'Læs vores privatlivspolitik',
      loadingTitle: 'Vi gennemgår din besked',
      loadingText: 'Din vurdering er på vej...',
      resultTitle: 'Din vurdering',
      resultSubtitle: 'Her er, hvad FupTjek har fundet.',
    }

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
  <img
    src="/logo.png"
    alt=""
    className="brand-logo"
  />
</div>

            <span>FupTjek</span>
          </a>

          <div className="header-actions">
            
<button
  type="button"
  className="language-toggle"
  onClick={switchLanguage}
  aria-label={
    language === 'da'
      ? 'Switch to English'
      : 'Skift til dansk'
  }
>
  {language === 'da' ? '🇬🇧 EN' : '🇩🇰 DA'}
</button>

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
  {language === 'en'
    ? 'Your digital scam checker'
    : 'Din digitale svindelhjælper'}
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
<a href="/guider">
  Lær om svindel
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
    {t.eyebrow}
  </span>

  <h1>{t.title}</h1>

  <p>{t.subtitle}</p>
</section>


          <section className="input-card">
           
<label
  htmlFor="message-input"
  className="input-label"
>
  {t.inputLabel}
</label>

<p className="input-hint">
  {t.inputHint}
</p>


            <textarea
              id="message-input"
placeholder={t.placeholder}              rows={6}
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
            {loading ? t.loading : t.button}
            </button>

           
<div className="privacy-notice">
  <strong>{t.privacyTitle}</strong>

  <p>{t.privacyText}</p>

  <p>
    <a
      href="/privatlivspolitik"
      onClick={(event) =>
        handleNavigation(event, '/privatlivspolitik')
      }
    >
      {t.privacyLink}
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
  <h2>{t.resultTitle}</h2>
  <p>{t.resultSubtitle}</p>
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
  {resultText.assessment}
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
                      <h3>{resultText.warning}</h3>
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
                      <h3>{resultText.scamType}</h3>
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
<h3>{resultText.actions}</h3>
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
                   <span>{resultText.help}</span>

                    <span aria-hidden="true">
                      {showHelp ? '−' : '+'}
                    </span>
                  </button>

                  {showHelp && (
                    <div className="help-content">
<h3>{resultText.helpTitle}</h3>
                      <p>{analysis.helpAdvice}</p>
                    </div>
                  )}
                </div>
              </article>
            </section>
          )}
<GuidesTeaser language={language} />
        </main>
      )}
{page === '/guider' && <GuidesPage />}
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
