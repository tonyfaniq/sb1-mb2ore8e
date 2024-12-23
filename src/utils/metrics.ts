import type { Action, ActionValue } from '../types/meta';

export function getPurchaseCount(actions: Action[] = []): number {
  return actions?.find(a => a.action_type === 'purchase')?.value ?? 0;
}

export function getPurchaseValue(actionValues: ActionValue[] = []): number {
  return actionValues?.find(a => a.action_type === 'purchase')?.value ?? 0;
}