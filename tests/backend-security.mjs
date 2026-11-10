
import assert from 'node:assert/strict'

const API = 'http://127.0.0.1:3001'
const GOOD_ORIGIN = 'http://localhost:5173'
const BAD_ORIGIN = 'https://ukendt-side.example'

let passed = 0
let failed = 0

async function check(name, test) {
  try {
    await test()
    passed++
    console.log(`PASS  ${name}`)
  } catch (error) {
    failed++
    console.log(`FAIL  ${name}`)
    console.log(`      ${error.message}`)
  }
}

async function request(route, options = {}) {
  return fetch(`${API}${route}`, {
    signal: AbortSignal.timeout(5000),
    ...options,
  })
}

console.log('\n=================================')
console.log('  FUPTJEK BACKEND SECURITY TEST')
console.log('=================================\n')

console.log('Tester lokal backend:', API)
console.log('Ingen OpenAI-kald bliver sendt.\n')

// 1. Backend virker
await check('Health endpoint fungerer', async () => {
  const res = await request('/health')
  assert.equal(res.status, 200)

  const data = await res.json()
  assert.equal(data.status, 'ok')
})

// 2. Ukendte endpoints afvises
await check('Ukendt endpoint afvises', async () => {
  const res = await request('/findes-ikke')
  assert.equal(res.status, 404)
})

// 3. Ukendt origin afvises
await check('Ukendt hjemmeside blokeres', async () => {
  const res = await request('/analyze', {
    method: 'POST',
    headers: {
      Origin: BAD_ORIGIN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Testbesked',
    }),
  })

  assert.equal(res.status, 403)
})

// 4. Forkert Content-Type afvises
await check('Forkert Content-Type afvises', async () => {
  const res = await request('/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: 'Testbesked',
  })

  assert.equal(res.status, 415)
})

// 5. Ugyldig JSON afvises
await check('Ugyldig JSON afvises', async () => {
  const res = await request('/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: '{ugyldig-json',
  })

  assert.equal(res.status, 400)
})

// 6. Tom besked afvises
await check('Tom besked afvises', async () => {
  const res = await request('/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: '   ',
    }),
  })

  assert.equal(res.status, 400)
})

// 7. For store requests afvises
await check('For stor request afvises', async () => {
  const res = await request('/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'A'.repeat(30000),
    }),
  })

  assert.equal(res.status, 413)
})

// 8. CORS og sikkerhedsheaders
await check('CORS og sikkerhedsheaders', async () => {
  const res = await request('/health', {
    headers: {
      Origin: GOOD_ORIGIN,
    },
  })

  assert.equal(res.status, 200)

  assert.equal(
    res.headers.get('access-control-allow-origin'),
    GOOD_ORIGIN
  )

  assert.equal(
    res.headers.get('x-content-type-options'),
    'nosniff'
  )

  assert.equal(
    res.headers.get('cache-control'),
    'no-store'
  )
})

console.log('\n=================================')
console.log('           RESULTAT')
console.log('=================================')
console.log(`PASS: ${passed}`)
console.log(`FAIL: ${failed}`)
console.log(`TOTAL: ${passed + failed}`)
console.log('=================================\n')

if (failed > 0) {
  process.exitCode = 1
}
