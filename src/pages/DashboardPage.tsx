import { useState, useEffect } from 'react';
import { CampaignList } from '../components/campaigns/CampaignList';
import { PerformanceMetrics } from '../components/dashboard/PerformanceMetrics';
import { DateRangeSelect } from '../components/filters/DateRangeSelect';
import { fetchAccountMetrics } from '../api/metrics';
import { getPurchaseCount, getPurchaseValue } from '../utils/metrics';

export function DashboardPage() {
  const [datePreset, setDatePreset] = useState('last_30d');
  const [metrics, setMetrics] = useState({ spend: 0, purchases: 0, purchaseValue: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accountId = import.meta.env.VITE_META_ADS_ACCOUNT_ID;
  const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;

  useEffect(() => {
    async function loadMetrics() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchAccountMetrics(token, accountId, datePreset);
        const data = response.data[0] ?? { spend: 0, actions: [], action_values: [] };

        setMetrics({
          spend: data.spend,
          purchases: getPurchaseCount(data.actions),
          purchaseValue: getPurchaseValue(data.action_values)
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load metrics');
      } finally {
        setLoading(false);
      }
    }

    loadMetrics();
  }, [datePreset]);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Campaign Performance</h1>
          <DateRangeSelect value={datePreset} onChange={setDatePreset} />
        </div>
        <PerformanceMetrics {...metrics} />
      </div>

      <CampaignList accountId={accountId} datePreset={datePreset} />
    </div>
  );
}