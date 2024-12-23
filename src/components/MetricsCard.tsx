import React from 'react';
import { DollarSign, Eye, MousePointer, ShoppingCart, TrendingUp } from 'lucide-react';
import { MetricData } from '../types/meta';

interface MetricsCardProps {
  metrics: MetricData;
}

export function MetricsCard({ metrics }: MetricsCardProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-blue-600" />
        <div>
          <p className="text-sm text-gray-600">Cost</p>
          <p className="font-semibold">${metrics.cost.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Eye className="w-5 h-5 text-green-600" />
        <div>
          <p className="text-sm text-gray-600">Impressions</p>
          <p className="font-semibold">{metrics.impressions.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <MousePointer className="w-5 h-5 text-yellow-600" />
        <div>
          <p className="text-sm text-gray-600">Clicks</p>
          <p className="font-semibold">{metrics.clicks.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-purple-600" />
        <div>
          <p className="text-sm text-gray-600">Purchases</p>
          <p className="font-semibold">{metrics.purchases.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-red-600" />
        <div>
          <p className="text-sm text-gray-600">Purchase Value</p>
          <p className="font-semibold">${metrics.purchaseValue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}