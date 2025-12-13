import type {
  ClearDataMessage,
  GetSettingsMessage,
  GetStatisticsMessage,
  SaveSettingsMessage
} from '@/types/message.type';

export type PreservedCookie = chrome.cookies.Cookie & {
  domain: string;
};

export type WhitelistMessage = {
  action: 'add-to-whitelist' | 'remove-from-whitelist';
  domain: string;
};

export type ClearSiteDataMessage = {
  action: 'clear-site-data';
  domain: string;
};

export type ContextMenuId =
  | 'clear-site-data'
  | 'clear-site-cookies'
  | 'clear-site-cache'
  | 'separator-1'
  | 'add-to-whitelist'
  | 'remove-from-whitelist';

export type CommandType = 'clear-selected';

export type BackgroundMessage =
  | ClearDataMessage
  | GetSettingsMessage
  | SaveSettingsMessage
  | GetStatisticsMessage
  | WhitelistMessage
  | ClearSiteDataMessage;
