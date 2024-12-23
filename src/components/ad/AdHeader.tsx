import { StatusToggle } from '../StatusToggle';

interface AdHeaderProps {
  name: string;
  status: 'ACTIVE' | 'PAUSED';
  onStatusChange?: (status: 'ACTIVE' | 'PAUSED') => void;
}

export function AdHeader({ name, status, onStatusChange }: AdHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-base font-semibold text-gray-900 break-words pr-4" style={{ maxWidth: 'calc(100% - 100px)' }}>
        {name}
      </h3>
      {onStatusChange ? (
        <StatusToggle
          isActive={status === 'ACTIVE'}
          onChange={(active) => onStatusChange(active ? 'ACTIVE' : 'PAUSED')}
        />
      ) : (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          status === 'ACTIVE'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {status}
        </span>
      )}
    </div>
  );
}