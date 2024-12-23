import { formatCurrency, formatNumber, formatPercent } from '../../utils/format';
import { AdMedia } from './AdMedia';
import { AdHeader } from './AdHeader';
import type { Creative } from '../../types/meta';

interface AdPreviewProps {
  creative?: Creative;
  adId: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED';
  accountId: string;
  metrics: {
    spend: number;
    impressions: number;
    clicks: number;
    purchases: number;
    purchaseValue: number;
  };
}

export function AdPreview({ 
  creative, 
  adId, 
  name, 
  status,
  accountId,
  metrics 
}: AdPreviewProps) {
  const roas = metrics.spend > 0 ? metrics.purchaseValue / metrics.spend : 0;
  const ctr = metrics.impressions > 0 ? (metrics.clicks / metrics.impressions) * 100 : 0;
  const cpa = metrics.purchases > 0 ? metrics.spend / metrics.purchases : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex">
        <AdMedia 
          creative={creative} 
          adId={adId} 
          name={name} 
          accountId={accountId}
        />
        
        <div className="flex-1 p-6">
          <AdHeader name={name} status={status} />

          <div className="grid grid-cols-4 gap-3 mt-4">
            <MetricItem
              label="Purchase Value"
              value={formatCurrency(metrics.purchaseValue)}
              highlight
            />
            <MetricItem
              label="ROAS"
              value={`${roas.toFixed(2)}x`}
              subtext={`From ${formatCurrency(metrics.spend)} spend`}
            />
            <MetricItem
              label="CTR"
              value={formatPercent(ctr)}
              subtext={`${formatNumber(metrics.clicks)} clicks`}
            />
            <MetricItem
              label="Purchases"
              value={formatNumber(metrics.purchases)}
              subtext={`CPA: ${formatCurrency(cpa)}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricItemProps {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}

function MetricItem({ label, value, subtext, highlight }: MetricItemProps) {
  return (
    <div className={`${highlight ? 'bg-blue-50' : 'bg-gray-50'} p-3 rounded-lg`}>
      <div className="text-sm text-gray-500">{label}</div>
      <div className={`text-lg font-semibold ${highlight ? 'text-blue-700' : ''}`}>{value}</div>
      {subtext && <div className="text-sm text-gray-500 mt-1">{subtext}</div>}
    </div>
  );
}