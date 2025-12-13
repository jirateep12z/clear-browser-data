import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { TIME_RANGE_OPTIONS } from '@/constants';
import type { TimeRange, TimeRangeSelectProps } from '@/types';
import { Clock } from 'lucide-react';

export function TimeRangeSelect({ value, OnChange }: TimeRangeSelectProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <Clock className="h-4 w-4" />
        Time Range
      </Label>
      <Select value={value} OnValueChange={v => OnChange(v as TimeRange)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          {TIME_RANGE_OPTIONS.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
