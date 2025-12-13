import type { TimeRange } from '@/types/common.type';
import type { DataTypes } from '@/types/data.interface.type';
import type { Settings } from '@/types/settings.interface.type';

export interface ClearDataMessage {
  action: 'clear-data';
  data_types: DataTypes;
  time_range: TimeRange;
}

export interface GetSettingsMessage {
  action: 'get-settings';
}

export interface SaveSettingsMessage {
  action: 'save-settings';
  settings: Settings;
}

export interface GetStatisticsMessage {
  action: 'get-statistics';
}

export interface ClearResult {
  success: boolean;
  error?: string;
}
