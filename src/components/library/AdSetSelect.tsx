import { useState, useEffect } from 'react';
import { fetchAdSets } from '../../api/meta';
import { Select } from '../ui/Select';
import type { AdSet } from '../../types/meta';

interface AdSetSelectProps {
  campaignId: string;
  selectedAdSet: string;
  onSelect: (adSetId: string) => void;
}

export function AdSetSelect({ campaignId, selectedAdSet, onSelect }: AdSetSelectProps) {
  const [adSets, setAdSets] = useState<AdSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAdSets() {
      try {
        setLoading(true);
        setError(null);
        const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
        const response = await fetchAdSets(token, campaignId, 'last_90d');
        setAdSets(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load ad sets');
      } finally {
        setLoading(false);
      }
    }

    loadAdSets();
  }, [campaignId]);

  if (loading) return <div>Loading ad sets...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="w-80">
      <label htmlFor="adset-select" className="block text-sm font-medium text-gray-700 mb-1">
        Ad Set
      </label>
      <Select
        id="adset-select"
        value={selectedAdSet}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select an ad set</option>
        {adSets.map((adSet) => (
          <option key={adSet.id} value={adSet.id}>
            {adSet.name}
          </option>
        ))}
      </Select>
    </div>
  );
}