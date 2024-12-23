import type { VideoAsset } from '../services/meta/videoAssets';

/**
 * Gets the best quality thumbnail from video assets
 */
export function getBestThumbnail(thumbnails: VideoAsset['thumbnails']) {
  // Sort by resolution (width * height) and scale
  return thumbnails.sort((a, b) => {
    const resA = a.width * a.height * a.scale;
    const resB = b.width * b.height * b.scale;
    return resB - resA;
  })[0]?.uri || null;
}

/**
 * Finds a video asset by its ID
 */
export function findVideoAsset(videoAssets: VideoAsset[], videoId: string) {
  return videoAssets.find(asset => asset.id === videoId);
}