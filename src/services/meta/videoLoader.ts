import { META_CONFIG } from '../../config/meta';
import { apiFetch } from '../../utils/api';
import type { VideoAsset } from './videoAssets';

class VideoLoader {
  private videoCache = new Map<string, string>();
  private loadingPromises = new Map<string, Promise<string>>();
  private batchSize = 5;
  private initialized = false;
  private maxVideos = 250;

  async prefetchVideos(accountId: string, token: string) {
    if (this.initialized) return;
    
    try {
      const url = `${META_CONFIG.baseUrl}/act_${accountId}/advideos`;
      const params = new URLSearchParams({
        fields: 'id,source',
        access_token: token,
        limit: this.maxVideos.toString()
      });

      const response = await apiFetch<{ data: VideoAsset[] }>(`${url}?${params}`);
      const videos = response.data.slice(0, this.maxVideos);

      // Process videos in batches
      for (let i = 0; i < videos.length; i += this.batchSize) {
        const batch = videos.slice(i, i + this.batchSize);
        await Promise.all(
          batch.map(video => this.loadVideo(video.id, token))
        );
      }

      this.initialized = true;
    } catch (error) {
      console.error('Failed to prefetch videos:', error);
    }
  }

  async getVideo(videoId: string, token: string): Promise<string | null> {
    if (this.videoCache.has(videoId)) {
      return this.videoCache.get(videoId) || null;
    }

    if (this.loadingPromises.has(videoId)) {
      return this.loadingPromises.get(videoId) || null;
    }

    return this.loadVideo(videoId, token);
  }

  private async loadVideo(videoId: string, token: string): Promise<string> {
    const loadingPromise = (async () => {
      try {
        const url = `${META_CONFIG.baseUrl}/${videoId}`;
        const params = new URLSearchParams({
          fields: 'source',
          access_token: token
        });

        const response = await apiFetch<{ source: string }>(`${url}?${params}`);
        this.videoCache.set(videoId, response.source);
        return response.source;
      } catch (error) {
        console.error(`Failed to load video ${videoId}:`, error);
        return null;
      } finally {
        this.loadingPromises.delete(videoId);
      }
    })();

    this.loadingPromises.set(videoId, loadingPromise);
    return loadingPromise;
  }

  clearCache() {
    this.videoCache.clear();
    this.loadingPromises.clear();
    this.initialized = false;
  }
}

export const videoLoader = new VideoLoader();