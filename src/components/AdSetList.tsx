import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { MetricsDisplay } from './MetricsDisplay';
import { AdList } from './AdList';
import { getPurchaseCount, getPurchaseValue } from '../utils/metrics';
import type { AdSet } from '../types/meta';

interface AdSetListProps {
  adSets: AdSet[];
  onExpandAdSet: (adSetId: string) => void;
}

export function AdSetList({ adSets, onExpandAdSet }: AdSetListProps) {
  const [expandedAdSets, setExpandedAdSets] = useState<Set<string>>(new Set());

  const toggleAdSet = (adSetId: string) => {
    const newExpanded = new Set(expandedAdSets);
    if (expandedAdSets.has(adSetId)) {
      newExpanded.delete(adSetId);
    } else {
      newExpanded.add(adSetId);
      onExpandAdSet(adSetId);
    }
    setExpandedAdSets(newExpanded);
  };

  return (
    <div className="ml-8 space-y-4 mt-4">
      {adSets.map(adSet => {
        const metrics = adSet.insights?.data?.[0] ?? {
          spend: 0,
          impressions: 0,
          clicks: 0,
          actions: [],
          action_values: []
        };

        const purchases = getPurchaseCount(metrics.actions);
        const purchaseValue = getPurchaseValue(metrics.action_values);
        const isExpanded = expandedAdSets.has(adSet.id);

        return (
          <div key={adSet.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <button 
              onClick={() => toggleAdSet(adSet.id)}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                  <h3 className="font-medium">{adSet.name}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  adSet.status === 'ACTIVE'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {adSet.status}
                </span>
              </div>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <MetricsDisplay metrics={{ ...metrics, purchases, purchaseValue }} title="Spend" />
              <MetricsDisplay metrics={{ ...metrics, purchases, purchaseValue }} title="Impressions" />
              <MetricsDisplay metrics={{ ...metrics, purchases, purchaseValue }} title="Clicks" />
              <MetricsDisplay metrics={{ ...metrics, purchases, purchaseValue }} title="Purchases" />
              <MetricsDisplay metrics={{ ...metrics, purchases, purchaseValue }} title="Purchase Value" />
            </div>

            {isExpanded && adSet.ads && (
              <AdList ads={adSet.ads} />
            )}
          </div>
        );
      })}
    </div>
  );
}