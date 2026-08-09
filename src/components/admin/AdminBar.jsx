import { strings } from '../../config/strings';
import { useAdmin } from '../../hooks/useAdmin';
import LockToggle from './LockToggle';
import AddSnackForm from './AddSnackForm';
import AddEmployeeForm from './AddEmployeeForm';
import AdminActions from './AdminActions';

export default function AdminBar({ onClose }) {
  const { logout } = useAdmin();

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center bg-ink/40 px-4 py-10 overflow-y-auto" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm space-y-5 rounded-xl bg-surface p-5 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <p className="font-display text-base font-semibold text-ink">{strings.adminPanel}</p>
          <button type="button" onClick={onClose} className="text-sm text-muted hover:text-ink">
            {strings.close}
          </button>
        </div>

        <LockToggle />
        <AddEmployeeForm />
        <AddSnackForm />
        <AdminActions />

        <button
          type="button"
          onClick={() => {
            logout();
            onClose();
          }}
          className="w-full rounded-lg px-4 py-2 text-sm font-semibold text-muted hover:bg-paper"
        >
          {strings.logout}
        </button>
      </div>
    </div>
  );
}
