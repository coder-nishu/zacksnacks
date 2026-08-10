export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-surface px-6 py-10 text-center shadow-sm">
      {icon && <div className="mb-3 text-3xl" aria-hidden="true">{icon}</div>}
      <p className="font-display text-base font-semibold text-ink">{title}</p>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
