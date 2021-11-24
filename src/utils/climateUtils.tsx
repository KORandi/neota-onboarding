import { GCM_NAMES } from './constants';

export function getGCMDisplayName(technicalName: string): string {
  const map = new Map(Object.entries(GCM_NAMES));
  if (map.has(technicalName)) {
    return map.get(technicalName) || '';
  }
  return technicalName;
}
