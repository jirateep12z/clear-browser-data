import type { Theme, TimeRange } from '@/types/common.type';
import type { DataTypes } from '@/types/data.interface.type';
import type { ClearResult } from '@/types/message.interface.type';
import type { DataTypeInfo } from '@/types/preset.interface.type';
import type {
  ScheduleConfig,
  Statistics
} from '@/types/settings.interface.type';

export interface ClearButtonProps {
  data_types: DataTypes;
  is_clearing: boolean;
  confirm_before_clear: boolean;
  OnClear: () => Promise<ClearResult>;
}

export interface DataTypeItemProps {
  info: DataTypeInfo;
  is_checked: boolean;
  show_icon: boolean;
  OnToggle: (key: keyof DataTypes) => void;
}

export interface DataTypesPanelProps {
  data_types: DataTypes;
  show_icons: boolean;
  OnToggle: (key: keyof DataTypes) => void;
  OnSelectAll: (selected: boolean) => void;
}

export interface PresetCardProps {
  OnApplyPreset: (
    data_types: Partial<DataTypes>,
    time_range: TimeRange
  ) => void;
}

export interface SchedulePanelProps {
  schedule: ScheduleConfig;
  OnScheduleChange: (schedule: ScheduleConfig) => void;
}

export interface SettingsPanelProps {
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
}

export interface StatisticsCardProps {
  statistics: Statistics;
}

export interface TimeRangeSelectProps {
  value: TimeRange;
  OnChange: (value: TimeRange) => void;
}

export interface WhitelistPanelProps {
  whitelist_domains: string[];
  OnAddDomain: (domain: string) => void;
  OnRemoveDomain: (domain: string) => void;
}
