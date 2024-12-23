import { useState } from 'react';
import { Play } from 'lucide-react';
import { VideoPopup } from '../video/VideoPopup';
import type { Creative } from '../../types/meta';

interface AdMediaProps {
  creative?: Creative;
  name: string;
}

export function AdMedia({ creative, name }: AdMediaProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Try both possible video ID locations
  const directVideoId = creative?.video_id;
  const nestedVideoId = creative?.object_story_spec?.video_data?.video_id;
  const videoId = directVideoId || nestedVideoId;

  const handlePlayClick = async () => {
    if (!videoId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
      const response = await fetch(`https://graph.facebook.com/v18.0/${videoId}?fields=source&access_token=${token}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error?.message || 'Failed to load video');
      if (!data.source) throw new Error('No video source found');
      
      setVideoUrl(data.source);
      setShowVideo(true);
    } catch (err) {
      console.error('Failed to load video:', err);
      setError('Failed to load video');
    } finally {
      setLoading(false);
    }
  };

  if (!videoId) {
    return (
      <div className="w-[280px] flex-shrink-0 border-r border-gray-100">
        <div className="relative aspect-[9/16] bg-gray-900 flex items-center justify-center">
          <div className="text-gray-400">No video available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[280px] flex-shrink-0 border-r border-gray-100">
      <div className="relative aspect-[9/16] bg-gray-900 flex items-center justify-center">
        <button
          onClick={handlePlayClick}
          disabled={loading}
          className="group flex items-center justify-center w-16 h-16 rounded-full bg-white/90 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="text-sm text-gray-900">Loading...</div>
          ) : error ? (
            <div className="text-sm text-gray-900">Error</div>
          ) : (
            <Play className="w-8 h-8 text-gray-900 ml-1 group-hover:scale-110 transition-transform" />
          )}
        </button>

        {videoUrl && (
          <VideoPopup
            isOpen={showVideo}
            onClose={() => setShowVideo(false)}
            videoUrl={videoUrl}
            title={name}
          />
        )}
      </div>
      
      <div className="p-2 bg-gray-50 border-t border-gray-100">
        <div className="text-xs text-gray-500">Video ID:</div>
        <div className="text-sm font-mono break-all">{videoId}</div>
      </div>
    </div>
  );
}