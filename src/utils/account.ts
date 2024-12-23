// Utility functions for account handling
export function formatAccountId(accountId: string): string {
  if (!accountId) {
    throw new Error('Account ID is required');
  }
  
  // Remove any existing act_ prefix and return clean ID
  return accountId.trim().replace(/^act_/, '');
}