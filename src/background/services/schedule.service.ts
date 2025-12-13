import {
  ALARM_NAME,
  SCHEDULE_PERIOD_MINUTES,
  STARTUP_CHECK_KEY
} from '@/constants';
import type { ScheduleConfig, Settings } from '@/types';
import { ClearBrowserData } from './browsing-data.service';
import { ShowNotification } from './notification.service';
import { UpdateStatistics } from './statistics.service';

export function SetupScheduledCleanup(schedule: ScheduleConfig): void {
  console.log('[Scheduled Cleanup] Setting up with:', schedule);
  chrome.alarms.clear(ALARM_NAME);
  if (!schedule.enabled || schedule.frequency === 'disabled') {
    console.log('[Scheduled Cleanup] Disabled, clearing alarm');
    return;
  }
  let period_in_minutes: number;
  switch (schedule.frequency) {
    case 'custom_minutes':
      period_in_minutes = schedule.custom_interval || 30;
      break;
    case 'custom_hours':
      period_in_minutes = (schedule.custom_interval || 1) * 60;
      break;
    case 'daily':
      period_in_minutes = SCHEDULE_PERIOD_MINUTES.daily;
      break;
    case 'weekly':
      period_in_minutes = SCHEDULE_PERIOD_MINUTES.weekly;
      break;
    case 'monthly':
      period_in_minutes = SCHEDULE_PERIOD_MINUTES.monthly;
      break;
    default:
      return;
  }
  console.log(
    '[Scheduled Cleanup] Creating alarm with period:',
    period_in_minutes,
    'minutes'
  );
  chrome.alarms.create(ALARM_NAME, {
    delayInMinutes: 0.5,
    periodInMinutes: period_in_minutes
  });
  chrome.alarms.get(ALARM_NAME, alarm => {
    console.log('[Scheduled Cleanup] Alarm created:', alarm);
  });
}

export async function RunScheduledCleanup(): Promise<void> {
  console.log('[RunScheduledCleanup] Starting...');
  const { settings } = (await chrome.storage.sync.get('settings')) as {
    settings: Settings;
  };
  console.log('[RunScheduledCleanup] Settings loaded:', settings.schedule);
  if (!settings.schedule?.enabled) {
    console.log('[RunScheduledCleanup] Schedule is disabled, skipping');
    return;
  }
  console.log(
    '[RunScheduledCleanup] Clearing data with types:',
    settings.data_types
  );
  const result = await ClearBrowserData(
    settings.data_types,
    settings.time_range,
    settings.whitelist_domains
  );
  console.log('[RunScheduledCleanup] ClearBrowserData result:', result);
  if (result.success) {
    await UpdateStatistics(settings.data_types);
    settings.schedule.last_run = new Date().toISOString();
    await chrome.storage.sync.set({ settings });
    console.log(
      '[RunScheduledCleanup] Last run updated to:',
      settings.schedule.last_run
    );
    ShowNotification(true, settings.data_types, 'Scheduled cleanup completed');
  } else {
    console.log('[RunScheduledCleanup] Clear failed:', result.error);
  }
}

export async function HandleStartupCleanup(): Promise<void> {
  try {
    const session_data = await chrome.storage.session.get(STARTUP_CHECK_KEY);
    if (session_data[STARTUP_CHECK_KEY]) {
      return;
    }
    await chrome.storage.session.set({ [STARTUP_CHECK_KEY]: true });
    const { settings } = (await chrome.storage.sync.get('settings')) as {
      settings: Settings;
    };
    if (settings?.clear_on_startup) {
      const whitelist = settings.whitelist_domains || [];
      const result = await ClearBrowserData(
        settings.data_types,
        settings.time_range,
        whitelist
      );
      if (result.success) {
        await UpdateStatistics(settings.data_types);
        ShowNotification(
          true,
          settings.data_types,
          'Browser data cleared on startup'
        );
      }
    }
  } catch (error) {
    console.error('Startup cleanup error:', error);
  }
}
