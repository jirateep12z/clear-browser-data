import type { Settings } from '@/types';

export const STARTUP_ALARM_NAME = 'startup-cleanup-check';
export const STARTUP_CHECK_KEY = 'startup_cleanup_executed';
export const ALARM_NAME = 'scheduled-cleanup';

export const NOTIFICATION_ICON_PATH = 'icons/clear_browser_data.png';

export const TIME_RANGE_MS = {
  '1hour': 60 * 60 * 1000,
  '24hours': 24 * 60 * 60 * 1000,
  '7days': 7 * 24 * 60 * 60 * 1000,
  '4weeks': 4 * 7 * 24 * 60 * 60 * 1000,
  all: 0
} as const;

export const SCHEDULE_PERIOD_MINUTES = {
  daily: 24 * 60,
  weekly: 7 * 24 * 60,
  monthly: 30 * 24 * 60
} as const;

export const DEFAULT_SETTINGS: Settings = {
  data_types: {
    cache: true,
    cookies: true,
    history: false,
    downloads: false,
    form_data: false,
    passwords: false,
    local_storage: false,
    indexed_db: false,
    service_workers: false,
    file_systems: false,
    plugin_data: false,
    web_sql: false
  },
  time_range: 'all',
  theme: 'system',
  show_notifications: true,
  show_data_type_icons: true,
  confirm_before_clear: true,
  clear_on_startup: false,
  whitelist_domains: [],
  schedule: {
    enabled: false,
    frequency: 'disabled',
    custom_interval: 30,
    time: '00:00',
    day_of_week: 0,
    day_of_month: 1,
    last_run: null,
    next_run: null
  },
  statistics: {
    total_clears: 0,
    last_clear_date: null,
    data_types_cleared: {}
  }
};
