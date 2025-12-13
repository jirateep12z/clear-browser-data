import type {
  ClearDataMessage,
  ClearSiteDataMessage,
  GetSettingsMessage,
  GetStatisticsMessage,
  SaveSettingsMessage,
  WhitelistMessage
} from '@/types';

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
