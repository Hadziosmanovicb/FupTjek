
import { createServer } from 'node:http'

const server = createServer((req, res) => {

  // Tillad forespørgsler fra vores lokale React-app
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok' }))
    return
  }

  if (req.url === '/analyze' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Backend modtog forespørgslen!' }))
    return
  }

  res.writeHead(404)
  res.end('Not found')
})

server.listen(3001, '127.0.0.1', () => {
  console.log('Backend kører på http://localhost:3001')
})
