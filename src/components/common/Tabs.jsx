import { strings } from '../../config/strings';

const TABS = [
  { id: 'order', label: strings.tabOrder },
  { id: 'summary', label: strings.tabSummary },
];

export default function Tabs({ active, onChange }) {
  return (
    <div role="tablist" aria-label="Sections" className="flex gap-6 border-b border-line bg-paper px-4 sm:px-6">
      <div className="flex w-full gap-6">
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={`relative py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                isActive ? 'text-brand' : 'text-muted hover:text-ink'
              }`}
            >
              {tab.label}
              {isActive && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
