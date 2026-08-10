import { useState } from 'react';
import { useConfig } from '../hooks/useConfig';
import { useDayLock } from '../hooks/useDayLock';
import { useAdmin } from '../hooks/useAdmin';
import { todayDhaka, prettyDateBn } from '../utils/date';
import { strings } from '../config/strings';
import AdminLoginModal from './admin/AdminLoginModal';
import logo from '../assets/twinforce-logo.jpg';

export default function Header({ adminBarOpen, onToggleAdminBar }) {
  const { config } = useConfig();
  const [locked] = useDayLock();
  const { isAdmin } = useAdmin();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="border-b border-line bg-surface px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt={`${config.office} logo`}
            className="h-9 w-9 shrink-0 rounded-lg bg-white object-contain"
          />
          <div>
            <h1 className="font-display text-[18px] font-bold text-ink sm:text-xl">
              {config.office} {strings.brandSuffix}
            </h1>
            <p className="text-xs text-muted sm:text-sm">{prettyDateBn(todayDhaka())}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold sm:text-sm ${
              locked ? 'bg-danger/10 text-danger' : 'bg-amber-soft text-amber'
            }`}
          >
            {locked ? strings.dayLocked : strings.dayOpen}
          </span>
          {isAdmin ? (
            <button
              type="button"
              onClick={onToggleAdminBar}
              aria-pressed={adminBarOpen}
              className={`min-h-9 rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm ${
                adminBarOpen ? 'bg-brand-ink text-white' : 'bg-brand text-white'
              }`}
            >
              {config.assistant}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="min-h-9 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-paper sm:text-sm"
            >
              {strings.login}
            </button>
          )}
        </div>
      </div>

      {showLogin && <AdminLoginModal assistant={config.assistant} onClose={() => setShowLogin(false)} />}
    </header>
  );
}
