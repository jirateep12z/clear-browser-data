import { NOTIFICATION_ICON_PATH } from '@/constants';
import type { DataTypes, Settings } from '@/types';

export async function ShowNotification(
  success: boolean,
  data_types: DataTypes,
  custom_message: string | null = null
): Promise<void> {
  const { settings } = (await chrome.storage.sync.get('settings')) as {
    settings: Settings;
  };
  if (!settings.show_notifications) return;
  let message: string;
  if (custom_message) {
    message = custom_message;
  } else {
    const cleared_types = Object.entries(data_types)
      .filter(([, value]) => value)
      .map(([key]) => key.replace(/_/g, ' '))
      .join(', ');
    message = success
      ? `Cleared: ${cleared_types}`
      : 'Failed to clear browser data. Please try again.';
  }
  chrome.notifications.create({
    type: 'basic',
    iconUrl: NOTIFICATION_ICON_PATH,
    title: success ? 'Data Cleared Successfully' : 'Clear Failed',
    message,
    priority: 1
  });
}
