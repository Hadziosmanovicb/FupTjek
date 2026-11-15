
export function ContactEnPage() {
  return (
    <main className="container legal-page">
      <a href="/en" className="back-link">
        ← Back to FupTjek
      </a>

      <article className="legal-page-card contact-page">
        <h1>Contact FupTjek</h1>

        <p>
          Do you have questions, want to report
          a problem or have suggestions for
          improving FupTjek?
        </p>

        <p>
          You are welcome to contact us.
        </p>

        <a
          className="contact-email"
          href="mailto:benjamin.hadziosman@gmail.com?subject=Contact%20FupTjek"
        >
          Send an email
        </a>

        <p>
          <a href="mailto:benjamin.hadziosman@gmail.com">
            benjamin.hadziosman@gmail.com
          </a>
        </p>

        <p className="legal-small">
          Please do not send passwords, verification
          codes, identification numbers or other
          sensitive information by email.
        </p>
      </article>
    </main>
  )
}
