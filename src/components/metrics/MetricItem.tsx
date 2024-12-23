interface MetricItemProps {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}

export function MetricItem({ label, value, subtext, highlight }: MetricItemProps) {
  return (
    <div className={`${highlight ? 'bg-blue-50' : 'bg-gray-50'} p-3 rounded-lg`}>
      <div className="text-sm text-gray-500">{label}</div>
      <div className={`text-lg font-semibold ${highlight ? 'text-blue-700' : ''}`}>{value}</div>
      {subtext && <div className="text-sm text-gray-500 mt-1">{subtext}</div>}
    </div>
  );
}