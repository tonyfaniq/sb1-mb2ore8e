import { fetchWithRetry } from '../../utils/api';
import { META_CONFIG } from '../../config/meta';

export async function getVideoData(videoId: string, accessToken: string) {
  const url = `${META_CONFIG.baseUrl}/${videoId}?fields=source,thumbnails{uri}&access_token=${accessToken}`;
  return fetchWithRetry(url);
}