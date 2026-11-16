// English-language security knowledge from official UK, Canadian and Australian organisations.
// The country is metadata: do not assume the user's location from the interface language.
type KnowledgeSource = {
  id: string
  title: string
  url: string
  topic: string
  knowledge: string
}

export const englishSources: KnowledgeSource[] = [
  {
    id: 'uk-ncsc-phishing',
    title: 'UK NCSC – Phishing and scam guidance',
    url: 'https://www.ncsc.gov.uk/collection/phishing-scams',
    topic: 'phishing',
    knowledge: `
Fraudulent emails, texts and messages may pretend to come from legitimate
companies, authorities or people you know. Common warning signs include
unexpected links, requests for passwords, pressure to act quickly and unusual
payment demands. A sender name, familiar logo or good spelling is not proof
of authenticity. Verify a request through an independently found official
website, app or contact number; do not rely on links in a suspicious message.
`,
  },
  {
    id: 'uk-gov-report',
    title: 'UK Government – Report suspicious messages',
    url: 'https://www.gov.uk/report-suspicious-emails-websites-phishing/report-internet-scams-and-phishing',
    topic: 'reporting',
    knowledge: `
People in the UK can use official UK government reporting guidance to report
suspected phishing and scams. Reporting routes differ by type of incident.
Do not tell users outside the UK to follow UK-only reporting procedures.
Regardless of country, keep a copy of the suspicious communication and contact
your bank or service provider promptly if credentials or funds are at risk.
`,
  },
  {
    id: 'canada-cafc-report',
    title: 'Canadian Anti-Fraud Centre – Report fraud',
    url: 'https://antifraudcentre-centreantifraude.ca/report-signalez-eng.htm',
    topic: 'fraud-reporting',
    knowledge: `
Canada's Anti-Fraud Centre provides official guidance on reporting fraud.
Keep transaction information, screenshots and messages as evidence. If money
or banking details are involved, contact the financial institution promptly.
The Canadian reporting process is intended for incidents relevant to Canada;
do not assume an English-speaking user is Canadian.
`,
  },
  {
    id: 'canada-phishing',
    title: 'Get Cyber Safe Canada – Phishing',
    url: 'https://www.getcybersafe.gc.ca/en/resources/fact-sheet-phishing',
    topic: 'phishing',
    knowledge: `
Phishing messages try to trick people into revealing personal information,
login credentials or financial details. They can arrive by email, text or
other messaging services. Be sceptical of urgent account-verification requests
and unexpected attachments or links. Instead of following the message's link,
open the organisation's official app or type its known website address.
`,
  },
  {
    id: 'australia-scamwatch-phishing',
    title: 'Australian Scamwatch – Phishing scams',
    url: 'https://www.scamwatch.gov.au/types-of-scams/phishing-scams',
    topic: 'phishing',
    knowledge: `
Scammers can impersonate delivery services, banks, public bodies or trusted
brands to obtain money or personal details. A phishing message may use urgent
language, fake security alerts, suspicious login links or unexpected fees.
Verify directly with the organisation using contact details found independently.
Never give a one-time verification code to an unexpected caller or message.
`,
  },
  {
    id: 'australia-scamwatch-report',
    title: 'Australian Scamwatch – Report a scam',
    url: 'https://www.scamwatch.gov.au/report-a-scam',
    topic: 'reporting',
    knowledge: `
Australia's Scamwatch accepts scam reports and publishes advice for people
who have encountered scams. Reporting to Scamwatch does not automatically
replace reporting a crime to police or contacting a bank where appropriate.
Only suggest Scamwatch's Australian reporting process when Australia is known
to be relevant. Preserve evidence and act quickly if a payment was made.
`,
  },
]

type SourceRule = {
  sourceId: string
  pattern: RegExp
  priority: number
}

const rules: SourceRule[] = [
  {
    sourceId: 'australia-scamwatch-phishing',
    pattern: /parcel|package|delivery|redelivery|courier|tracking|customs|shipping|postage|royal mail|evri|fedex|dhl|ups/i,
    priority: 100,
  },
  {
    sourceId: 'canada-phishing',
    pattern: /account.{0,50}(suspend|lock|verif|security)|verify.{0,50}(account|identity)|password|sign[ -]?in|log[ -]?in|one[ -]?time (code|password)|verification code|bank details|phishing/i,
    priority: 95,
  },
  {
    sourceId: 'canada-cafc-report',
    pattern: /invest(ment|ing)?|crypto|bitcoin|trading|guaranteed profit|romance|dating|job offer|recruiter|pay upfront|gift card|wire transfer|fraud|scam/i,
    priority: 90,
  },
  {
    sourceId: 'uk-gov-report',
    pattern: /report (a |the )?(fraud|scam|phishing)|police report|identity theft/i,
    priority: 85,
  },
  {
    sourceId: 'australia-scamwatch-report',
    pattern: /already paid|sent (money|funds)|lost money|stolen money|shared my (card|password|details)|gave (them|away) my (password|code)/i,
    priority: 90,
  },
  {
    sourceId: 'uk-ncsc-phishing',
    pattern: /urgent|immediately|click (here|the link)|pay now|final warning|unusual activity|limited time|suspicious (message|email|text)|threat|blackmail|extort|microsoft support|tech support/i,
    priority: 75,
  },
]

export function findRelevantEnglishSources(message: string): KnowledgeSource[] {
  const matchingRules = rules
    .filter((rule) => rule.pattern.test(message))
    .sort((a, b) => b.priority - a.priority)

  const matchedIds = new Set<string>()
  for (const rule of matchingRules) {
    matchedIds.add(rule.sourceId)
    if (matchedIds.size >= 2) break
  }

  return [...matchedIds]
    .map((id) => englishSources.find((source) => source.id === id))
    .filter((source): source is KnowledgeSource => source !== undefined)
}
