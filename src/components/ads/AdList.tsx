import { useState, useEffect } from 'react';
import { fetchAds } from '../../api/meta';
import { AdPreview } from './AdPreview';
import { SortSelect } from '../sorting/SortSelect';
import { sortItems, type SortConfig } from '../../utils/sorting';
import { getPurchaseCount, getPurchaseValue } from '../../utils/metrics';
import type { Ad } from '../../types/meta';

interface AdListProps {
  adSetId: string;
  accountId: string;
  datePreset: string;
}

export function AdList({ adSetId, accountId, datePreset }: AdListProps) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortConfig>({ field: 'spend', direction: 'desc' });

  useEffect(() => {
    async function loadAds() {
      try {
        setLoading(true);
        setError(null);
        const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
        const response = await fetchAds(token, adSetId, datePreset);
        setAds(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load ads');
      } finally {
        setLoading(false);
      }
    }

    loadAds();
  }, [adSetId, datePreset]);

  if (loading) return <div className="p-4">Loading ads...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!ads.length) return <div className="p-4">No ads found</div>;

  const sortedAds = sortItems(ads, sort);

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-end">
        <SortSelect sort={sort} onSortChange={setSort} />
      </div>

      {sortedAds.map(ad => {
        const metrics = ad.insights?.data?.[0] ?? {
          spend: 0,
          impressions: 0,
          clicks: 0,
          actions: [],
          action_values: []
        };

        const purchases = getPurchaseCount(metrics.actions);
        const purchaseValue = getPurchaseValue(metrics.action_values);

        return (
          <AdPreview
            key={ad.id}
            adId={ad.id}
            name={ad.name}
            status={ad.status}
            creative={ad.creative}
            accountId={accountId}
            metrics={{
              spend: metrics.spend,
              impressions: metrics.impressions,
              clicks: metrics.clicks,
              purchases,
              purchaseValue
            }}
          />
        );
      })}
    </div>
  );
}