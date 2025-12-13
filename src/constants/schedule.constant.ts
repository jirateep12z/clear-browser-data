import type { ScheduleFrequency } from '@/types/common.type';

export const SCHEDULE_FREQUENCY_OPTIONS: {
  value: ScheduleFrequency;
  label: string;
}[] = [
  { value: 'disabled', label: 'Disabled' },
  { value: 'custom_minutes', label: 'Every X minutes' },
  { value: 'custom_hours', label: 'Every X hours' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }
];
