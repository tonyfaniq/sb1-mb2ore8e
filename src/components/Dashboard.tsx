import React, { useState, useEffect } from 'react';
import { MetaAdsAPI } from '../api/metaAds';
import { MetricsTable } from './MetricsTable';
import { Alert } from './ui/Alert';
import { Campaign, AdSet, Ad } from '../types/meta';

interface DashboardProps {
  accessToken: string;
  accountId: string;
}

export function Dashboard({ accessToken, accountId }: DashboardProps) {
  const [api] = useState(() => new MetaAdsAPI(accessToken, accountId));
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [adSets, setAdSets] = useState<AdSet[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [selectedAdSet, setSelectedAdSet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getCampaigns();
      setCampaigns(data.data || []);
      setAdSets([]);
      setAds([]);
      setSelectedCampaign(null);
      setSelectedAdSet(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load campaigns';
      setError(message);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const loadAdSets = async (campaignId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAdSets(campaignId);
      setAdSets(data.data || []);
      setAds([]);
      setSelectedCampaign(campaignId);
      setSelectedAdSet(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load ad sets';
      setError(message);
      setAdSets([]);
    } finally {
      setLoading(false);
    }
  };

  const loadAds = async (adsetId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAds(adsetId);
      setAds(data.data || []);
      setSelectedAdSet(adsetId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load ads';
      setError(message);
      setAds([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    id: string,
    status: 'ACTIVE' | 'PAUSED',
    type: 'CAMPAIGN' | 'ADSET' | 'AD'
  ) => {
    try {
      setError(null);
      await api.updateStatus(id, type, status);
      // Refresh the current view
      if (type === 'CAMPAIGN') await loadCampaigns();
      else if (type === 'ADSET' && selectedCampaign) await loadAdSets(selectedCampaign);
      else if (type === 'AD' && selectedAdSet) await loadAds(selectedAdSet);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update status';
      setError(message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Meta Ads Dashboard</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          {error}
          <button 
            onClick={() => setError(null)}
            className="ml-2 text-sm underline"
          >
            Dismiss
          </button>
        </Alert>
      )}

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Campaigns</h2>
          {loading && campaigns.length === 0 ? (
            <div className="text-center p-4">Loading campaigns...</div>
          ) : (
            <MetricsTable
              data={campaigns}
              onStatusChange={(id, status) => handleStatusChange(id, status, 'CAMPAIGN')}
              onRowClick={loadAdSets}
            />
          )}
        </div>

        {selectedCampaign && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Ad Sets</h2>
            {loading && adSets.length === 0 ? (
              <div className="text-center p-4">Loading ad sets...</div>
            ) : (
              <MetricsTable
                data={adSets}
                onStatusChange={(id, status) => handleStatusChange(id, status, 'ADSET')}
                onRowClick={loadAds}
              />
            )}
          </div>
        )}

        {selectedAdSet && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Ads</h2>
            {loading && ads.length === 0 ? (
              <div className="text-center p-4">Loading ads...</div>
            ) : (
              <MetricsTable
                data={ads}
                onStatusChange={(id, status) => handleStatusChange(id, status, 'AD')}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}