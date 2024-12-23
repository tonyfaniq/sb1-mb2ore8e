import { formatCurrency, formatNumber } from '../../utils/format';

interface ROASMetricsProps {
  spend: number;
  revenue: number;
  purchases: number;
}

export function ROASMetrics({ spend, revenue, purchases }: ROASMetricsProps) {
  const roas = spend > 0 ? revenue / spend : 0;
  const cpa = purchases > 0 ? spend / purchases : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-500">Total Spend</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(spend)}</p>
        <p className="mt-1 text-sm text-gray-600">Cost per acquisition: {formatCurrency(cpa)}</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-500">Total Purchases</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{formatNumber(purchases)}</p>
        <p className="mt-1 text-sm text-gray-600">Conversion rate: {((purchases / spend) * 100).toFixed(1)}%</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(revenue)}</p>
        <p className="mt-1 text-sm text-gray-600">Average order value: {formatCurrency(revenue / purchases)}</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-500">ROAS</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{roas.toFixed(2)}x</p>
        <p className="mt-1 text-sm text-gray-600">Return on ad spend</p>
      </div>
    </div>
  );
}