import { useState, useEffect } from 'react';
import { fetchAdAccounts, type MetaAccount } from '../api/accounts';

export function useAccounts(token: string, userId: string) {
  const [accounts, setAccounts] = useState<MetaAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAccounts() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAdAccounts(token, userId);
        setAccounts(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load accounts';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    if (token && userId) {
      loadAccounts();
    }
  }, [token, userId]);

  return { accounts, loading, error };
}