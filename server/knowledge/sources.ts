
type KnowledgeSource = {
  id: string
  title: string
  url: string
  topic: string
  knowledge: string
}

export const sources: KnowledgeSource[] = [
  {
    id: 'sikkerdigital-smishing',
    title: 'Sådan spotter du falske beskeder',
    url: 'https://www.sikkerdigital.dk/borger/spot-svindel/saadan-spotter-du-falske-beskeder',
    topic: 'sms-svindel',
    knowledge: `
Sikkerdigital forklarer, at falske beskeder kan
udgive sig for at komme fra virksomheder eller
myndigheder. Typiske advarselstegn er uventede
betalingskrav, mistænkelige links og tidspres.
Et telefonnummer eller afsendernavn kan forfalskes.
Kontrollér tvivlsomme henvendelser gennem
afsenderens officielle kontaktkanaler.
Et link eller en stavefejl er ikke alene bevis
på svindel.
`,
  },
  {
    id: 'mitid-security',
    title: 'Beskyt dit MitID',
    url: 'https://www.mitid.dk/hjaelp/hjaelpeunivers/pas-paa-mitid/',
    topic: 'mitid',
    knowledge: `
MitID-koder og personlige loginoplysninger
må ikke udleveres til personer, der kontakter
brugeren uopfordret.
Godkend kun handlinger i MitID-appen,
som brugeren selv har startet og genkender.
Ved mistanke om misbrug bør brugeren kontakte
MitID via officielle kanaler og undersøge,
om MitID skal spærres.
`,
  },
  {
    id: 'mobilepay-security',
    title: 'MobilePay – sikkerhed og falske beskeder',
    url: 'https://help.vippsmobilepay.com/da-DK/contact-us',
    topic: 'mobilepay',
    knowledge: `
MobilePay advarer om falske SMS'er og mails,
hvor svindlere udgiver sig for at være MobilePay.
MobilePay beder ikke om følsomme oplysninger
via SMS eller e-mail.
MitID-login i forbindelse med MobilePay
foregår direkte i MobilePay-appen.
Kontrollér betalinger og beskeder i den
officielle app, ikke via uventede links.
`,
  },
  {
    id: 'politi-investment',
    title: 'Politiet – undgå investeringssvindel',
    url: 'https://politi.dk/anmeld-kriminalitet/digital-kriminalitet/undgaa-investeringssvindel',
    topic: 'investering',
    knowledge: `
Investeringssvindel kan omfatte falske tilbud
om aktier, kryptovaluta og andre investeringer.
Urealistiske løfter om hurtigt eller sikkert
afkast og pres for at overføre penge er
alvorlige advarselstegn.
Undersøg investeringstilbud uafhængigt.
Hvis der allerede er overført penge ved
mistanke om svindel, bør yderligere betalinger
stoppes, banken kontaktes og sagen anmeldes.
`,
  },
  {
    id: 'finanstilsynet-investment',
    title: 'Finanstilsynet – advarsler om investering',
    url: 'https://www.finanstilsynet.dk/finansielle-temaer/forbruger-og-investorinformation/advarsler-fra-andre-tilsynsmyndigheder',
    topic: 'investering-register',
    knowledge: `
Finanstilsynet offentliggør advarsler mod
mulig ulovlig investeringsvirksomhed.
Brugeren kan kontrollere virksomheder i
Finanstilsynets virksomhedsregister.
At en virksomhed ikke findes på en
advarselsliste, beviser ikke, at den er sikker.
`,
  },
  {
    id: 'politi-romance',
    title: 'Politiet – undgå datingsvindel',
    url: 'https://politi.dk/anmeld-kriminalitet/digital-kriminalitet/undgaa-at-blive-offer-for-datingsvindel',
    topic: 'dating',
    knowledge: `
Datingsvindel kan foregå ved, at en person
opbygger en romantisk relation online for
senere at bede om penge.
Påstande om akut krise, længerevarende
undskyldninger for ikke at mødes og pres
for pengeoverførsel kan være advarselstegn.
En kærlig besked er ikke i sig selv svindel.
`,
  },
  {
    id: 'sikkerdigital-family',
    title: 'Sikkerdigital – bekendt i knibe',
    url: 'https://www.sikkerdigital.dk/borger/digital-svindel/bekendt-i-knibe-svindel',
    topic: 'bekendt',
    knowledge: `
Svindlere kan udgive sig for at være en ven
eller et familiemedlem i akut pengenød.
De kan hævde at have fået nyt telefonnummer
og bede om en hurtig overførsel.
Kontrollér afsenderen ved at kontakte personen
via et tidligere kendt nummer eller en anden
uafhængig kontaktkanal.
`,
  },
  {
    id: 'sikkerdigital-competition',
    title: 'Sikkerdigital – falske konkurrencer',
    url: 'https://www.sikkerdigital.dk/borger/spot-svindel/saadan-spotter-du-falske-konkurrencer',
    topic: 'konkurrence',
    knowledge: `
Falske konkurrencer kan love gevinster,
gavekort eller præmier for at lokke
oplysninger eller penge ud af brugeren.
Kontrollér konkurrencen via den påståede
arrangørs officielle hjemmeside.
Stavefejl kan være et tegn på svindel,
men korrekt sprog beviser ikke ægthed.
`,
  },
  {
    id: 'sikkerdigital-tech',
    title: 'Sikkerdigital – falske opkald og beskeder',
    url: 'https://www.sikkerdigital.dk/borger/digital-svindel/falske-mails-beskeder-og-opkald',
    topic: 'teknisk-support',
    knowledge: `
Svindlere kan udgive sig for at være
teknisk support og påstå, at en computer
har sikkerhedsproblemer.
De kan forsøge at få adgangskoder,
betalingsoplysninger eller adgang til enheden.
Bekræft henvendelsen gennem den officielle
supportkanal, før der gives adgang.
`,
  },
  {
    id: 'politi-housing',
    title: 'Politiet – undgå boligsvindel',
    url: 'https://politi.dk/national-enhed-for-saerlig-kriminalitet/nyhedsliste/politiet-advarer-nye-studerende-mod-boligsvindlere/2024/07/31',
    topic: 'bolig',
    knowledge: `
Politiet anbefaler at undersøge udlejerens
identitet og retten til at udleje boligen.
Se boligen, og få en fremvisning, før der
underskrives eller overføres penge.
Vær særligt kritisk ved pres for hurtig
betaling og betaling til udlandet.
`,
  },
  {
    id: 'politi-report',
    title: 'Politiet – anmeld digital svindel',
    url: 'https://politi.dk/anmeld-kriminalitet/digital-kriminalitet/anmeld-oekonomisk-svindel-paa-nettet-og-digital-kriminalitet',
    topic: 'anmeldelse',
    knowledge: `
Politiet modtager anmeldelser om blandt
andet digital afpresning, identitetssvindel,
investeringssvindel, datingsvindel og
økonomisk bedrageri.
Gem relevant dokumentation ved mistanke
om svindel, og kontakt banken hurtigt,
hvis betalingsoplysninger eller penge
kan være blevet misbrugt.
`,
  },
]

// ==========================================
// MATCH KILDER MED SMS'ENS INDHOLD
// ==========================================

type SourceRule = {
  sourceId: string
  pattern: RegExp
  priority: number
}

const rules: SourceRule[] = [
  {
    sourceId: 'mitid-security',
    pattern: /mit[\s-]?id|mit-id/i,
    priority: 100,
  },
  {
    sourceId: 'mobilepay-security',
    pattern: /mobile[\s-]?pay|vipps/i,
    priority: 100,
  },
  {
    sourceId: 'politi-romance',
    pattern: /kærlighed|dating|romance|forelsket|min elskede/i,
    priority: 90,
  },
  {
    sourceId: 'sikkerdigital-family',
    pattern: /nyt nummer.{0,120}(overfør|send|penge|låne)|telefon.{0,50}(ødelagt|gået i stykker).{0,100}(overfør|penge)|hej mor.{0,120}(penge|overfør)/i,
    priority: 95,
  },
 {
  sourceId: 'politi-investment',
  pattern: /invest[eé]r|kryptobot|kryptoinvestering|garanteret afkast|trading|aktier.{0,60}(afkast|profit)/i,
  priority: 95,
},
  {
    sourceId: 'finanstilsynet-investment',
    pattern: /investeringsplatform|investeringsfirma|tradingplatform|investeringsselskab/i,
    priority: 85,
  },
  {
    sourceId: 'sikkerdigital-competition',
    pattern: /du har vundet|vundet en|præmie|konkurrence|gavekort.{0,70}(vundet|gevinst)/i,
    priority: 90,
  },
  {
    sourceId: 'sikkerdigital-tech',
    pattern: /fjernstyr|fjernadgang|teknisk support|microsoft support|computer.{0,60}(virus|inficeret)|pc.{0,60}(virus|inficeret)|installer.{0,60}(apk|program)/i,
    priority: 95,
  },
  {
    sourceId: 'politi-housing',
    pattern: /lejlighed|lejekontrakt|udlejer|bolig.{0,60}(depositum|leje)|depositum.{0,60}(fremvisning|privat konto)/i,
    priority: 90,
  },
  {
    sourceId: 'politi-report',
    pattern: /afpresning|webcam.{0,80}(video|betale)|deler.{0,50}(video|billeder)|anmeld.{0,50}svindel/i,
    priority: 85,
  },
  {
    sourceId: 'sikkerdigital-smishing',
    pattern: /pakke|forsendelse|postnord|fragtfirma|toldbetaling|betal.{0,50}(link|gebyr)|engangskode|cvc|adgangskode|spærret.{0,60}konto/i,
    priority: 75,
  },
]

export function findRelevantSources(
  message: string
): KnowledgeSource[] {
  const matches = rules
    .filter((rule) => rule.pattern.test(message))
    .sort((a, b) => b.priority - a.priority)

  const ids = new Set<string>()

  for (const match of matches) {
    ids.add(match.sourceId)

    // Maksimalt to kilder pr. analyse
    if (ids.size >= 2) break
  }

  return [...ids]
    .map((id) => sources.find((source) => source.id === id))
    .filter(
      (source): source is KnowledgeSource =>
        source !== undefined
    )
}
