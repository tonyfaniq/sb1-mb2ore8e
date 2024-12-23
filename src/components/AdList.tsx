import { AdPreview } from './AdPreview';
import { getPurchaseCount, getPurchaseValue } from '../utils/metrics';
import type { Ad } from '../types/meta';

interface AdListProps {
  ads: Ad[];
  accountId: string; // Add accountId prop
}

export function AdList({ ads, accountId }: AdListProps) {
  // Sort ads by purchase value in descending order
  const sortedAds = [...ads].sort((a, b) => {
    const valueA = getPurchaseValue(a.insights?.data?.[0]?.action_values ?? []);
    const valueB = getPurchaseValue(b.insights?.data?.[0]?.action_values ?? []);
    return valueB - valueA;
  });

  return (
    <div className="space-y-4">
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
            creative={ad.creative}
            adId={ad.id}
            name={ad.name}
            status={ad.status}
            accountId={accountId} // Pass accountId to AdPreview
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