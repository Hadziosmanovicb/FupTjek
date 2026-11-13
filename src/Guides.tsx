
import './Guides.css'

const articles = [
  {
    id: 'falske-sms',
    number: '01',
    title: 'Sådan genkender du falske SMS’er',
    description:
      'Lær at opdage falske beskeder om pakker, MitID og betalinger.',
    icon: '💬',
  },
  {
    id: 'phishing',
    number: '02',
    title: 'Falske e-mails og phishing',
    description:
      'Undersøg afsenderen, links og mistænkelige vedhæftninger.',
    icon: '✉️',
  },
  {
    id: 'blevet-snydt',
    number: '03',
    title: 'Hvad gør du, hvis du er blevet snydt?',
    description:
      'En praktisk guide til at begrænse skaden og få hjælp.',
    icon: '🛡️',
  },
  {
    id: 'svindelmetoder',
    number: '04',
    title: 'Almindelige former for digital svindel',
    description:
      'Forstå investeringssvindel, falske jobtilbud og andre metoder.',
    icon: '🔍',
  },
]

function GuideCards() {
  return (
    <div className="guide-grid">
      {articles.map((article) => (
        <a
          className="guide-card"
          href={`/guider#${article.id}`}
          key={article.id}
        >
          <div className="guide-card-top">
            <span className="guide-emoji">
              {article.icon}
            </span>
            <span className="guide-number">
              {article.number}
            </span>
          </div>

          <h3>{article.title}</h3>
          <p>{article.description}</p>

          <span className="guide-card-link">
            Læs guiden <span aria-hidden="true">→</span>
          </span>
        </a>
      ))}
    </div>
  )
}

export function GuidesTeaser() {
  return (
    <section className="guide-teaser">
      <div className="guide-teaser-heading">
        <span className="guide-eyebrow">
          VIDEN OG FOREBYGGELSE
        </span>

        <h2>Lær at genkende svindel</h2>

        <p>
          Du behøver ikke vente på en mistænkelig
          besked for at lære at beskytte dig selv.
          Her finder du konkrete råd og eksempler
          på digital svindel.
        </p>
      </div>

      <GuideCards />
    </section>
  )
}

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="guide-example">
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  )
}

function Tip({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="guide-tip">
      <strong>Husk</strong>
      <p>{children}</p>
    </div>
  )
}

export function GuidesPage() {
  return (
    <main className="container guides-page">
      <a className="guide-back" href="/">
        ← Tilbage til FupTjek
      </a>

      <header className="guides-intro">
        <span className="guide-eyebrow">
          FUPTJEKS VIDENSCENTER
        </span>

        <h1>Lær at beskytte dig mod digital svindel</h1>

        <p>
          Svindlere forsøger hver dag at få adgang
          til penge og personlige oplysninger
          gennem SMS'er, e-mails, telefonopkald
          og sociale medier.
        </p>

        <p>
          I disse fire guider gennemgår vi
          almindelige metoder, konkrete eksempler
          og hvad du selv kan gøre for at mindske
          risikoen. Eksemplerne er opdigtede.
        </p>
      </header>

      <nav className="guide-index" aria-label="Vælg guide">
        <h2>Vælg en guide</h2>
        <GuideCards />
      </nav>

      <div className="guide-articles">
        {/* GUIDE 1 */}

        <article id="falske-sms" className="guide-article">
          <span className="guide-eyebrow">
            GUIDE 01 · SMS-SVINDEL
          </span>

          <h2>Sådan genkender du falske SMS’er</h2>

          <p className="guide-lead">
            Falske SMS'er kan ligne almindelige
            beskeder fra fragtfirmaer, banker,
            myndigheder eller bekendte.
            Formålet er ofte at få dig til at klikke
            på et link, betale eller udlevere
            oplysninger.
          </p>

          <h3>1. Beskeden forsøger at skabe hastværk</h3>
          <p>
            En svindler kan skrive, at din konto
            bliver lukket, eller at din pakke
            returneres, hvis du ikke reagerer
            med det samme. Tidspresset skal
            få dig til at handle uden at undersøge
            beskeden.
          </p>

          <Example title="Opdigtet eksempel: Pakke">
            Din pakke kunne ikke leveres.
            Betal et mindre gebyr inden for
            30 minutter for at undgå returnering.
          </Example>

          <p>
            Her bør du undersøge leveringen i
            fragtfirmaets officielle app eller
            på hjemmesiden, som du selv åbner.
            Brug ikke linket i den mistænkelige SMS.
          </p>

          <h3>2. Afsendernavnet er ikke nok</h3>
          <p>
            En SMS kan se ud til at komme fra
            en velkendt virksomhed. Det er
            ikke i sig selv dokumentation for,
            at beskeden er ægte.
            Svindlere kan efterligne både
            afsendernavne og tidligere beskeders
            sprog.
          </p>

          <h3>3. Vær forsigtig med links</h3>
          <p>
            En falsk hjemmeside kan ligne en
            rigtig login- eller betalingsside.
            Kig især efter usædvanlige
            domænenavne, ekstra ord og
            stavevariationer.
          </p>

          <p>
            Et hængelåsikon eller HTTPS
            betyder, at forbindelsen er
            krypteret – ikke at virksomheden
            bag siden er troværdig.
          </p>

          <Example title="Opdigtet eksempel: MitID">
            Dit MitID er midlertidigt spærret.
            Bekræft straks din identitet
            via linket nedenfor.
          </Example>

          <p>
            Hvis du er i tvivl om MitID, skal
            du selv åbne den officielle
            MitID-app eller gå direkte til
            MitIDs hjemmeside.
          </p>

          <h3>4. Tjek beskeden uden at bruge linket</h3>
          <ol>
            <li>
              Undlad at klikke eller svare,
              mens du er i tvivl.
            </li>
            <li>
              Åbn virksomhedens officielle
              hjemmeside eller app.
            </li>
            <li>
              Kontrollér, om der faktisk er
              en pakke, betaling eller
              sikkerhedsmeddelelse.
            </li>
            <li>
              Kontakt virksomheden gennem
              et telefonnummer, du selv finder.
            </li>
          </ol>

          <Tip>
            Stavefejl kan være et advarselstegn,
            men svindelbeskeder kan også være
            skrevet på fejlfrit dansk.
          </Tip>

          <p className="guide-source">
            Officiel vejledning:{' '}
            <a
              href="https://www.sikkerdigital.dk/borger/spot-svindel/saadan-spotter-du-falske-beskeder"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sikkerdigital – Spot falske beskeder ↗
            </a>
          </p>
        </article>

        {/* GUIDE 2 */}

        <article id="phishing" className="guide-article">
          <span className="guide-eyebrow">
            GUIDE 02 · E-MAIL
          </span>

          <h2>Falske e-mails og phishing</h2>

          <p className="guide-lead">
            Phishing er et forsøg på at narre
            dig til at give oplysninger væk
            eller besøge en falsk hjemmeside.
            Beskeden kan udgive sig for at
            komme fra din bank, en webshop,
            en streamingtjeneste eller
            en offentlig myndighed.
          </p>

          <h3>1. Undersøg afsenderens e-mailadresse</h3>
          <p>
            Et vist afsendernavn kan være
            misvisende. Se på den faktiske
            e-mailadresse og især domænet
            efter @-tegnet.
          </p>

          <Example title="Opdigtet eksempel: Falsk bankmail">
            Afsendernavn: Kundeservice Bank
            {'\n'}
            E-mail: support@konto-hjaelp-eksempel.invalid
            {'\n'}
            Emne: Din netbank bliver lukket i dag
          </Example>

          <p>
            Et navn, der lyder officielt,
            gør ikke mailen ægte. Kontrollér
            altid beskeden via bankens
            kendte kontaktkanaler.
          </p>

          <h3>2. Stol ikke blindt på linkteksten</h3>
          <p>
            En knap kan hedde
            "Log ind sikkert", selvom
            den fører til en helt anden
            hjemmeside. På computer kan du
            ofte se destinationen ved at
            holde musen over linket uden
            at klikke.
          </p>

          <p>
            På mobil er det bedre at
            åbne den officielle app
            eller selv skrive adressen.
          </p>

          <h3>3. Pas på vedhæftede filer</h3>
          <p>
            Uventede dokumenter, ZIP-filer
            og andre vedhæftninger kan
            indeholde skadelig software
            eller forsøge at få dig til
            at aktivere usikre funktioner.
          </p>

          <p>
            Hvis du ikke forventede filen,
            bør du bekræfte med afsenderen
            via en anden, kendt kanal,
            før du åbner den.
          </p>

          <h3>4. Se efter mærkelige anmodninger</h3>
          <p>
            En typisk phishing-mail kan bede
            om en adgangskode, MitID-oplysninger,
            betalingskort eller en hurtig
            pengeoverførsel. Det er særligt
            mistænkeligt, når mailen samtidig
            truer med en konsekvens.
          </p>

          <h3>En enkel huskeregel</h3>
          <ol>
            <li>Stop op ved uventede anmodninger.</li>
            <li>Undersøg afsender og domæne.</li>
            <li>Åbn ikke mistænkelige links eller filer.</li>
            <li>Kontakt afsenderen ad en anden vej.</li>
          </ol>

          <Tip>
            En korrekt signatur og et flot
            firmalogo er ikke bevis på,
            at en e-mail er ægte.
          </Tip>

          <p className="guide-source">
            Officiel vejledning:{' '}
            <a
              href="https://www.sikkerdigital.dk/borger/digital-svindel/falske-mails-beskeder-og-opkald"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sikkerdigital – Falske mails,
              beskeder og opkald ↗
            </a>
          </p>
        </article>

        {/* GUIDE 3 */}

        <article id="blevet-snydt" className="guide-article">
          <span className="guide-eyebrow">
            GUIDE 03 · FÅ HJÆLP
          </span>

          <h2>Hvad gør du, hvis du er blevet snydt?</h2>

          <p className="guide-lead">
            Det vigtigste er at begrænse skaden
            hurtigt. Hvad du skal gøre, afhænger
            af om du har klikket på et link,
            indtastet oplysninger eller
            overført penge.
          </p>

          <h3>Hvis du har overført penge</h3>
          <ol>
            <li>
              Kontakt straks din bank
              gennem dens officielle
              telefonnummer eller app.
            </li>
            <li>
              Forklar, at du mistænker
              svindel, og spørg om
              overførslen kan stoppes.
            </li>
            <li>
              Gem kvitteringer, beskeder
              og relevante oplysninger.
            </li>
            <li>
              Anmeld forholdet til politiet.
            </li>
          </ol>

          <h3>Hvis du har indtastet kortoplysninger</h3>
          <p>
            Kontakt banken med det samme,
            og få vurderet behovet for
            at spærre kortet. Hold øje
            med ukendte transaktioner.
          </p>

          <h3>Hvis du har udleveret MitID-oplysninger</h3>
          <p>
            Kontakt MitID-support gennem
            de officielle kanaler, og
            få hjælp til at sikre eller
            spærre dit MitID efter behov.
            Kontakt også banken, hvis
            oplysningerne kan være
            blevet brugt til betalinger.
          </p>

          <h3>Hvis du har indtastet en adgangskode</h3>
          <p>
            Skift adgangskoden via den
            rigtige hjemmeside. Hvis
            du har brugt samme kode
            andre steder, bør de
            også ændres.
          </p>

          <p>
            Aktivér totrinsbekræftelse,
            hvor det er muligt,
            og gennemgå aktive sessioner
            og kontoændringer.
          </p>

          <h3>Hvis du har åbnet en mistænkelig fil</h3>
          <p>
            Undlad at åbne filen igen.
            Hvis du har installeret software,
            kørt ukendte programmer eller
            givet fjernadgang, bør du få
            enheden undersøgt. Brug en
            anden, betroet enhed til at
            sikre vigtige konti ved behov.
          </p>

          <h3>Sådan anmelder du svindel</h3>
          <p>
            Politiet har en digital
            anmeldelsesportal til blandt
            andet SMS-svindel,
            investeringssvindel,
            betalingskortmisbrug
            og digital afpresning.
          </p>

          <p>
            Gem dokumentation, også efter
            anmeldelsen. Det kan være
            beskeder, bankoverførsler,
            skærmbilleder og tidsangivelser.
          </p>

          <Tip>
            Hvis nogen påstår, at de mod
            et gebyr kan skaffe dine
            tabte penge tilbage, skal
            du være ekstra forsigtig.
            Det kan være et nyt
            svindelforsøg.
          </Tip>

          <div className="guide-resource-links">
            <a
              href="https://politi.dk/digital-kriminalitet/anmeld-oekonomisk-svindel-paa-nettet-og-digital-kriminalitet"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anmeld digital svindel hos politiet ↗
            </a>

            <a
              href="https://www.mitid.dk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MitID – Officiel hjemmeside ↗
            </a>
          </div>
        </article>

        {/* GUIDE 4 */}

        <article id="svindelmetoder" className="guide-article">
          <span className="guide-eyebrow">
            GUIDE 04 · SVINDELMETODER
          </span>

          <h2>Almindelige former for digital svindel</h2>

          <p className="guide-lead">
            Svindel handler ikke kun om
            falske pakkebeskeder.
            Kriminelle bruger mange
            forskellige historier til at
            få mennesker til at overføre
            penge eller udlevere oplysninger.
          </p>

          <h3>Investeringssvindel</h3>
          <p>
            Du ser måske en annonce,
            der lover et højt og hurtigt
            afkast. En person kontakter
            dig efterfølgende og tilbyder
            at hjælpe med investeringer
            i kryptovaluta, aktier
            eller andre produkter.
          </p>

          <p>
            Falske platforme kan vise
            opdigtede gevinster for at
            overtale dig til at indbetale
            flere penge.
          </p>

          <Example title="Advarselstegn">
            Du bliver lovet næsten
            risikofrit afkast og presset
            til at betale samme dag.
          </Example>

          <h3>Kærestesvindel</h3>
          <p>
            En person opbygger en relation
            gennem en datingside eller
            sociale medier. Efter noget
            tid opstår en nødsituation,
            og personen beder om penge.
          </p>

          <p>
            Det kan være en påstået
            hospitalsregning, rejseudgift
            eller anden akut situation.
            Relationens længde er ikke
            i sig selv en garanti
            for troværdighed.
          </p>

          <h3>Falske jobtilbud</h3>
          <p>
            Et tilbud om let arbejde
            hjemmefra kan være en
            fælde. Svindleren kan
            kræve betaling for opstart,
            bede om adgang til konti
            eller forsøge at bruge
            din bankkonto til
            pengeoverførsler.
          </p>

          <p>
            Undersøg virksomheden,
            ansættelsesvilkårene
            og kontaktoplysningerne,
            før du sender personlige
            dokumenter.
          </p>

          <h3>Falsk teknisk support</h3>
          <p>
            Du bliver ringet op eller
            ser en pop-up, der påstår,
            at din computer er inficeret.
            En person tilbyder at løse
            problemet, hvis vedkommende
            får fjernadgang.
          </p>

          <p>
            Giv aldrig fjernadgang på
            baggrund af en uopfordret
            henvendelse. Luk siden
            eller opkaldet, og kontakt
            den rigtige leverandør
            på egen hånd.
          </p>

          <h3>Svindel med familie og bekendte</h3>
          <p>
            En besked kan se ud til at
            komme fra en ven eller et
            familiemedlem, som påstår
            at have fået nyt nummer
            og mangler penge.
          </p>

          <p>
            Ring til personen på det
            nummer, du allerede kender.
            Det gælder også, hvis
            beskeden virker personlig.
          </p>

          <h3>Falske webshops og markedspladser</h3>
          <p>
            En vare kan blive annonceret
            til en usædvanligt lav pris,
            mens sælgeren forsøger
            at flytte betalingen
            uden om platformens
            normale sikkerhedssystem.
          </p>

          <p>
            Undersøg sælgeren, domænet
            og betalingsmetoden.
            Vær især opmærksom på pres
            for at betale hurtigt.
          </p>

          <Tip>
            Svindlere kan kombinere flere
            metoder. Et falsk jobtilbud
            kan for eksempel også
            være investeringssvindel
            eller forsøg på identitetstyveri.
          </Tip>

          <p className="guide-source">
            Mere information:{' '}
            <a
              href="https://politi.dk/digital-kriminalitet/anmeld-oekonomisk-svindel-paa-nettet-og-digital-kriminalitet"
              target="_blank"
              rel="noopener noreferrer"
            >
              Politiet – Digital kriminalitet ↗
            </a>
          </p>
        </article>
      </div>

      <section className="guide-cta">
        <h2>Har du modtaget en mistænkelig besked?</h2>

        <p>
          Brug FupTjek til at få en vejledende
          vurdering af den konkrete besked.
          En AI-vurdering kan tage fejl,
          så kontrollér altid vigtige
          oplysninger hos den rigtige afsender.
        </p>

        <a className="guide-cta-button" href="/">
          Tjek en besked med FupTjek →
        </a>
      </section>
    </main>
  )
}
