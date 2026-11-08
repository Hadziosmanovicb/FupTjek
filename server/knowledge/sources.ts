
export const sources = [
  {
    id: 'sikkerdigital-smishing',
    title: 'Falske SMS-beskeder',
    url: 'https://www.sikkerdigital.dk/borger/spot-svindel/saadan-spotter-du-falske-beskeder',
    topic: 'sms-svindel',
    knowledge: `
      Svindlere kan udgive sig for at være fragtfirmaer,
      virksomheder eller offentlige myndigheder.

      Falske beskeder kan indeholde betalingskrav,
      tidspres eller anmodninger om personlige oplysninger.

      Afsenderens viste telefonnummer er ikke i sig selv
      bevis på, at beskeden er ægte.

      Brugeren bør kontrollere henvendelsen gennem
      virksomhedens officielle kontaktkanaler.
    `,
  },
  {
    id: 'mitid-security',
    title: 'Beskyt dit MitID',
    url: 'https://www.mitid.dk/hjaelp/hjaelpeunivers/pas-paa-mitid/',
    topic: 'mitid',
    knowledge: `
      Brugeren må aldrig udlevere sine MitID-koder
      eller godkende handlinger, vedkommende ikke
      selv har startet.

      Banker og myndigheder beder ikke brugeren
      om at udlevere MitID-koder.

      Ved mistanke om misbrug af MitID skal brugeren
      følge MitIDs officielle vejledning om spærring.
    `,
  },
]

export function findRelevantSources(message: string) {
  const text = message.toLowerCase()

  return sources.filter((source) => {
    if (source.topic === 'mitid') {
      return text.includes('mitid')
    }

    if (source.topic === 'sms-svindel') {
      return (
        text.includes('pakke') ||
        text.includes('levering') ||
        text.includes('fragtfirma')
      )
    }

    return false
  })
}
