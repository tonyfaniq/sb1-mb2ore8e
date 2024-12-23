import { fetchAdVideos, type VideoAsset } from './videoAssets';

class VideoCache {
  private caches: Map<string, Map<string, VideoAsset>> = new Map();
  private initialized: Set<string> = new Set();

  async initialize(accountId: string, token: string): Promise<void> {
    if (this.isInitialized(accountId)) return;

    try {
      const videos = await fetchAdVideos(accountId, token);
      const accountCache = new Map<string, VideoAsset>();
      
      videos.forEach(video => {
        if (video.source) {
          accountCache.set(video.id, video);
        }
      });
      
      this.caches.set(accountId, accountCache);
      this.initialized.add(accountId);
    } catch (error) {
      console.error('Failed to initialize video cache:', error);
      throw error;
    }
  }

  getVideo(accountId: string, videoId: string): VideoAsset | undefined {
    return this.caches.get(accountId)?.get(videoId);
  }

  isInitialized(accountId: string): boolean {
    return this.initialized.has(accountId);
  }

  clear(accountId: string): void {
    this.caches.delete(accountId);
    this.initialized.delete(accountId);
  }
}

// Export a singleton instance
export const videoCache = new VideoCache();