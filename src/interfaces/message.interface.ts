import type { DataTypes } from '@/interfaces/data.interface';
import type { Settings } from '@/interfaces/settings.interface';
import type { TimeRange } from '@/types/common.type';

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
