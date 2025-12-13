import type { CommandType, Settings } from '@/types';
import { ClearBrowserData } from './browsing-data.service';
import { ShowNotification } from './notification.service';
import { UpdateStatistics } from './statistics.service';

export async function HandleCommand(command: string): Promise<void> {
  const { settings } = (await chrome.storage.sync.get('settings')) as {
    settings: Settings;
  };
  const whitelist = settings.whitelist_domains || [];
  if ((command as CommandType) === 'clear-selected') {
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
}
