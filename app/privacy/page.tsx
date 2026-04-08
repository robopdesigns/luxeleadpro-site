export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-white/80">Effective date: March 8, 2026</p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Information We Collect</h2>
          <p className="text-white/80">
            When you submit a form on this site, we may collect your name, email,
            phone number, brokerage, market area, and details you share about your
            business goals.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">How We Use Information</h2>
          <p className="text-white/80">
            We use your information to contact you about services, schedule audits,
            improve our offerings, and provide support.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Data Sharing</h2>
          <p className="text-white/80">
            We do not sell your personal information. We may share data with trusted
            service providers (such as scheduling, hosting, analytics, and CRM tools)
            only as needed to operate the business.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Data Security</h2>
          <p className="text-white/80">
            We use commercially reasonable safeguards to protect your data. No method
            of storage or transmission is 100% secure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Your Choices</h2>
          <p className="text-white/80">
            You may request access, correction, or deletion of your information by
            contacting us at robopdesigns@gmail.com.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="text-white/80">
            Questions about this Privacy Policy can be sent to
            {" "}
            <a className="text-purple-300 hover:text-[#D4AF37]/40" href="mailto:robopdesigns@gmail.com">
              robopdesigns@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}


