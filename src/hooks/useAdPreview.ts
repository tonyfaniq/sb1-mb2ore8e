import { useState, useCallback } from 'react';
import { fetchAdPreview } from '../services/adPreview';

export function useAdPreview(adId: string) {
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadPreview = useCallback(async () => {
    if (!adId) return;

    try {
      setLoading(true);
      setError(null);
      const html = await fetchAdPreview(adId);
      setPreviewHtml(html);
    } catch (err) {
      console.error('Failed to load preview:', err);
      setError('Failed to load ad preview');
    } finally {
      setLoading(false);
    }
  }, [adId]);

  return {
    previewHtml,
    error,
    loading,
    loadPreview
  };
}