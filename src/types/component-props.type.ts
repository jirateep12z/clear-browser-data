import type { Theme, TimeRange } from '@/types/common.type';
import type { DataTypes } from '@/types/data.type';
import type { ClearResult } from '@/types/message.type';
import type { DataTypeInfo } from '@/types/preset.type';
import type { ScheduleConfig, Statistics } from '@/types/settings.type';

export type ClearButtonProps = {
  data_types: DataTypes;
  is_clearing: boolean;
  confirm_before_clear: boolean;
  OnClear: () => Promise<ClearResult>;
};

export type DataTypeItemProps = {
  info: DataTypeInfo;
  is_checked: boolean;
  show_icon: boolean;
  OnToggle: (key: keyof DataTypes) => void;
};

export type DataTypesPanelProps = {
  data_types: DataTypes;
  show_icons: boolean;
  OnToggle: (key: keyof DataTypes) => void;
  OnSelectAll: (selected: boolean) => void;
};

export type PresetCardProps = {
  OnApplyPreset: (
    data_types: Partial<DataTypes>,
    time_range: TimeRange
  ) => void;
};

export type SchedulePanelProps = {
  schedule: ScheduleConfig;
  OnScheduleChange: (schedule: ScheduleConfig) => void;
};

export type SettingsPanelProps = {
  theme: Theme;
  show_notifications: boolean;
  show_data_type_icons: boolean;
  confirm_before_clear: boolean;
  clear_on_startup: boolean;
  OnThemeChange: (theme: Theme) => void;
  OnNotificationsChange: (value: boolean) => void;
  OnIconsChange: (value: boolean) => void;
  OnConfirmChange: (value: boolean) => void;
  OnClearOnStartupChange: (value: boolean) => void;
};

export type StatisticsCardProps = {
  statistics: Statistics;
};

export type TimeRangeSelectProps = {
  value: TimeRange;
  OnChange: (value: TimeRange) => void;
};

export type WhitelistPanelProps = {
  whitelist_domains: string[];
  OnAddDomain: (domain: string) => void;
  OnRemoveDomain: (domain: string) => void;
};
