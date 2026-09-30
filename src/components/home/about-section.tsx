export function AboutSection() {
  return (
    <section id="about" className="border-t border-line bg-surface py-16">
      <div className="container-page grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Our approach</p>
          <h2 className="mt-4 text-balance font-display text-3xl leading-tight text-ink">
            We design for the pour, not the shelf.
          </h2>
        </div>
        <div className="space-y-4 text-base leading-relaxed text-muted">
          <p>
            Meridian started with a single gooseneck kettle prototype, refined over eleven spout iterations
            until the pour felt as controllable as a lab burette. Everything since has followed the same
            standard: does this make the cup more repeatable, or is it decoration?
          </p>
          <p>
            Our catalog stays intentionally small. Every product is used daily by the people who design it,
            and nothing ships until it survives a hundred mornings in a row.
          </p>
        </div>
      </div>
    </section>
  );
}
