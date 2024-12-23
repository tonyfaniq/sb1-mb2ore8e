import { StatusBadge } from '../ui/StatusBadge';

interface AdHeaderProps {
  name: string;
  status: 'ACTIVE' | 'PAUSED';
}

export function AdHeader({ name, status }: AdHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-base font-semibold text-gray-900 break-words pr-4" style={{ maxWidth: 'calc(100% - 100px)' }}>
        {name}
      </h3>
      <StatusBadge status={status} />
    </div>
  );
}