import { useState } from 'react';
import { strings } from '../../config/strings';
import { addCustomEmployee } from '../../services/adminStore';

export default function AddEmployeeForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    addCustomEmployee(trimmed);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{strings.addEmployee}</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={strings.newEmployeeName}
          className="min-w-0 flex-1 rounded-lg border border-line bg-paper px-3 py-2 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-ink disabled:opacity-40"
        >
          {strings.add}
        </button>
      </div>
    </form>
  );
}
