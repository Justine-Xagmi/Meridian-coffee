import { NewsletterForm } from '@/components/home/newsletter-form';

export function NewsletterSection() {
  return (
    <section id="journal" className="py-16">
      <div className="container-page rounded-3xl bg-ink px-6 py-12 text-bg sm:px-12">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-2xl sm:text-3xl">Brewing notes, twice a month</h2>
          <p className="mt-3 text-sm text-bg/70">
            Recipes, restock alerts, and the occasional deep dive on burr geometry. No spam, unsubscribe anytime.
          </p>
          <div className="mt-6 flex justify-center [&_input]:bg-bg/10 [&_input]:border-bg/20 [&_input]:text-bg [&_input::placeholder]:text-bg/50 [&_button]:bg-bg [&_button]:text-ink">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
