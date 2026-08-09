import { useEffect, useState } from 'react';
import { getConfig } from '../services/configSource';
import { subscribe } from '../services/adminStore';

export function useConfig() {
  const [config, setConfig] = useState(() => getConfig());

  useEffect(() => {
    return subscribe(() => setConfig(getConfig()));
  }, []);

  return { config, loading: false, error: null };
}
