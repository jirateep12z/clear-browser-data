import type {
  ClearDataMessage,
  GetSettingsMessage,
  GetStatisticsMessage,
  SaveSettingsMessage
} from '@/types/message.interface.type';

export type TimeRange = '1hour' | '24hours' | '7days' | '4weeks' | 'all';

export type Theme = 'light' | 'dark' | 'system';

export type ScheduleFrequency =
  | 'disabled'
  | 'custom_minutes'
  | 'custom_hours'
  | 'daily'
  | 'weekly'
  | 'monthly';

export type ChromeMessage =
  | ClearDataMessage
  | GetSettingsMessage
  | SaveSettingsMessage
  | GetStatisticsMessage;
