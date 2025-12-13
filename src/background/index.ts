import { ALARM_NAME, DEFAULT_SETTINGS, STARTUP_ALARM_NAME } from '@/constants';
import type { ContextMenuId, Settings } from '@/types';
import {
  AddToWhitelist,
  ClearSiteCache,
  ClearSiteCookies,
  ClearSiteData,
  CreateContextMenus,
  HandleCommand,
  HandleMessage,
  HandleStartupCleanup,
  RemoveFromWhitelist,
  RunScheduledCleanup,
  SetupScheduledCleanup
} from './services';

chrome.runtime.onInstalled.addListener(async () => {
  const stored = (await chrome.storage.sync.get('settings')) as {
    settings?: Settings;
  };
  if (!stored.settings) {
    await chrome.storage.sync.set({ settings: DEFAULT_SETTINGS });
  } else {
    if (!stored.settings.schedule) {
      stored.settings.schedule = DEFAULT_SETTINGS.schedule;
      await chrome.storage.sync.set({ settings: stored.settings });
    }
    if (stored.settings.clear_on_startup === undefined) {
      stored.settings.clear_on_startup = DEFAULT_SETTINGS.clear_on_startup;
      await chrome.storage.sync.set({ settings: stored.settings });
    }
  }
  CreateContextMenus();
  const { settings } = (await chrome.storage.sync.get('settings')) as {
    settings: Settings;
  };
  if (settings.schedule?.enabled) {
    SetupScheduledCleanup(settings.schedule);
  }
});

chrome.runtime.onStartup.addListener(async () => {
  chrome.alarms.create(STARTUP_ALARM_NAME, {
    delayInMinutes: 0.1
  });
  await HandleStartupCleanup();
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.url) return;
  const url = new URL(tab.url);
  const domain = url.hostname;
  switch (info.menuItemId as ContextMenuId) {
    case 'clear-site-data':
      await ClearSiteData(domain);
      break;
    case 'clear-site-cookies':
      await ClearSiteCookies(domain);
      break;
    case 'clear-site-cache':
      await ClearSiteCache(domain);
      break;
    case 'add-to-whitelist':
      await AddToWhitelist(domain);
      break;
    case 'remove-from-whitelist':
      await RemoveFromWhitelist(domain);
      break;
  }
});

chrome.alarms.onAlarm.addListener(async alarm => {
  console.log('[Alarm Triggered]', alarm.name, 'at', new Date().toISOString());
  if (alarm.name === ALARM_NAME) {
    console.log('[Scheduled Cleanup] Running scheduled cleanup...');
    await RunScheduledCleanup();
  }
  if (alarm.name === STARTUP_ALARM_NAME) {
    await HandleStartupCleanup();
    chrome.alarms.clear(STARTUP_ALARM_NAME);
  }
});

chrome.runtime.onMessage.addListener(HandleMessage);

chrome.commands.onCommand.addListener(HandleCommand);
