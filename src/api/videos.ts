import { META_CONFIG } from '../config/meta';
import { apiFetch } from './fetch';

export async function fetchAdVideos(accountId: string, token: string) {
  const url = `${META_CONFIG.baseUrl}/act_${accountId}/advideos`;
  const params = new URLSearchParams({
    fields: 'id,source,title,thumbnails{uri,width,height},created_time',
    access_token: token,
    limit: '100'
  });

  try {
    const response = await apiFetch(`${url}?${params}`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching ad videos:', error);
    throw error;
  }
}