
import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  
function handleCheck() {
  alert(message)
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
