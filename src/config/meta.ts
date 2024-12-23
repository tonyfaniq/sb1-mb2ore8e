export const META_CONFIG = {
  baseUrl: 'https://graph.facebook.com/v18.0',
  appId: '966242223397117',
  getFields: (datePreset: string) => ({
    campaigns: `id,name,status,insights.date_preset(${datePreset}){spend,impressions,clicks,actions,action_values}`,
    adSets: `id,name,status,campaign_id,insights.date_preset(${datePreset}){spend,impressions,clicks,actions,action_values}`,
    ads: `id,name,status,adset_id,creative{id,video_id,object_story_spec{video_data{video_id}}},insights.date_preset(${datePreset}){spend,impressions,clicks,actions,action_values}`
  })
} as const;