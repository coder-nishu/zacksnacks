import { strings } from '../../config/strings';

const TABS = [
  { id: 'order', label: strings.tabOrder },
  { id: 'summary', label: strings.tabSummary },
];

export default function Tabs({ active, onChange }) {
  return (
    <div role="tablist" aria-label="Sections" className="border-b border-line bg-surface px-4 py-2 sm:px-6">
      <div className="inline-flex gap-1 rounded-full bg-paper p-1">
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={`min-h-9 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                isActive ? 'bg-brand text-white shadow-sm' : 'text-muted hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
