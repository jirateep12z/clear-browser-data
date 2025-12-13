import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { SCHEDULE_FREQUENCY_OPTIONS } from '@/constants';
import type { ScheduleFrequency, SchedulePanelProps } from '@/types';
import { Calendar, CheckCircle2, Clock, Timer } from 'lucide-react';

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' }
];

export function SchedulePanel({
  schedule,
  OnScheduleChange
}: SchedulePanelProps) {
  const HandleEnabledChange = (enabled: boolean) => {
    OnScheduleChange({ ...schedule, enabled });
  };

  const HandleFrequencyChange = (frequency: ScheduleFrequency) => {
    OnScheduleChange({
      ...schedule,
      frequency,
      enabled: frequency !== 'disabled'
    });
  };

  const HandleTimeChange = (time: string) => {
    OnScheduleChange({ ...schedule, time });
  };

  const HandleDayOfWeekChange = (day: string) => {
    OnScheduleChange({ ...schedule, day_of_week: parseInt(day) });
  };

  const HandleDayOfMonthChange = (day: string) => {
    OnScheduleChange({ ...schedule, day_of_month: parseInt(day) });
  };

  const HandleCustomIntervalChange = (interval: string) => {
    OnScheduleChange({
      ...schedule,
      custom_interval: parseInt(interval) || 1
    });
  };

  const FormatLastRun = (date_string: string | null): string => {
    if (!date_string) return 'Never';
    const date = new Date(date_string);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const GetNextRunText = (): string => {
    if (!schedule.enabled || schedule.frequency === 'disabled') {
      return 'Disabled';
    }
    switch (schedule.frequency) {
      case 'custom_minutes':
        return `Every ${schedule.custom_interval} minutes`;
      case 'custom_hours':
        return `Every ${schedule.custom_interval} hours`;
      case 'daily':
        return `Daily at ${schedule.time}`;
      case 'weekly':
        return `${DAYS_OF_WEEK[schedule.day_of_week]?.label} at ${
          schedule.time
        }`;
      case 'monthly':
        return `Day ${schedule.day_of_month} at ${schedule.time}`;
      default:
        return 'Not scheduled';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Timer className="h-4 w-4" />
            Scheduled Cleanup
          </CardTitle>
          <Switch
            checked={schedule.enabled && schedule.frequency !== 'disabled'}
            onCheckedChange={HandleEnabledChange}
          />
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4" />
            Frequency
          </Label>
          <Select
            value={schedule.frequency}
            OnValueChange={v => HandleFrequencyChange(v as ScheduleFrequency)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              {SCHEDULE_FREQUENCY_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {(schedule.frequency === 'custom_minutes' ||
          schedule.frequency === 'custom_hours') && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {schedule.frequency === 'custom_minutes' ? 'Minutes' : 'Hours'}
            </Label>
            <input
              type="number"
              min={schedule.frequency === 'custom_minutes' ? 1 : 1}
              max={schedule.frequency === 'custom_minutes' ? 1440 : 24}
              value={
                schedule.custom_interval ||
                (schedule.frequency === 'custom_minutes' ? 30 : 1)
              }
              onChange={e => HandleCustomIntervalChange(e.target.value)}
              className="focus:ring-ring w-full rounded-md border bg-neutral-50 px-3 py-2 text-sm focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
              placeholder={
                schedule.frequency === 'custom_minutes'
                  ? 'Enter minutes'
                  : 'Enter hours'
              }
            />
          </div>
        )}
        {schedule.frequency !== 'disabled' &&
          schedule.frequency !== 'custom_minutes' &&
          schedule.frequency !== 'custom_hours' && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Time</Label>
              <input
                type="time"
                value={schedule.time}
                onChange={e => HandleTimeChange(e.target.value)}
                className="focus:ring-ring w-full rounded-md border bg-neutral-50 px-3 py-2 text-sm focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
              />
            </div>
          )}
        {schedule.frequency === 'weekly' && (
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Day of Week
            </Label>
            <Select
              value={schedule.day_of_week.toString()}
              OnValueChange={HandleDayOfWeekChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {DAYS_OF_WEEK.map(day => (
                  <SelectItem key={day.value} value={day.value.toString()}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {schedule.frequency === 'monthly' && (
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Day of Month
            </Label>
            <Select
              value={schedule.day_of_month.toString()}
              OnValueChange={HandleDayOfMonthChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                  <SelectItem key={day} value={day.toString()}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <Separator />
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Next run:</span>
            <Badge variant={schedule.enabled ? 'default' : 'secondary'}>
              {GetNextRunText()}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last run:</span>
            <span className="flex items-center gap-1">
              {schedule.last_run && (
                <CheckCircle2 className="h-3 w-3 text-green-500" />
              )}
              {FormatLastRun(schedule.last_run)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
