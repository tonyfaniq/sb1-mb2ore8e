import { CalendarDays } from 'lucide-react';

interface DateOption {
  label: string;
  value: string;
  description?: string;
}

const dateOptions: DateOption[] = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last_7d', label: 'Last 7 days', description: 'Previous 7 days excluding today' },
  { value: 'last_14d', label: 'Last 14 days', description: 'Previous 14 days excluding today' },
  { value: 'last_30d', label: 'Last 30 days', description: 'Previous 30 days excluding today' },
  { value: 'this_month', label: 'This month' },
  { value: 'last_month', label: 'Last month' },
  { value: 'this_quarter', label: 'This quarter' },
  { value: 'last_quarter', label: 'Last quarter' },
  { value: 'this_year', label: 'This year' },
  { value: 'last_year', label: 'Last year' },
];

interface DateRangeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function DateRangeSelect({ value, onChange }: DateRangeSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <CalendarDays className="w-5 h-5 text-gray-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        {dateOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}