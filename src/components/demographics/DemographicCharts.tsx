import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatNumber } from '../../utils/format';
import { getPurchaseCount, getPurchaseValue } from '../../utils/metrics';
import type { DemographicData } from '../../types/demographics';

interface DemographicChartsProps {
  ageData: DemographicData[];
  genderData: DemographicData[];
  platformData: DemographicData[];
}

// Blue for spend, green for purchases, red for purchase value
const COLORS = {
  spend: '#2563eb',
  purchases: '#16a34a',
  purchaseValue: '#dc2626'
};

export function DemographicCharts({ ageData, genderData, platformData }: DemographicChartsProps) {
  // Process age data
  const processedAgeData = ageData
    .map(item => ({
      age: item.age,
      spend: item.spend,
      purchases: getPurchaseCount(item.actions),
      purchaseValue: getPurchaseValue(item.action_values)
    }))
    .sort((a, b) => {
      const ageA = parseInt(a.age.split('-')[0]);
      const ageB = parseInt(b.age.split('-')[0]);
      return ageA - ageB;
    });

  // Process gender data
  const processedGenderData = genderData.map(item => ({
    name: item.gender === 'female' ? 'Women' : item.gender === 'male' ? 'Men' : 'Unknown',
    spend: item.spend,
    purchases: getPurchaseCount(item.actions),
    purchaseValue: getPurchaseValue(item.action_values)
  }));

  // Process platform data
  const processedPlatformData = platformData.map(item => ({
    name: item.device_platform,
    spend: item.spend,
    purchases: getPurchaseCount(item.actions),
    purchaseValue: getPurchaseValue(item.action_values)
  }));

  const renderTooltip = (value: number, name: string) => [
    name === 'spend' || name === 'purchaseValue' 
      ? formatCurrency(value) 
      : formatNumber(value),
    name === 'spend' ? 'Spend' 
      : name === 'purchases' ? 'Purchases' 
      : 'Purchase Value'
  ];

  return (
    <div className="space-y-8">
      {/* Age Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Age Breakdown</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={processedAgeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip formatter={renderTooltip} />
              <Legend />
              <Bar 
                yAxisId="left" 
                dataKey="spend" 
                fill={COLORS.spend} 
                name="Spend" 
              />
              <Bar 
                yAxisId="left" 
                dataKey="purchases" 
                fill={COLORS.purchases} 
                name="Purchases" 
              />
              <Bar 
                yAxisId="right" 
                dataKey="purchaseValue" 
                fill={COLORS.purchaseValue} 
                name="Purchase Value" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Gender Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Gender Distribution</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={processedGenderData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip formatter={renderTooltip} />
                <Legend />
                <Bar dataKey="spend" fill={COLORS.spend} name="Spend" />
                <Bar dataKey="purchases" fill={COLORS.purchases} name="Purchases" />
                <Bar dataKey="purchaseValue" fill={COLORS.purchaseValue} name="Purchase Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Platform Distribution</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={processedPlatformData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip formatter={renderTooltip} />
                <Legend />
                <Bar dataKey="spend" fill={COLORS.spend} name="Spend" />
                <Bar dataKey="purchases" fill={COLORS.purchases} name="Purchases" />
                <Bar dataKey="purchaseValue" fill={COLORS.purchaseValue} name="Purchase Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}