import { ChevronDown, ChevronRight } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/format';
import { getPurchaseCount, getPurchaseValue } from '../../utils/metrics';
import type { AdSet } from '../../types/meta';

interface AdSetRowProps {
  adSet: AdSet;
  isExpanded: boolean;
  onToggle: () => void;
}

export function AdSetRow({ adSet, isExpanded, onToggle }: AdSetRowProps) {
  const metrics = adSet.insights?.data?.[0] ?? {
    spend: 0,
    impressions: 0,
    clicks: 0,
    actions: [],
    action_values: []
  };

  const purchases = getPurchaseCount(metrics.actions);
  const purchaseValue = getPurchaseValue(metrics.action_values);

  return (
    <div className="p-4">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
          <h4 className="font-medium">{adSet.name}</h4>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          adSet.status === 'ACTIVE'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {adSet.status}
        </span>
      </button>

      <div className="grid grid-cols-5 gap-4 mt-4">
        <MetricBox 
          label="Spend" 
          value={formatCurrency(metrics.spend)} 
        />
        <MetricBox 
          label="Impressions" 
          value={formatNumber(metrics.impressions)} 
        />
        <MetricBox 
          label="Clicks" 
          value={formatNumber(metrics.clicks)} 
        />
        <MetricBox 
          label="Purchases" 
          value={formatNumber(purchases)} 
        />
        <MetricBox 
          label="Revenue" 
          value={formatCurrency(purchaseValue)} 
        />
      </div>
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white p-3 rounded-lg">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}