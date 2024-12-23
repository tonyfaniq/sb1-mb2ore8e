import type { Campaign, AdSet, Ad } from '../types/meta';
import { getPurchaseCount, getPurchaseValue } from './metrics';

export type SortField = 'name' | 'spend' | 'impressions' | 'clicks' | 'purchases' | 'revenue' | 'roas';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

function getMetricValue(item: Campaign | AdSet | Ad, field: SortField): number {
  const metrics = item.insights?.data?.[0] ?? {
    spend: 0,
    impressions: 0,
    clicks: 0,
    actions: [],
    action_values: []
  };

  switch (field) {
    case 'spend':
      return metrics.spend;
    case 'impressions':
      return metrics.impressions;
    case 'clicks':
      return metrics.clicks;
    case 'purchases':
      return getPurchaseCount(metrics.actions);
    case 'revenue':
      return getPurchaseValue(metrics.action_values);
    case 'roas':
      const revenue = getPurchaseValue(metrics.action_values);
      return metrics.spend > 0 ? revenue / metrics.spend : 0;
    default:
      return 0;
  }
}

export function sortItems<T extends Campaign | AdSet | Ad>(
  items: T[],
  { field, direction }: SortConfig
): T[] {
  return [...items].sort((a, b) => {
    let comparison: number;

    if (field === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else {
      const aValue = getMetricValue(a, field);
      const bValue = getMetricValue(b, field);
      comparison = aValue - bValue;
    }

    return direction === 'asc' ? comparison : -comparison;
  });
}