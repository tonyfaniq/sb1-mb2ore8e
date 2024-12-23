import { useState, useEffect } from 'react';
import { getCreativeAssets } from '../services/meta/creative';
import { videoCache } from '../services/meta/videoCache';
import type { Creative } from '../types/meta';

interface AdMediaState {
  mediaUrl: string | null;
  isVideo: boolean;
  loading: boolean;
  error: string | null;
  videoDetails?: {
    id: string;
    title?: string;
  };
}

export function useAdMedia(creative: Creative | undefined, accountId: string) {
  const [state, setState] = useState<AdMediaState>({
    mediaUrl: null,
    isVideo: false,
    loading: true,
    error: null
  });

  useEffect(() => {
    async function loadMedia() {
      if (!creative?.id) {
        setState(prev => ({ ...prev, loading: false }));
        return;
      }
      
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        // Debug log the creative object structure
        console.log('Creative structure:', {
          id: creative.id,
          video_id: creative.video_id,
          object_story_spec: creative.object_story_spec,
          asset_feed_spec: creative.asset_feed_spec,
          thumbnail_url: creative.thumbnail_url
        });

        const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
        
        // Check all possible video ID locations
        const possibleVideoIds = [
          creative.video_id,
          creative.object_story_spec?.video_data?.video_id,
          creative.asset_feed_spec?.videos?.[0]?.video_id,
        ].filter(Boolean);

        console.log('Possible video IDs:', possibleVideoIds);
        
        // Initialize video cache if needed
        if (!videoCache.isInitialized(accountId)) {
          await videoCache.initialize(accountId, token);
        }
        
        // Try each possible video ID
        for (const videoId of possibleVideoIds) {
          const video = videoCache.getVideo(accountId, videoId);
          if (video?.source) {
            console.log('Found video in cache:', { videoId, title: video.title });
            setState({
              mediaUrl: video.source,
              isVideo: true,
              loading: false,
              error: null,
              videoDetails: {
                id: video.id,
                title: video.title
              }
            });
            return;
          }
        }
        
        // Fallback to creative assets
        const assets = await getCreativeAssets(creative.id, token, accountId);
        
        setState({
          mediaUrl: assets.videoUrl || assets.thumbnailUrl || null,
          isVideo: !!assets.videoUrl,
          loading: false,
          error: null,
          videoDetails: possibleVideoIds[0] ? { id: possibleVideoIds[0] } : undefined
        });
      } catch (err) {
        console.error('Error loading media:', { 
          creativeId: creative.id,
          error: err,
          creative: creative 
        });
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load preview'
        }));
      }
    }
    
    loadMedia();
  }, [creative?.id, accountId]);

  return state;
}