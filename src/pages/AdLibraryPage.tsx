import { useState, useEffect } from 'react';
import { CampaignSelect } from '../components/library/CampaignSelect';
import { AdSetSelect } from '../components/library/AdSetSelect';
import { AdVideoGrid } from '../components/library/AdVideoGrid';
import { videoLoader } from '../services/meta/videoLoader';

export function AdLibraryPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [selectedAdSet, setSelectedAdSet] = useState<string>('');
  const accountId = import.meta.env.VITE_META_ADS_ACCOUNT_ID;
  const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
  
  // Prefetch videos when component mounts
  useEffect(() => {
    videoLoader.prefetchVideos(accountId, token);
  }, [accountId, token]);

  const handleCampaignChange = (campaignId: string) => {
    setSelectedCampaign(campaignId);
    setSelectedAdSet('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Ad Library</h1>
        
        <div className="flex gap-4 mb-8">
          <CampaignSelect
            accountId={accountId}
            selectedCampaign={selectedCampaign}
            onSelect={handleCampaignChange}
          />
          
          {selectedCampaign && (
            <AdSetSelect
              campaignId={selectedCampaign}
              selectedAdSet={selectedAdSet}
              onSelect={setSelectedAdSet}
            />
          )}
        </div>
      </div>

      {selectedAdSet && (
        <AdVideoGrid
          key={`${selectedCampaign}-${selectedAdSet}`}
          adSetId={selectedAdSet}
          accountId={accountId}
        />
      )}
    </div>
  );
}