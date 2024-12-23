import { useState, useEffect } from 'react';
import { videoLoader } from '../services/meta/videoLoader';

export function useVideoLoader(videoId?: string) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoId) return;

    let mounted = true;
    const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;

    async function loadVideo() {
      try {
        setLoading(true);
        setError(null);
        const url = await videoLoader.getVideo(videoId, token);
        
        if (mounted) {
          setVideoUrl(url);
          if (!url) {
            setError('Video not found');
          }
        }
      } catch (err) {
        if (mounted) {
          console.error('Failed to load video:', err);
          setError('Failed to load video');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadVideo();

    return () => {
      mounted = false;
    };
  }, [videoId]);

  return { videoUrl, loading, error };
}