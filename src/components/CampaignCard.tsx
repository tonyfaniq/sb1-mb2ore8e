import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Campaign } from '../types/meta';
import { MetricsCard } from './MetricsCard';
import { StatusToggle } from './StatusToggle';
import { AdSetList } from './AdSetList';

interface CampaignCardProps {
  campaign: Campaign;
  onStatusChange: (id: string, status: 'ACTIVE' | 'PAUSED') => void;
}

export function CampaignCard({ campaign, onStatusChange }: CampaignCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
            <h3 className="text-lg font-semibold">{campaign.name}</h3>
          </button>
          
          <StatusToggle
            isActive={campaign.status === 'ACTIVE'}
            onChange={(active) =>
              onStatusChange(campaign.id, active ? 'ACTIVE' : 'PAUSED')
            }
          />
        </div>
        
        <div className="mt-4">
          <MetricsCard metrics={campaign} />
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-gray-50">
          <AdSetList
            adSets={campaign.adSets}
            onStatusChange={onStatusChange}
          />
        </div>
      )}
    </div>
  );
}