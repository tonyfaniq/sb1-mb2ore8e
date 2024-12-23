import { Calendar } from 'lucide-react';
import { useVideoCache } from '../../hooks/useVideoCache';
import { StatusBadge } from '../ui/StatusBadge';
import type { Ad } from '../../types/meta';

interface AdVideoCardProps {
  ad: Ad;
  accountId: string;
}

export function AdVideoCard({ ad, accountId }: AdVideoCardProps) {
  const videoId = ad.creative?.video_id || 
                  ad.creative?.object_story_spec?.video_data?.video_id;

  const { video } = useVideoCache(accountId, videoId);

  // Skip non-video ads
  if (!videoId || !video?.source) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Video Preview */}
      <div className="relative aspect-[9/16] bg-gray-900">
        <video 
          src={video.source}
          poster={video.thumbnails?.data?.[0]?.uri}
          controls
          playsInline
          muted
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Ad Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900 line-clamp-1" title={ad.name}>
            {ad.name}
          </h3>
          <StatusBadge status={ad.status} />
        </div>
        
        <div className="space-y-2 text-sm">
          {video.title && (
            <div className="text-gray-600">
              {video.title}
            </div>
          )}
          
          {video.created_time && (
            <div className="flex items-center gap-1 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{new Date(video.created_time).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}