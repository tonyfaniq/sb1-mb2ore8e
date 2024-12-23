import { META_CONFIG } from '../config/meta';
import { validateToken } from '../utils/token';
import { formatAccountId } from '../utils/account';
import { apiFetch } from './fetch';
import type { Campaign } from '../types/meta';

interface CampaignsResponse {
  data: Campaign[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
  };
}

export class MetaAdsAPI {
  private readonly baseUrl: string;
  
  constructor(
    private readonly accessToken: string,
    private readonly accountId: string
  ) {
    this.accessToken = validateToken(accessToken);
    this.accountId = formatAccountId(accountId);
    this.baseUrl = META_CONFIG.baseUrl;
  }

  async getCampaigns(): Promise<CampaignsResponse> {
    // Exactly match the working curl command structure
    const url = `${this.baseUrl}/${this.accountId}/campaigns?fields=${META_CONFIG.fields.campaigns}`;
    
    // Use the exact same header format as the curl command
    return apiFetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
  }
}