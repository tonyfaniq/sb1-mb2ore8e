import { useState, useEffect } from 'react';
import { META_CONFIG } from '../config/meta';
import { apiFetch } from '../utils/api';

export function useAdVideo(videoId?: string) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadVideo() {
      if (!videoId) return;

      try {
        setLoading(true);
        setError(null);
        const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
        
        // Fetch video source directly from advideos endpoint
        const url = `${META_CONFIG.baseUrl}/${videoId}`;
        const params = new URLSearchParams({
          fields: 'source',
          access_token: token
        });

        const response = await apiFetch(`${url}?${params}`);
        if (!response.source) {
          throw new Error('No video source found');
        }
        
        setVideoUrl(response.source);
      } catch (err) {
        console.error('Failed to load video:', err);
        setError('Failed to load video');
        setVideoUrl(null);
      } finally {
        setLoading(false);
      }
    }

    loadVideo();
  }, [videoId]);

  return { videoUrl, loading, error };
}