import { META_CONFIG } from '../config/meta';

export async function fetchAdPreview(adId: string): Promise<string> {
  const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
  if (!token) {
    throw new Error('Access token is required');
  }

  const url = `${META_CONFIG.baseUrl}/${adId}/previews`;
  const params = new URLSearchParams({
    ad_format: 'INSTAGRAM_REELS',
    height: '660',
    width: '340'
  });

  const response = await fetch(`${url}?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to fetch preview');
  }

  const iframe = data.data[0]?.body;
  if (!iframe) {
    throw new Error('Preview not available');
  }

  return iframe;
}