import { useState, useEffect } from 'react';
import { fetchAds } from '../../api/meta';
import { AdTable } from './AdTable';
import type { Ad } from '../../types/meta';

interface AdVideoGridProps {
  adSetId: string;
  accountId: string;
}

export function AdVideoGrid({ adSetId, accountId }: AdVideoGridProps) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAds() {
      try {
        setLoading(true);
        setError(null);
        const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
        const response = await fetchAds(token, adSetId, 'last_90d');
        setAds(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load ads');
      } finally {
        setLoading(false);
      }
    }

    loadAds();
  }, [adSetId]);

  if (loading) return <div>Loading ads...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!ads.length) return <div>No ads found</div>;

  return <AdTable ads={ads} />;
}