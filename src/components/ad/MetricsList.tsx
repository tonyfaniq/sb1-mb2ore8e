import { MetricItem } from '../metrics/MetricItem';

interface Metric {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}

interface MetricsListProps {
  metrics: Metric[];
}

export function MetricsList({ metrics }: MetricsListProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {metrics.map((metric, index) => (
        <MetricItem
          key={metric.label}
          label={metric.label}
          value={metric.value}
          subtext={metric.subtext}
          highlight={metric.highlight}
        />
      ))}
    </div>
  );
}