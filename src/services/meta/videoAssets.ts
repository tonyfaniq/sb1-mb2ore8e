import { fetchWithRetry } from '../../utils/api';
import { META_CONFIG } from '../../config/meta';

export interface VideoAsset {
  id: string;
  title: string;
  source: string;
  thumbnails?: {
    data: Array<{
      uri: string;
      width: number;
      height: number;
    }>;
  };
  created_time: string;
}

interface VideoResponse {
  data: VideoAsset[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

export async function fetchAdVideos(accountId: string, accessToken: string): Promise<VideoAsset[]> {
  const url = `${META_CONFIG.baseUrl}/act_${accountId}/advideos`;
  const params = new URLSearchParams({
    fields: 'id,title,source,thumbnails{uri,width,height},created_time',
    access_token: accessToken,
    limit: '250'
  });

  try {
    const response: VideoResponse = await fetchWithRetry(`${url}?${params}`);
    
    if (!response.data) {
      throw new Error('Invalid response format');
    }
    
    // Filter out videos without source URLs
    const validVideos = response.data.filter(video => video.source);
    
    console.log(`Fetched ${validVideos.length} videos`);
    return validVideos;
  } catch (error) {
    console.error('Error fetching ad videos:', error);
    throw error;
  }
}