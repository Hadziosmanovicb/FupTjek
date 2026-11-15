
export function PrivacyEnPage() {
  return (
    <main className="container legal-page">
      <a href="/en" className="back-link">
        ← Back to FupTjek
      </a>

      <article className="legal-page-card">
        <h1>Privacy Policy</h1>

        <p>
          This privacy policy explains how FupTjek
          processes information when you use our website.
        </p>

        <h2>1. What information do we process?</h2>
        <p>
          When you use FupTjek, we process the message
          you submit to provide an AI-assisted assessment.
          Technical information, such as IP addresses,
          may also be processed for security and
          operational purposes.
        </p>

        <h2>2. How is your information used?</h2>
        <p>
          Your submitted message is processed to generate
          an assessment. We use OpenAI for AI processing
          and Render for hosting.
        </p>

        <h2>3. Data retention</h2>
        <p>
          FupTjek does not store submitted messages
          in its own database. However, our service
          providers may retain information for operational
          and security purposes.
        </p>

        <h2>4. Website analytics</h2>
        <p>
          We use Umami Analytics to understand website
          traffic, including visitor numbers and
          approximate geographical information.
          We do not send the contents of submitted
          messages to Umami.
        </p>

        <h2>5. Advertising</h2>
        <p>
          FupTjek has applied to join Google AdSense.
          Advertisements are not currently enabled.
          If advertising is introduced, we will update
          information about advertising-related data
          processing and consent.
        </p>

        <h2>6. Your rights</h2>
        <p>
          Under the GDPR, you may have rights to access,
          correct or delete personal data, restrict
          processing and object to certain processing
          activities.
        </p>

        <p>
          You can contact us with questions about your
          personal information. You may also submit
          a complaint to the{' '}
          <a
            href="https://www.datatilsynet.dk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Danish Data Protection Agency
          </a>.
        </p>

        <h2>7. Contact</h2>
        <p>FupTjek</p>

        <p>
          Email:{' '}
          <a href="mailto:benjamin.hadziosman@gmail.com">
            benjamin.hadziosman@gmail.com
          </a>
        </p>
      </article>
    </main>
  )
}
