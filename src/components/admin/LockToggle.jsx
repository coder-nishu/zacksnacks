import { strings } from '../../config/strings';
import { useDayLock } from '../../hooks/useDayLock';

export default function LockToggle() {
  const [locked, setLocked] = useDayLock();

  return (
    <button
      type="button"
      onClick={() => setLocked(!locked)}
      className={`w-full rounded-lg px-4 py-3 text-sm font-semibold ${
        locked ? 'bg-brand text-white hover:bg-brand-ink' : 'bg-danger/10 text-danger hover:bg-danger/20'
      }`}
    >
      {locked ? strings.unlockDay : strings.lockDay}
    </button>
  );
}
