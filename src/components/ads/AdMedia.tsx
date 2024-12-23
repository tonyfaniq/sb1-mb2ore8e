import { useAdMedia } from '../../hooks/useAdMedia';
import { VideoPlayer } from '../video/VideoPlayer';
import type { Creative } from '../../types/meta';

interface AdMediaProps {
  creative?: Creative;
  adId: string;
  name: string;
  accountId: string;
}

export function AdMedia({ creative, adId, name, accountId }: AdMediaProps) {
  const { mediaUrl, isVideo, loading, error, videoDetails } = useAdMedia(creative, accountId);

  return (
    <div className="w-[280px] flex-shrink-0 border-r border-gray-100">
      <div className="relative aspect-[9/16] bg-gray-900">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400">Loading preview...</div>
          </div>
        ) : error || !mediaUrl ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400">
              {error || 'No preview available'}
            </div>
          </div>
        ) : isVideo ? (
          <VideoPlayer src={mediaUrl} title={name} />
        ) : (
          <img 
            src={mediaUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="p-2 bg-gray-50 border-t border-gray-100 space-y-2">
        <div>
          <div className="text-xs text-gray-500">Creative ID:</div>
          <div className="text-sm font-mono break-all">{creative?.id || 'N/A'}</div>
        </div>
        
        {videoDetails && (
          <div>
            <div className="text-xs text-gray-500">Video ID:</div>
            <div className="text-sm font-mono break-all">{videoDetails.id}</div>
            {videoDetails.title && (
              <>
                <div className="text-xs text-gray-500 mt-1">Title:</div>
                <div className="text-sm break-all">{videoDetails.title}</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}