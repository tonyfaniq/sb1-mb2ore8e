import { useState, useEffect } from 'react';
import { fetchAdSets } from '../../api/meta';
import { AdSetRow } from './AdSetRow';
import { AdList } from '../ads/AdList';
import { SortSelect } from '../sorting/SortSelect';
import { sortItems, type SortConfig } from '../../utils/sorting';
import type { AdSet } from '../../types/meta';

interface AdSetListProps {
  campaignId: string;
  accountId: string;
  datePreset: string;
}

export function AdSetList({ campaignId, accountId, datePreset }: AdSetListProps) {
  const [adSets, setAdSets] = useState<AdSet[]>([]);
  const [expandedAdSets, setExpandedAdSets] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortConfig>({ field: 'spend', direction: 'desc' });

  useEffect(() => {
    async function loadAdSets() {
      try {
        setLoading(true);
        setError(null);
        const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
        const response = await fetchAdSets(token, campaignId, datePreset);
        setAdSets(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load ad sets');
      } finally {
        setLoading(false);
      }
    }

    loadAdSets();
  }, [campaignId, datePreset]);

  const toggleAdSet = (adSetId: string) => {
    setExpandedAdSets(prev => {
      const next = new Set(prev);
      if (next.has(adSetId)) {
        next.delete(adSetId);
      } else {
        next.add(adSetId);
      }
      return next;
    });
  };

  if (loading) return <div className="p-4">Loading ad sets...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!adSets.length) return <div className="p-4">No ad sets found</div>;

  const sortedAdSets = sortItems(adSets, sort);

  return (
    <div className="ml-8 space-y-4">
      <div className="flex justify-end px-4 pt-4">
        <SortSelect sort={sort} onSortChange={setSort} />
      </div>

      {sortedAdSets.map(adSet => (
        <div key={adSet.id} className="bg-gray-50 rounded-lg">
          <AdSetRow 
            adSet={adSet}
            isExpanded={expandedAdSets.has(adSet.id)}
            onToggle={() => toggleAdSet(adSet.id)}
          />
          {expandedAdSets.has(adSet.id) && (
            <AdList 
              adSetId={adSet.id}
              accountId={accountId}
              datePreset={datePreset}
            />
          )}
        </div>
      ))}
    </div>
  );
}