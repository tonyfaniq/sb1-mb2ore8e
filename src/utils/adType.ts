/**
 * Determines if an ad is a video ad based on its name
 */
export function isVideoAd(name: string): boolean {
  return name.toLowerCase().startsWith('video');
}