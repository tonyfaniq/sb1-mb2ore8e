import { useState, useEffect } from 'react';
import { VideoGrid } from '../components/videos/VideoGrid';
import { DateRangeSelect } from '../components/filters/DateRangeSelect';
import { fetchAdVideos } from '../services/meta/videoAssets';
import type { VideoAsset } from '../services/meta/videoAssets';

export function VideoLibraryPage() {
  const [videos, setVideos] = useState<VideoAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [datePreset, setDatePreset] = useState('last_30d');

  const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
  const accountId = import.meta.env.VITE_META_ADS_ACCOUNT_ID;

  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAdVideos(accountId, token);
        setVideos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load videos');
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, [datePreset]);

  if (loading) return <div>Loading videos...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Video Library</h1>
        <DateRangeSelect value={datePreset} onChange={setDatePreset} />
      </div>

      <VideoGrid videos={videos} />
    </div>
  );
}