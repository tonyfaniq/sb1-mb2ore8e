import { useState, useEffect } from 'react';
import { fetchCampaigns } from '../../api/meta';
import { Select } from '../ui/Select';
import type { Campaign } from '../../types/meta';

interface CampaignSelectProps {
  accountId: string;
  selectedCampaign: string;
  onSelect: (campaignId: string) => void;
}

export function CampaignSelect({ accountId, selectedCampaign, onSelect }: CampaignSelectProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCampaigns() {
      try {
        setLoading(true);
        setError(null);
        const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
        const response = await fetchCampaigns(token, accountId, 'last_90d');
        setCampaigns(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load campaigns');
      } finally {
        setLoading(false);
      }
    }

    loadCampaigns();
  }, [accountId]);

  if (loading) return <div>Loading campaigns...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="w-80">
      <label htmlFor="campaign-select" className="block text-sm font-medium text-gray-700 mb-1">
        Campaign
      </label>
      <Select
        id="campaign-select"
        value={selectedCampaign}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select a campaign</option>
        {campaigns.map((campaign) => (
          <option key={campaign.id} value={campaign.id}>
            {campaign.name}
          </option>
        ))}
      </Select>
    </div>
  );
}