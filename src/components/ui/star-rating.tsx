export function StarRating({ rating, reviewCount, size = 14 }: { rating: number; reviewCount?: number; size?: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-1.5" role="img" aria-label={`Rated ${rating} out of 5 stars${reviewCount ? `, ${reviewCount} reviews` : ''}`}>
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i < full ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.2" className="text-accent">
            <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6z" strokeLinejoin="round" />
          </svg>
        ))}
      </div>
      {reviewCount !== undefined && <span className="text-xs text-muted">({reviewCount})</span>}
    </div>
  );
}
