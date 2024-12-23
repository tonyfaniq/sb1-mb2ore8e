import { useState, useEffect } from 'react';
import { videoCatalog } from '../stores/videoCatalog';

export function useVideoUrl(videoId?: string | null) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadVideo() {
      if (!videoId) return;

      try {
        setLoading(true);
        setError(null);

        const url = await videoCatalog.getVideo(videoId);
        
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