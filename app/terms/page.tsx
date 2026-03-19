export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold">Terms of Service</h1>
        <p className="text-white/80">Effective date: March 8, 2026</p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Use of This Site</h2>
          <p className="text-white/80">
            By using this site, you agree to use it lawfully and not attempt to
            disrupt, misuse, or interfere with its operation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">No Guaranteed Outcomes</h2>
          <p className="text-white/80">
            Marketing and lead-generation performance depends on many factors. We do
            not guarantee specific financial or business outcomes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Intellectual Property</h2>
          <p className="text-white/80">
            Site content, branding, and materials are owned by Luxe Lead AI Pro unless
            otherwise stated, and may not be reused without permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
          <p className="text-white/80">
            To the fullest extent allowed by law, Luxe Lead AI Pro is not liable for
            indirect, incidental, or consequential damages from use of this site or
            services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Changes to Terms</h2>
          <p className="text-white/80">
            We may update these Terms from time to time. Continued use of the site
            after updates means you accept the revised Terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="text-white/80">
            For questions, contact
            {" "}
            <a className="text-purple-300 hover:text-purple-200" href="mailto:robopdesigns@gmail.com">
              robopdesigns@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}


