import { createContext, useContext, useState, ReactNode } from 'react';
import { useAccounts } from '../hooks/useAccounts';

interface AccountContextType {
  selectedAccount: string;
  setSelectedAccount: (id: string) => void;
  accounts: Array<{ id: string; name: string }>;
  loading: boolean;
  error: string | null;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const USER_ID = '948973458475849';

export function AccountProvider({ children }: { children: ReactNode }) {
  const [selectedAccount, setSelectedAccount] = useState('');
  const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
  const { accounts, loading, error } = useAccounts(token, USER_ID);

  return (
    <AccountContext.Provider 
      value={{ 
        selectedAccount, 
        setSelectedAccount, 
        accounts, 
        loading, 
        error 
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccountContext must be used within an AccountProvider');
  }
  return context;
}