import { formatCurrency, formatNumber } from '../utils/format';
import type { InsightData } from '../types/meta';

interface ExtendedMetrics extends InsightData {
  purchases: number;
  purchaseValue: number;
}

interface MetricsDisplayProps {
  metrics: ExtendedMetrics;
  title: string;
}

export function MetricsDisplay({ metrics, title }: MetricsDisplayProps) {
  const getValue = () => {
    switch (title) {
      case 'Spend':
      case 'Purchase Value':
        return formatCurrency(title === 'Spend' ? metrics.spend : metrics.purchaseValue);
      case 'Purchases':
        return formatNumber(metrics.purchases);
      default:
        return formatNumber(metrics[title.toLowerCase() as keyof InsightData] || 0);
    }
  };

  return (
    <div className="bg-gray-50 p-3 rounded">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="font-semibold">{getValue()}</div>
    </div>
  );
}