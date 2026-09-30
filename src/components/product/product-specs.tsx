export function ProductSpecs({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {specs.map((spec) => (
        <div key={spec.label} className="flex justify-between gap-4 py-3 text-sm">
          <dt className="text-muted">{spec.label}</dt>
          <dd className="text-right font-medium text-ink">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
