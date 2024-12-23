import { useState, useEffect } from 'react';
import { fetchAgeBreakdown, fetchGenderBreakdown, fetchPlatformBreakdown } from '../api/demographics';
import { DateRangeSelect } from '../components/filters/DateRangeSelect';
import { DemographicCharts } from '../components/demographics/DemographicCharts';
import type { DemographicData } from '../types/demographics';

export function DemographicsPage() {
  const [ageData, setAgeData] = useState<DemographicData[]>([]);
  const [genderData, setGenderData] = useState<DemographicData[]>([]);
  const [platformData, setPlatformData] = useState<DemographicData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [datePreset, setDatePreset] = useState('last_30d');

  const token = import.meta.env.VITE_META_ADS_ACCESS_TOKEN;
  const accountId = import.meta.env.VITE_META_ADS_ACCOUNT_ID;

  useEffect(() => {
    async function loadDemographics() {
      try {
        setLoading(true);
        setError(null);
        
        const [ageResponse, genderResponse, platformResponse] = await Promise.all([
          fetchAgeBreakdown(token, accountId, datePreset),
          fetchGenderBreakdown(token, accountId, datePreset),
          fetchPlatformBreakdown(token, accountId, datePreset)
        ]);

        setAgeData(ageResponse.data);
        setGenderData(genderResponse.data);
        setPlatformData(platformResponse.data);
      } catch (err) {
        setError('Failed to load demographic data');
      } finally {
        setLoading(false);
      }
    }

    loadDemographics();
  }, [datePreset]);

  if (loading) return <div>Loading demographics...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Demographic Insights</h1>
        <DateRangeSelect value={datePreset} onChange={setDatePreset} />
      </div>

      <DemographicCharts 
        ageData={ageData}
        genderData={genderData}
        platformData={platformData}
      />
    </div>
  );
}