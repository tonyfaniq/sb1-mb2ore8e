import type { VideoAsset } from '../services/meta/videoAssets';

export function getBestThumbnail(thumbnails?: VideoAsset['thumbnails']): string | null {
  if (!thumbnails?.data?.length) return null;
  
  // Sort by resolution (width * height) in descending order
  return thumbnails.data
    .sort((a, b) => (b.width * b.height) - (a.width * a.height))[0]?.uri || null;
}