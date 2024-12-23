import { META_CONFIG } from '../config/meta';
import { validateToken } from '../utils/token';
import { formatAccountId } from '../utils/account';
import { apiFetch } from './fetch';

interface MetricsResponse {
  data: [{
    spend: number;
    actions: Array<{ action_type: string; value: number }>;
    action_values: Array<{ action_type: string; value: number }>;
  }];
}

export async function fetchAccountMetrics(
  token: string,
  accountId: string,
  datePreset: string
): Promise<MetricsResponse> {
  const validToken = validateToken(token);
  const cleanAccountId = formatAccountId(accountId);
  
  // Use the account endpoint to get aggregated data
  const url = `${META_CONFIG.baseUrl}/act_${cleanAccountId}/insights`;
  const params = new URLSearchParams({
    date_preset: datePreset,
    fields: 'spend,actions,action_values'
  });
  
  return apiFetch(`${url}?${params}`, {
    headers: {
      'Authorization': `Bearer ${validToken}`
    }
  });
}