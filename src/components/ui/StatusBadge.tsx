interface StatusBadgeProps {
  status: 'ACTIVE' | 'PAUSED';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
      status === 'ACTIVE'
        ? 'bg-green-100 text-green-800'
        : 'bg-gray-100 text-gray-700'
    }`}>
      {status}
    </span>
  );
}