import { useState, useEffect } from 'react';
import { videoCache } from '../services/meta/videoCache';
import type { VideoAsset } from '../services/meta/videoAssets';

export function useVideoCache(accountId: string, videoId?: string) {
  const [video, setVideo] = useState<VideoAsset | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initializeCache() {
      if (!accountId || !videoId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
        
        // Initialize cache if needed
        if (!videoCache.isValid(accountId)) {
          await videoCache.initialize(accountId, token);
        }

        if (mounted) {
          const cachedVideo = videoCache.getVideo(accountId, videoId);
          if (!cachedVideo) {
            // If video not found, try refreshing cache
            await videoCache.initialize(accountId, token, true);
            const refreshedVideo = videoCache.getVideo(accountId, videoId);
            setVideo(refreshedVideo);
          } else {
            setVideo(cachedVideo);
          }
        }
      } catch (err) {
        console.error('Video cache error:', { videoId, error: err });
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load video');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initializeCache();

    return () => {
      mounted = false;
    };
  }, [accountId, videoId]);

  return {
    video,
    loading,
    error,
    getAllVideos: () => videoCache.getAllVideos(accountId)
  };
}