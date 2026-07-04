interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export default function StarRating({ rating, reviewCount, size = 14 }: StarRatingProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      <span style={{ color: "var(--color-star)", fontSize: size }}>★</span>
      <span style={{ fontWeight: 600, fontSize: size }}>{rating.toFixed(1)}</span>
      {reviewCount != null && (
        <span style={{ color: "var(--color-text-muted)", fontSize: size - 1 }}>
          ({reviewCount >= 1000 ? `${(reviewCount / 1000).toFixed(1)}k` : reviewCount})
        </span>
      )}
    </span>
  );
}
