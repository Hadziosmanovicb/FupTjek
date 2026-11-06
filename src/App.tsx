

import { useState } from 'react'
import { detectTimePressure } from './utils/scamDetector'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  

function handleCheck() {
  const hasTimePressure = detectTimePressure(message)

  if (hasTimePressure) {
    alert('Advarsel: Beskeden indeholder tidspres!')
  } else {
    alert('Ingen tegn på tidspres fundet.')
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
        onChange={(event) => setMessage(event.target.value)}
      />

     
<button type="button" onClick={handleCheck}>
  Tjek besked
</button>

    </main>
  )
}

export default App
