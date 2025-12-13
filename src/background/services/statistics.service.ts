import type { DataTypes, Settings } from '@/types';

export async function UpdateStatistics(data_types: DataTypes): Promise<void> {
  const { settings } = (await chrome.storage.sync.get('settings')) as {
    settings: Settings;
  };
  settings.statistics.total_clears += 1;
  settings.statistics.last_clear_date = new Date().toISOString();
  Object.keys(data_types).forEach(key => {
    if (data_types[key as keyof DataTypes]) {
      settings.statistics.data_types_cleared[key] =
        (settings.statistics.data_types_cleared[key] || 0) + 1;
    }
  });
  await chrome.storage.sync.set({ settings });
}
