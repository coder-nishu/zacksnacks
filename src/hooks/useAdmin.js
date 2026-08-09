import { useEffect, useState } from 'react';
import { isAdmin, login, logout, subscribe } from '../services/adminStore';

export function useAdmin() {
  const [admin, setAdmin] = useState(() => isAdmin());

  useEffect(() => {
    return subscribe(() => setAdmin(isAdmin()));
  }, []);

  return { isAdmin: admin, login, logout };
}
