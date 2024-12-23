import { META_CONFIG } from '../config/meta';
import { fetchWithRetry } from '../utils/api';

export interface MetaAccount {
  id: string;
  name: string;
}

export async function fetchAdAccounts(token: string, userId: string): Promise<MetaAccount[]> {
  try {
    const url = `${META_CONFIG.baseUrl}/${userId}/owned_ad_accounts`;
    const params = new URLSearchParams({
      fields: 'name',
      limit: '1000',
      access_token: token
    });

    const response = await fetchWithRetry(`${url}?${params}`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching ad accounts:', error);
    throw error;
  }
}