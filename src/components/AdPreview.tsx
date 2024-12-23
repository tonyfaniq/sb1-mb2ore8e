import { formatCurrency, formatNumber, formatPercent } from '../utils/format';
import { AdMedia } from './ad/AdMedia';
import { AdHeader } from './ad/AdHeader';
import type { Creative } from '../types/meta';

interface AdPreviewProps {
  creative?: Creative;
  adId: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED';
  accountId: string; // Add accountId prop
  onStatusChange?: (status: 'ACTIVE' | 'PAUSED') => void;
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
  accountId, // Add accountId to props
  onStatusChange,
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
          accountId={accountId} // Pass accountId to AdMedia
        />
        
        {/* Rest of the component remains the same */}
        <div className="flex-1 p-6">
          <AdHeader 
            name={name} 
            status={status} 
            onStatusChange={onStatusChange}
          />
          {/* ... */}
        </div>
      </div>
    </div>
  );
}