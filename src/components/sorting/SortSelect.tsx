import { Select } from '../ui/Select';
import type { SortField, SortDirection, SortConfig } from '../../utils/sorting';

interface SortOption {
  value: SortField;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: 'name', label: 'Name' },
  { value: 'spend', label: 'Spend' },
  { value: 'impressions', label: 'Impressions' },
  { value: 'clicks', label: 'Clicks' },
  { value: 'purchases', label: 'Purchases' },
  { value: 'revenue', label: 'Revenue' },
  { value: 'roas', label: 'ROAS' }
];

interface SortSelectProps {
  sort: SortConfig;
  onSortChange: (sort: SortConfig) => void;
  className?: string;
}

export function SortSelect({ sort, onSortChange, className = '' }: SortSelectProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Select
        value={sort.field}
        onChange={(e) => onSortChange({ ...sort, field: e.target.value as SortField })}
        className="w-32"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <Select
        value={sort.direction}
        onChange={(e) => onSortChange({ ...sort, direction: e.target.value as SortDirection })}
        className="w-24"
      >
        <option value="desc">Highest</option>
        <option value="asc">Lowest</option>
      </Select>
    </div>
  );
}