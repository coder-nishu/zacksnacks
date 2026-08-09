import { useState } from 'react';
import { strings } from '../../config/strings';
import { useAdmin } from '../../hooks/useAdmin';

export default function AdminLoginModal({ assistant, onClose }) {
  const { login } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-ink/40 px-4" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xs rounded-xl bg-surface p-5 shadow-lg"
      >
        <p className="font-display text-base font-semibold text-ink">{strings.loginAsAssistant(assistant)}</p>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder={strings.password}
          aria-label={strings.password}
          className="mt-3 w-full rounded-lg border border-line bg-paper px-3 py-2 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        />
        {error && <p className="mt-1 text-xs text-danger">{strings.wrongPassword}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-paper"
          >
            {strings.close}
          </button>
          <button
            type="submit"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            {strings.login}
          </button>
        </div>
      </form>
    </div>
  );
}
