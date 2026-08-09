import { useEffect, useState } from 'react';
import { isDayLocked, setDayLocked, subscribe } from '../services/adminStore';

export function useDayLock() {
  const [locked, setLocked] = useState(() => isDayLocked());

  useEffect(() => {
    return subscribe(() => setLocked(isDayLocked()));
  }, []);

  return [locked, setDayLocked];
}
