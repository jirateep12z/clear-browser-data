import type { DataTypes, Settings } from '@/interfaces';
import type { CommandType } from '@/types';
import { ClearBrowserData } from './browsing-data.service';
import { ShowNotification } from './notification.service';
import { UpdateStatistics } from './statistics.service';

export async function HandleCommand(command: string): Promise<void> {
  const { settings } = (await chrome.storage.sync.get('settings')) as {
    settings: Settings;
  };
  const whitelist = settings.whitelist_domains || [];
  if ((command as CommandType) === 'clear-all') {
    const result = await ClearBrowserData(
      settings.data_types,
      settings.time_range,
      whitelist
    );
    if (result.success) {
      await UpdateStatistics(settings.data_types);
      await ShowNotification(true, settings.data_types);
    }
  }
  if ((command as CommandType) === 'clear-cache') {
    const cache_only = { cache: true } as unknown as DataTypes;
    const result = await ClearBrowserData(cache_only, 'all', whitelist);
    if (result.success) {
      await UpdateStatistics(cache_only);
      await ShowNotification(true, cache_only);
    }
  }
}
