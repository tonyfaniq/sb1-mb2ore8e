import { META_CONFIG } from '../config/meta';
import { validateToken } from '../utils/token';
import { formatAccountId } from '../utils/account';
import { apiFetch } from './fetch';
import type { DemographicBreakdown } from '../types/demographics';

export async function fetchAgeBreakdown(
  token: string,
  accountId: string,
  datePreset: string
): Promise<DemographicBreakdown> {
  const validToken = validateToken(token);
  const cleanAccountId = formatAccountId(accountId);
  
  const url = `${META_CONFIG.baseUrl}/act_${cleanAccountId}/insights`;
  const params = new URLSearchParams({
    date_preset: datePreset,
    fields: 'spend,actions,action_values',
    breakdowns: 'age'
  });
  
  return apiFetch(`${url}?${params}`, {
    headers: {
      'Authorization': `Bearer ${validToken}`
    }
  });
}

export async function fetchGenderBreakdown(
  token: string,
  accountId: string,
  datePreset: string
): Promise<DemographicBreakdown> {
  const validToken = validateToken(token);
  const cleanAccountId = formatAccountId(accountId);
  
  const url = `${META_CONFIG.baseUrl}/act_${cleanAccountId}/insights`;
  const params = new URLSearchParams({
    date_preset: datePreset,
    fields: 'spend,actions,action_values',
    breakdowns: 'gender'
  });
  
  return apiFetch(`${url}?${params}`, {
    headers: {
      'Authorization': `Bearer ${validToken}`
    }
  });
}

export async function fetchPlatformBreakdown(
  token: string,
  accountId: string,
  datePreset: string
): Promise<DemographicBreakdown> {
  const validToken = validateToken(token);
  const cleanAccountId = formatAccountId(accountId);
  
  const url = `${META_CONFIG.baseUrl}/act_${cleanAccountId}/insights`;
  const params = new URLSearchParams({
    date_preset: datePreset,
    fields: 'spend,actions,action_values',
    breakdowns: 'device_platform'
  });
  
  return apiFetch(`${url}?${params}`, {
    headers: {
      'Authorization': `Bearer ${validToken}`
    }
  });
}