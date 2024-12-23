export interface DemographicData {
  age: string;
  gender: string;
  device_platform: string;
  spend: number;
  actions: Array<{
    action_type: string;
    value: number;
  }>;
  action_values: Array<{
    action_type: string;
    value: number;
  }>;
}

export interface DemographicBreakdown {
  data: DemographicData[];
}