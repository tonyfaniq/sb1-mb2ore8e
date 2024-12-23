import { useState, useEffect } from 'react';
import { fetchCampaigns } from '../../api/meta';
import { CampaignRow } from './CampaignRow';
import { AdSetList } from '../adsets/AdSetList';
import { SortSelect } from '../sorting/SortSelect';
import { sortItems, type SortConfig } from '../../utils/sorting';
import type { Campaign } from '../../types/meta';

interface CampaignListProps {
  accountId: string;
  datePreset: string;
}

export function CampaignList({ accountId, datePreset }: CampaignListProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [expandedCampaigns, setExpandedCampaigns] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortConfig>({ field: 'spend', direction: 'desc' });

  useEffect(() => {
    async function loadCampaigns() {
      try {
        setLoading(true);
        setError(null);
        const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
        const response = await fetchCampaigns(token, accountId, datePreset);
        setCampaigns(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load campaigns');
      } finally {
        setLoading(false);
      }
    }

    loadCampaigns();
  }, [accountId, datePreset]);

  const toggleCampaign = (campaignId: string) => {
    setExpandedCampaigns(prev => {
      const next = new Set(prev);
      if (next.has(campaignId)) {
        next.delete(campaignId);
      } else {
        next.add(campaignId);
      }
      return next;
    });
  };

  if (loading) return <div>Loading campaigns...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!campaigns.length) return <div>No campaigns found</div>;

  const sortedCampaigns = sortItems(campaigns, sort);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <SortSelect sort={sort} onSortChange={setSort} />
      </div>

      {sortedCampaigns.map(campaign => (
        <div key={campaign.id} className="bg-white rounded-lg shadow-sm">
          <CampaignRow 
            campaign={campaign}
            isExpanded={expandedCampaigns.has(campaign.id)}
            onToggle={() => toggleCampaign(campaign.id)}
          />
          {expandedCampaigns.has(campaign.id) && (
            <AdSetList 
              campaignId={campaign.id}
              accountId={accountId}
              datePreset={datePreset}
            />
          )}
        </div>
      ))}
    </div>
  );
}