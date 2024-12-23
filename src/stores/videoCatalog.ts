import { META_CONFIG } from '../config/meta';
import { apiFetch } from '../utils/api';

interface VideoAsset {
  id: string;
  source: string;
}

class VideoCatalog {
  private videos = new Map<string, VideoAsset>();
  private loading = new Set<string>();
  private initialized = false;

  async initialize() {
    if (this.initialized) return;

    const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
    const accountId = import.meta.env.VITE_META_ADS_ACCOUNT_ID;

    if (!token || !accountId) {
      console.error('Missing required environment variables for video catalog');
      return;
    }

    try {
      const url = `${META_CONFIG.baseUrl}/act_${accountId}/advideos`;
      const params = new URLSearchParams({
        fields: 'id,source',
        access_token: token,
        limit: '500'
      });

      const response = await apiFetch<{ data: VideoAsset[] }>(`${url}?${params}`);
      
      response.data.forEach((video: VideoAsset) => {
        if (video.source) {
          this.videos.set(video.id, video);
        }
      });

      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize video catalog:', error);
    }
  }

  async getVideo(videoId: string): Promise<string | null> {
    // Check if we already have the video
    const video = this.videos.get(videoId);
    if (video) {
      return video.source;
    }

    // Check if we're already loading this video
    if (this.loading.has(videoId)) {
      return null;
    }

    const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
    if (!token) {
      console.error('Missing access token');
      return null;
    }

    // Load the video
    try {
      this.loading.add(videoId);
      
      const url = `${META_CONFIG.baseUrl}/${videoId}`;
      const params = new URLSearchParams({
        fields: 'source',
        access_token: token
      });

      const video = await apiFetch<VideoAsset>(`${url}?${params}`);
      
      if (video.source) {
        this.videos.set(videoId, video);
        return video.source;
      }
    } catch (error) {
      console.error('Failed to load video:', error);
    } finally {
      this.loading.delete(videoId);
    }

    return null;
  }
}

// Export singleton instance
export const videoCatalog = new VideoCatalog();