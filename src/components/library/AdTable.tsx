import { useState } from 'react';
import { Play } from 'lucide-react';
import { formatCurrency, formatNumber, formatPercent } from '../../utils/format';
import { getPurchaseCount, getPurchaseValue } from '../../utils/metrics';
import { VideoPopup } from '../video/VideoPopup';
import { StatusBadge } from '../ui/StatusBadge';
import type { Ad } from '../../types/meta';

interface AdTableProps {
  ads: Ad[];
}

export function AdTable({ ads }: AdTableProps) {
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    name: string;
    url: string | null;
  } | null>(null);

  const handlePlayClick = async (ad: Ad) => {
    const videoId = ad.creative?.video_id || 
                    ad.creative?.object_story_spec?.video_data?.video_id;
    
    if (!videoId) return;
    
    try {
      const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${videoId}?fields=source&access_token=${token}`
      );
      const data = await response.json();
      
      if (!response.ok || !data.source) throw new Error('Failed to load video');
      
      setSelectedVideo({
        id: videoId,
        name: ad.name,
        url: data.source
      });
    } catch (err) {
      console.error('Failed to load video:', err);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ad Name
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Spend
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Impressions
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                CTR
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purchases
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                ROAS
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preview
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ads.map(ad => {
              const metrics = ad.insights?.data?.[0] ?? {
                spend: 0,
                impressions: 0,
                clicks: 0,
                actions: [],
                action_values: []
              };

              const purchases = getPurchaseCount(metrics.actions);
              const revenue = getPurchaseValue(metrics.action_values);
              const roas = metrics.spend > 0 ? revenue / metrics.spend : 0;
              const ctr = metrics.impressions > 0 
                ? (metrics.clicks / metrics.impressions) * 100 
                : 0;

              return (
                <tr key={ad.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ad.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                    {formatCurrency(metrics.spend)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                    {formatNumber(metrics.impressions)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                    {formatPercent(ctr)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                    {formatNumber(purchases)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                    {formatCurrency(revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                    {roas.toFixed(2)}x
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <StatusBadge status={ad.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handlePlayClick(ad)}
                      className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
                    >
                      <Play className="w-5 h-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedVideo && selectedVideo.url && (
        <VideoPopup
          isOpen={true}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.name}
        />
      )}
    </>
  );
}