
import './Guides.css'

export function GuidesEnPage() {
  return (
    <main className="container guides-page">
      <a className="guide-back" href="/en">
        ← Back to FupTjek
      </a>

      <header className="guides-intro">
        <span className="guide-eyebrow">
          FUPTJEK KNOWLEDGE CENTRE
        </span>

        <h1>Learn how to protect yourself from scams</h1>

        <p>
          Scammers use text messages, emails, social media
          and phone calls to steal money and personal
          information. These guides explain common
          warning signs and practical ways to stay safe.
        </p>
      </header>

      <div className="guide-articles">

        {/* GUIDE 1 */}

        <article id="scam-texts" className="guide-article">
          <span className="guide-eyebrow">
            GUIDE 01 · TEXT MESSAGE SCAMS
          </span>

          <h2>How to Recognise Scam Text Messages</h2>

          <p className="guide-lead">
            Scam text messages often impersonate delivery
            companies, banks, government agencies or
            people you know. Their goal may be to steal
            your money, passwords or personal information.
          </p>

          <h3>Watch out for urgency</h3>
          <p>
            Scammers frequently create pressure by claiming
            that an account will be suspended, a parcel
            returned or a payment rejected unless you
            act immediately.
          </p>

          <div className="guide-example">
            <strong>Fictional example</strong>
            <p>
              Your package could not be delivered.
              Pay a small redelivery fee within
              30 minutes to prevent its return.
            </p>
          </div>

          <h3>Check links independently</h3>
          <p>
            A message may contain a link to a convincing
            imitation of a genuine website. Instead of
            following the link, open the company's official
            app or type its known website address yourself.
          </p>

          <h3>Do not trust the sender name alone</h3>
          <p>
            Sender information can be impersonated.
            A message appearing in an existing conversation
            does not automatically mean it is genuine.
          </p>

          <h3>What should you do?</h3>
          <ol>
            <li>Do not click suspicious links.</li>
            <li>Do not share passwords or verification codes.</li>
            <li>Contact the organisation independently.</li>
            <li>Delete or report confirmed scam messages.</li>
          </ol>

          <div className="guide-tip">
            <strong>Remember</strong>
            <p>
              Scams can contain perfect spelling,
              professional branding and realistic details.
              Appearance alone does not prove authenticity.
            </p>
          </div>
        </article>

        {/* GUIDE 2 */}

        <article id="phishing" className="guide-article">
          <span className="guide-eyebrow">
            GUIDE 02 · EMAIL SECURITY
          </span>

          <h2>Phishing Emails: What to Look For</h2>

          <p className="guide-lead">
            Phishing is a technique used to trick
            people into revealing sensitive information,
            downloading harmful files or visiting
            fraudulent websites.
          </p>

          <h3>Inspect the sender's address</h3>
          <p>
            A familiar display name does not guarantee
            that an email is legitimate. Examine the
            actual email address and the domain name
            after the @ symbol.
          </p>

          <h3>Be cautious with attachments</h3>
          <p>
            Unexpected attachments may contain malicious
            software. Confirm with the sender using
            an established communication channel
            before opening suspicious files.
          </p>

          <h3>Watch for unusual requests</h3>
          <p>
            Be particularly cautious when emails ask
            for passwords, payment information,
            security codes or urgent transfers.
          </p>

          <div className="guide-example">
            <strong>Fictional example</strong>
            <p>
              Your account has been restricted.
              Verify your password immediately
              to restore access.
            </p>
          </div>

          <h3>How to protect yourself</h3>
          <ol>
            <li>Verify the sender through another channel.</li>
            <li>Use official websites or apps to log in.</li>
            <li>Enable multi-factor authentication.</li>
            <li>Keep your devices and software updated.</li>
          </ol>

          <div className="guide-tip">
            <strong>Remember</strong>
            <p>
              HTTPS indicates an encrypted connection.
              It does not guarantee that a website
              or business is trustworthy.
            </p>
          </div>
        </article>

        {/* GUIDE 3 */}

        <article id="after-scam" className="guide-article">
          <span className="guide-eyebrow">
            GUIDE 03 · GET HELP
          </span>

          <h2>What to Do If You've Been Scammed</h2>

          <p className="guide-lead">
            If you believe you have been scammed,
            acting quickly may help reduce the damage.
            The right steps depend on what information
            or money you have shared.
          </p>

          <h3>If you sent money</h3>
          <ol>
            <li>
              Contact your bank or payment provider
              immediately using official contact details.
            </li>
            <li>
              Explain what happened and ask whether
              the payment can be stopped or disputed.
            </li>
            <li>
              Save messages, transaction details
              and other relevant evidence.
            </li>
            <li>
              Report the incident to your local
              law enforcement or appropriate authority.
            </li>
          </ol>

          <h3>If you shared a password</h3>
          <p>
            Change the password using the legitimate
            website or app. Change it anywhere else
            you reused it, enable multi-factor
            authentication and review recent
            account activity.
          </p>

          <h3>If you shared card information</h3>
          <p>
            Contact your bank promptly to discuss
            blocking or replacing the card.
            Monitor your account for unauthorised
            transactions.
          </p>

          <h3>If you installed suspicious software</h3>
          <p>
            Stop using the suspicious program and
            seek trusted technical help. If someone
            received remote access to your device,
            take steps to secure your accounts
            from a trusted device.
          </p>

          <div className="guide-tip">
            <strong>Watch out for recovery scams</strong>
            <p>
              Criminals sometimes contact victims
              again, offering to recover lost money
              in exchange for an upfront fee.
            </p>
          </div>
        </article>

        {/* GUIDE 4 */}

        <article id="scam-types" className="guide-article">
          <span className="guide-eyebrow">
            GUIDE 04 · ONLINE FRAUD
          </span>

          <h2>Common Types of Online Scams</h2>

          <p className="guide-lead">
            Digital scams take many forms. Learning
            how they work can make suspicious
            situations easier to recognise.
          </p>

          <h3>Investment scams</h3>
          <p>
            Fraudulent investment schemes may promise
            unusually high returns with little or no risk.
            Fake platforms sometimes display invented
            profits to encourage further deposits.
          </p>

          <h3>Romance scams</h3>
          <p>
            A scammer may build an emotional relationship
            through social media or a dating platform,
            then invent an emergency requiring money.
          </p>

          <h3>Fake job offers</h3>
          <p>
            Suspicious job offers may promise easy income
            while demanding upfront fees, identity
            documents or access to your bank account.
          </p>

          <h3>Technical support scams</h3>
          <p>
            Scammers may claim that your computer
            has a serious problem and pressure you
            to install software or provide remote access.
          </p>

          <h3>Impersonation scams</h3>
          <p>
            Someone may pretend to be a friend,
            family member or company representative
            and request an urgent payment.
            Verify the person's identity through
            a separate, trusted channel.
          </p>

          <h3>Fake online stores</h3>
          <p>
            Fraudulent stores may advertise products
            at unusually low prices, use fake reviews
            or insist on unusual payment methods.
          </p>

          <div className="guide-tip">
            <strong>Remember</strong>
            <p>
              Scammers often combine several techniques.
              Always verify unexpected requests
              independently before sending money
              or sharing sensitive information.
            </p>
          </div>
        </article>
      </div>

      <section className="guide-cta">
        <h2>Received a suspicious message?</h2>

        <p>
          Use FupTjek to get an AI-assisted assessment.
          AI can make mistakes, so always verify
          important information independently.
        </p>

        <a className="guide-cta-button" href="/en">
          Check a message →
        </a>
      </section>
    </main>
  )
}
