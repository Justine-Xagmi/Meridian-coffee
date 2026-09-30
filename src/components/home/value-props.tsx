const PROPS = [
  { title: 'Complimentary shipping', desc: 'On orders over $75, delivered in 3–5 business days.' },
  { title: '2-year warranty', desc: 'Every kettle, grinder, and scale is covered against defects.' },
  { title: '30-day returns', desc: 'Brew with it for a month. If it is not right, send it back.' },
];

export function ValueProps() {
  return (
    <section aria-label="Why shop with us" className="border-b border-line">
      <div className="container-page grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
        {PROPS.map((prop) => (
          <div key={prop.title} className="px-1 py-5 sm:px-6">
            <p className="text-sm font-semibold text-ink">{prop.title}</p>
            <p className="mt-1 text-sm text-muted">{prop.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
