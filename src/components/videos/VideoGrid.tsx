import { VideoCard } from './VideoCard';
import type { VideoAsset } from '../../services/meta/videoAssets';

interface VideoGridProps {
  videos: VideoAsset[];
}

export function VideoGrid({ videos }: VideoGridProps) {
  if (!videos.length) {
    return <div>No videos found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}