

import { useState } from 'react'
import { detectTimePressure } from './utils/scamDetector'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  
const [result, setResult] = useState<boolean | null>(null)

  


function handleCheck() {
  const hasTimePressure = detectTimePressure(message)

  setResult(hasTimePressure)
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
}}

      />

     
<button type="button" onClick={handleCheck}>
  Tjek besked
</button>

{result !== null && (
  <section>
    <h2>Resultat</h2>

    {result ? (
      <p>Advarsel: Beskeden indeholder tegn på tidspres.</p>
    ) : (
      <p>Ingen af vores kendte tegn på tidspres blev fundet. Det betyder ikke, at beskeden er sikker.</p>
    )}

    <p>
      Klik ikke på mistænkelige links.
      Kontakt altid virksomheden via dens officielle hjemmeside.
    </p>
  </section>
)}

    </main>
  )
}

export default App
