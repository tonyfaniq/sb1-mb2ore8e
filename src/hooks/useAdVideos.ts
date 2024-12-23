import { useState, useEffect } from 'react';
import { fetchAdVideos, type VideoAsset } from '../services/meta/videoAssets';

export function useAdVideos() {
  const [videos, setVideos] = useState<VideoAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideos() {
      const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
      const accountId = import.meta.env.VITE_META_ADS_ACCOUNT_ID;

      if (!token || !accountId) {
        setError('Missing API credentials');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchAdVideos(accountId, token);
        setVideos(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load videos';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  return { videos, loading, error };
}