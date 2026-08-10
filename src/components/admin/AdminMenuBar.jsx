import { useState } from 'react';
import { strings } from '../../config/strings';
import { useDayLock } from '../../hooks/useDayLock';
import { useAdmin } from '../../hooks/useAdmin';
import AddSnackForm from './AddSnackForm';
import AddEmployeeForm from './AddEmployeeForm';
import AdminActions from './AdminActions';

const SECTIONS = [
  { id: 'food', label: strings.foodMenuTab },
  { id: 'employee', label: strings.employeeMenuTab },
  { id: 'actions', label: strings.reportsMenuTab },
];

// Persistent admin menu bar shown below the sticky Header+Tabs group while
// logged in — replaces the old centered AdminBar modal. Each section expands
// inline below the bar rather than as an overlay, so it works the same on
// mobile and desktop.
export default function AdminMenuBar() {
  const [locked, setLocked] = useDayLock();
  const { logout } = useAdmin();
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (id) => setActiveSection((current) => (current === id ? null : id));

  return (
    <div className="border-b border-line bg-ink">
      <div className="flex items-center gap-1.5 overflow-x-auto px-4 py-2 sm:px-6">
        <button
          type="button"
          onClick={() => setLocked(!locked)}
          className={`min-h-9 shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
            locked ? 'bg-danger text-white hover:bg-danger/90' : 'bg-white/15 text-white hover:bg-white/25'
          }`}
        >
          {locked ? strings.unlockDay : strings.lockDay}
        </button>

        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => toggleSection(section.id)}
              aria-pressed={isActive}
              className={`min-h-9 shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                isActive ? 'bg-white/25 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              {section.label}
            </button>
          );
        })}

        <button
          type="button"
          onClick={logout}
          className="ml-auto min-h-9 shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:text-white sm:text-sm"
        >
          {strings.logout}
        </button>
      </div>

      {activeSection && (
        <div className="border-t border-white/10 bg-surface px-4 py-4 sm:px-6">
          {activeSection === 'food' && <AddSnackForm />}
          {activeSection === 'employee' && <AddEmployeeForm />}
          {activeSection === 'actions' && <AdminActions />}
        </div>
      )}
    </div>
  );
}
