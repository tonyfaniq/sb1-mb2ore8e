import { Select } from '../ui/Select';
import type { MetaAccount } from '../../api/accounts';

interface AccountSelectProps {
  accounts: MetaAccount[];
  selectedAccount: string;
  onAccountChange: (accountId: string) => void;
  className?: string;
}

export function AccountSelect({ 
  accounts, 
  selectedAccount, 
  onAccountChange,
  className = ''
}: AccountSelectProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="account-select" className="text-sm font-medium text-gray-700">
        Ad Account:
      </label>
      <Select
        id="account-select"
        value={selectedAccount}
        onChange={(e) => onAccountChange(e.target.value)}
        className="w-64"
      >
        <option value="">Select an account</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name}
          </option>
        ))}
      </Select>
    </div>
  );
}