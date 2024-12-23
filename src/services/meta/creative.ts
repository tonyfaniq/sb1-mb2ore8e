import { fetchWithRetry } from '../../utils/api';
import { META_CONFIG } from '../../config/meta';
import { videoCache } from './videoCache';

interface CreativeResponse {
  id: string;
  thumbnail_url?: string;
  object_story_spec?: {
    video_data?: {
      video_id?: string;
    };
  };
}

export async function getCreativeAssets(
  creativeId: string, 
  accessToken: string,
  accountId: string
): Promise<{
  videoUrl: string | null;
  thumbnailUrl: string | null;
}> {
  if (!creativeId || !accessToken || !accountId) {
    return { videoUrl: null, thumbnailUrl: null };
  }

  try {
    // Initialize video cache if needed
    if (!videoCache.isInitialized(accountId)) {
      await videoCache.initialize(accountId, accessToken);
    }

    const url = `${META_CONFIG.baseUrl}/${creativeId}`;
    const params = new URLSearchParams({
      fields: 'thumbnail_url,object_story_spec{video_data{video_id}}',
      access_token: accessToken
    });

    const creative: CreativeResponse = await fetchWithRetry(`${url}?${params}`);
    
    if (!creative || !creative.id) {
      throw new Error('Invalid creative response');
    }

    const videoId = creative.object_story_spec?.video_data?.video_id;
    if (!videoId) {
      return {
        videoUrl: null,
        thumbnailUrl: creative.thumbnail_url || null
      };
    }

    // Get video from cache
    const video = videoCache.getVideo(accountId, videoId);
    if (!video) {
      return {
        videoUrl: null,
        thumbnailUrl: creative.thumbnail_url || null
      };
    }

    return {
      videoUrl: video.source || null,
      thumbnailUrl: creative.thumbnail_url || null
    };
  } catch (error) {
    console.error('Error fetching creative assets:', {
      error,
      creativeId,
      accountId
    });
    return { videoUrl: null, thumbnailUrl: null };
  }
}