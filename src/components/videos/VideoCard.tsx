import { Calendar } from 'lucide-react';
import { getBestThumbnail } from '../../utils/thumbnails';
import type { VideoAsset } from '../../services/meta/videoAssets';

interface VideoCardProps {
  video: VideoAsset;
}

export function VideoCard({ video }: VideoCardProps) {
  const thumbnailUrl = getBestThumbnail(video.thumbnails);
  const createdDate = new Date(video.created_time).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Video Preview */}
      <div className="relative aspect-[9/16] bg-gray-900">
        <video
          src={video.source}
          controls
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2" title={video.title}>
          {video.title}
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="font-mono text-gray-600 break-all">
            ID: {video.id}
          </div>
          
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{createdDate}</span>
          </div>
        </div>

        {/* Thumbnail Preview */}
        {thumbnailUrl && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500 mb-2">Thumbnail:</div>
            <img 
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="w-full h-auto rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}