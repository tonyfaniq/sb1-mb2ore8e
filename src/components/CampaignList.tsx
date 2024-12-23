import { useState, useEffect } from 'react';
import { fetchCampaigns } from '../api/meta';
import { formatCurrency, formatNumber } from '../utils/format';

interface CampaignListProps {
  accountId: string;
}

export function CampaignList({ accountId }: CampaignListProps) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCampaigns() {
      try {
        setLoading(true);
        setError(null);
        const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
        const response = await fetchCampaigns(token, accountId);
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
  if (!campaigns.length) return <div>No campaigns found</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Campaign Name
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Spend
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Impressions
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Clicks
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {campaign.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                {formatCurrency(campaign.insights?.data?.[0]?.spend || 0)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                {formatNumber(campaign.insights?.data?.[0]?.impressions || 0)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                {formatNumber(campaign.insights?.data?.[0]?.clicks || 0)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  campaign.status === 'ACTIVE'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}