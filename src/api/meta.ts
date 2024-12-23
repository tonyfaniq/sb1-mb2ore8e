import { META_CONFIG } from '../config/meta';
import { validateToken } from '../utils/token';
import { formatAccountId } from '../utils/account';
import { apiFetch } from './fetch';
import type { Campaign, AdSet, Ad } from '../types/meta';

export async function fetchCampaigns(
  token: string,
  accountId: string,
  datePreset: string = 'last_30d'
): Promise<{ data: Campaign[] }> {
  const validToken = validateToken(token);
  const cleanAccountId = formatAccountId(accountId);
  
  const url = `${META_CONFIG.baseUrl}/act_${cleanAccountId}/campaigns`;
  const params = new URLSearchParams({
    fields: META_CONFIG.getFields(datePreset).campaigns,
    limit: '500'
  });
  
  return apiFetch(`${url}?${params}`, {
    headers: {
      'Authorization': `Bearer ${validToken}`
    }
  });
}

export async function fetchAdSets(
  token: string,
  campaignId: string,
  datePreset: string = 'last_30d'
): Promise<{ data: AdSet[] }> {
  const validToken = validateToken(token);
  
  const url = `${META_CONFIG.baseUrl}/${campaignId}/adsets`;
  const params = new URLSearchParams({
    fields: META_CONFIG.getFields(datePreset).adSets,
    limit: '500'
  });
  
  return apiFetch(`${url}?${params}`, {
    headers: {
      'Authorization': `Bearer ${validToken}`
    }
  });
}

export async function fetchAds(
  token: string,
  adSetId: string,
  datePreset: string = 'last_30d'
): Promise<{ data: Ad[] }> {
  const validToken = validateToken(token);
  
  const url = `${META_CONFIG.baseUrl}/${adSetId}/ads`;
  const params = new URLSearchParams({
    fields: META_CONFIG.getFields(datePreset).ads,
    limit: '500'
  });
  
  return apiFetch(`${url}?${params}`, {
    headers: {
      'Authorization': `Bearer ${validToken}`
    }
  });
}

export async function getAdVideo(token: string, videoId: string) {
  const validToken = validateToken(token);
  
  const url = `${META_CONFIG.baseUrl}/${videoId}`;
  const params = new URLSearchParams({
    fields: 'source',
    access_token: validToken
  });
  
  return apiFetch(`${url}?${params}`);
}