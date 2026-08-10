const VARIANTS = {
  primary:
    'bg-brand text-white hover:bg-brand-ink focus-visible:ring-brand disabled:opacity-40',
  secondary:
    'border border-line bg-surface text-ink hover:bg-paper focus-visible:ring-brand disabled:opacity-40',
  danger:
    'border border-danger/30 text-danger hover:bg-danger/10 focus-visible:ring-danger disabled:opacity-40',
  ghost: 'text-brand hover:text-brand-ink disabled:opacity-40',
};

const SIZES = {
  md: 'px-5 py-3 text-base',
  sm: 'px-4 py-2.5 text-sm',
};

// Shared button styling so every primary/secondary/danger action across the
// app (order footer, admin panel, header) looks and behaves consistently,
// including a common disabled/pending state.
export default function Button({
  variant = 'secondary',
  size = 'md',
  pending = false,
  disabled = false,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg font-semibold shadow-sm transition-colors disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
