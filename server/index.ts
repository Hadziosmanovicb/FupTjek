
import { createServer } from 'node:http'

const server = createServer((req, res) => {
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok' }))
    return
  }

  res.writeHead(404)
  res.end('Not found')
})

server.listen(3001, '127.0.0.1', () => {
  console.log('FupTjek backend kører på http://localhost:3001')
})
