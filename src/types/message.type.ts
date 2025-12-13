import type { TimeRange } from '@/types/common.type';
import type { DataTypes } from '@/types/data.type';
import type { Settings } from '@/types/settings.type';

export type ClearDataMessage = {
  action: 'clear-data';
  data_types: DataTypes;
  time_range: TimeRange;
};

export type GetSettingsMessage = {
  action: 'get-settings';
};

export type SaveSettingsMessage = {
  action: 'save-settings';
  settings: Settings;
};

export type GetStatisticsMessage = {
  action: 'get-statistics';
};

export type ClearResult = {
  success: boolean;
  error?: string;
};
