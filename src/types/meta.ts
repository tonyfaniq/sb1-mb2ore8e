export interface Creative {
  id: string;
  thumbnail_url?: string;
  video_id?: string;
  source?: string;
  asset_feed_spec?: {
    videos?: Array<{
      url: string;
    }>;
  };
  object_story_spec?: {
    video_data?: {
      video_id?: string;
    };
  };
}