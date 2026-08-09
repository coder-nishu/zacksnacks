export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-surface px-6 py-10 text-center">
      <p className="font-display text-base font-semibold text-ink">{title}</p>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
    </div>
  );
}
