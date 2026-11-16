import assert from 'node:assert/strict'
import { findRelevantSources } from './sources.ts'
import { findRelevantEnglishSources } from './englishSources.ts'

const tests = [
  { label: 'Danish MitID', message: 'Dit MitID bliver spærret om 24 timer', language: 'da' },
  { label: 'Danish parcel', message: 'Din pakke er tilbageholdt. Betal et gebyr.', language: 'da' },
  { label: 'English parcel', message: 'Your parcel delivery failed. Pay the redelivery fee.', language: 'en' },
  { label: 'English bank', message: 'Your bank account was suspended. Verify your password now.', language: 'en' },
  { label: 'English fraud report', message: 'How do I report fraud? I sent them money.', language: 'en' },
  { label: 'No match', message: 'Hello, see you tomorrow.', language: 'en' },
] as const

for (const test of tests) {
  const results = test.language === 'en'
    ? findRelevantEnglishSources(test.message)
    : findRelevantSources(test.message)
  assert.ok(results.length <= 2, `${test.label}: more than two sources`)
  assert.equal(results.length > 0, test.label !== 'No match', `${test.label}: match expectation`)
  for (const source of results) {
    assert.ok(source.id && source.title && source.url && source.knowledge && source.topic)
    assert.equal(source.url.startsWith('https://'), true)
    if (test.language === 'en') {
      assert.ok(!/sikkerdigital\.dk|mitid\.dk|politi\.dk|finanstilsynet\.dk/i.test(source.url))
    } else {
      assert.ok(!/ncsc\.gov\.uk|gov\.uk|gc\.ca|antifraudcentre|scamwatch\.gov\.au/i.test(source.url))
    }
  }
  console.log(`PASS ${test.label}: ${results.map(s => s.id).join(', ') || 'no sources'}`)
}
