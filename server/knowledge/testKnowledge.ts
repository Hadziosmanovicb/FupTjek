
import { findRelevantSources } from './sources.ts'

const sms = 'Dit MitID bliver spærret om 24 timer'

const results = findRelevantSources(sms)

console.log('SMS:', sms)
console.log('Antal fundne kilder:', results.length)

for (const source of results) {
  console.log('Kilde:', source.title)
  console.log('Viden:', source.knowledge)
}
