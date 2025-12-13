import { DEFAULT_SETTINGS } from '@/constants';
import type { BackgroundMessage, Settings } from '@/types';
import { ClearBrowserData } from './browsing-data.service';
import { ShowNotification } from './notification.service';
import { SetupScheduledCleanup } from './schedule.service';
import { ClearSiteData } from './site-data.service';
import { UpdateStatistics } from './statistics.service';
import { AddToWhitelist, RemoveFromWhitelist } from './whitelist.service';

export function HandleMessage(
  message: BackgroundMessage,
  _: chrome.runtime.MessageSender,
  SendResponse: (response: unknown) => void
): boolean {
  if (message.action === 'clear-data') {
    chrome.storage.sync.get('settings').then(async data => {
      const whitelist = (data.settings as Settings)?.whitelist_domains || [];
      const result = await ClearBrowserData(
        message.data_types,
        message.time_range,
        whitelist
      );
      if (result.success) {
        await UpdateStatistics(message.data_types);
        await ShowNotification(true, message.data_types);
      } else {
        await ShowNotification(false, message.data_types);
      }
      SendResponse(result);
    });
    return true;
  }
  if (message.action === 'get-settings') {
    chrome.storage.sync.get('settings').then(data => {
      const settings = (data.settings as Settings) || DEFAULT_SETTINGS;
      if (!settings.schedule) {
        settings.schedule = DEFAULT_SETTINGS.schedule;
      }
      SendResponse(settings);
    });
    return true;
  }
  if (message.action === 'save-settings') {
    chrome.storage.sync.set({ settings: message.settings }).then(() => {
      if (message.settings.schedule) {
        SetupScheduledCleanup(message.settings.schedule);
      }
      SendResponse({ success: true });
    });
    return true;
  }
  if (message.action === 'get-statistics') {
    chrome.storage.sync.get('settings').then(data => {
      SendResponse(
        (data.settings as Settings)?.statistics || DEFAULT_SETTINGS.statistics
      );
    });
    return true;
  }
  if (message.action === 'add-to-whitelist') {
    AddToWhitelist(message.domain).then(() => {
      SendResponse({ success: true });
    });
    return true;
  }
  if (message.action === 'remove-from-whitelist') {
    RemoveFromWhitelist(message.domain).then(() => {
      SendResponse({ success: true });
    });
    return true;
  }
  if (message.action === 'clear-site-data') {
    ClearSiteData(message.domain).then(() => {
      SendResponse({ success: true });
    });
    return true;
  }
  return false;
}
