import { DollarSign, ShoppingCart, TrendingUp, BarChart2 } from 'lucide-react';
import { formatCurrency, formatLargeNumber } from '../../utils/format';

interface MetricCardProps {
  title: string;
  value: string;
  subtext?: string;
  icon: React.ReactNode;
}

function MetricCard({ title, value, subtext, icon }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          {subtext && <p className="text-sm text-gray-500">{subtext}</p>}
        </div>
      </div>
    </div>
  );
}

interface PerformanceMetricsProps {
  spend: number;
  purchases: number;
  purchaseValue: number;
}

export function PerformanceMetrics({
  spend,
  purchases,
  purchaseValue,
}: PerformanceMetricsProps) {
  const roas = spend > 0 ? purchaseValue / spend : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Spend"
        value={formatCurrency(spend)}
        subtext={`CPA: ${formatCurrency(spend / purchases)}`}
        icon={<DollarSign className="w-5 h-5 text-blue-600" />}
      />
      <MetricCard
        title="Purchases"
        value={formatLargeNumber(purchases)}
        icon={<ShoppingCart className="w-5 h-5 text-blue-600" />}
      />
      <MetricCard
        title="Purchase Value"
        value={formatCurrency(purchaseValue)}
        subtext={`AOV: ${formatCurrency(purchaseValue / purchases)}`}
        icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
      />
      <MetricCard
        title="ROAS"
        value={`${roas.toFixed(2)}x`}
        subtext="Return on ad spend"
        icon={<BarChart2 className="w-5 h-5 text-blue-600" />}
      />
    </div>
  );
}