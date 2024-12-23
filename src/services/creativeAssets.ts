import { META_CONFIG } from '../config/meta';
import { getCreativeAssets } from './meta/creative';
import { isVideoAd } from '../utils/adType';
import type { Creative } from '../types/meta';

export async function getCreativeAssetUrl(
  creative: Creative, 
  adId: string,
  adName: string
): Promise<{ url: string | null; isVideo: boolean }> {
  if (!creative) return { url: null, isVideo: false };
  
  const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
  const isVideo = isVideoAd(adName);
  
  try {
    const assets = await getCreativeAssets(adId, token);
    
    if (isVideo && assets.videoUrl) {
      return { 
        url: assets.videoUrl,
        isVideo: true
      };
    }
    
    // Use high-res thumbnail or fall back to original thumbnail
    return { 
      url: assets.thumbnailUrl || creative.thumbnail_url || null,
      isVideo: false
    };
  } catch (err) {
    console.error('Failed to fetch creative assets:', err);
    // Fall back to original thumbnail
    return { 
      url: creative.thumbnail_url || null,
      isVideo: false
    };
  }
}