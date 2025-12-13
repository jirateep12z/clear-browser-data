import type { ScheduleFrequency, Theme, TimeRange } from '@/types/common.type';
import type { DataTypes } from '@/types/data.interface.type';

export interface Statistics {
  total_clears: number;
  last_clear_date: string | null;
  data_types_cleared: Record<string, number>;
}

export interface ScheduleConfig {
  enabled: boolean;
  frequency: ScheduleFrequency;
  custom_interval: number;
  time: string;
  day_of_week: number;
  day_of_month: number;
  last_run: string | null;
  next_run: string | null;
}

export interface Settings {
  data_types: DataTypes;
  time_range: TimeRange;
  theme: Theme;
  show_notifications: boolean;
  show_data_type_icons: boolean;
  confirm_before_clear: boolean;
  clear_on_startup: boolean;
  whitelist_domains: string[];
  schedule: ScheduleConfig;
  statistics: Statistics;
}
