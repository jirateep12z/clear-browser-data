import type { TimeRange } from '@/types/common.type';
import type { DataTypes } from '@/types/data.interface.type';

export interface Preset {
  id: string;
  name: string;
  description: string;
  data_types: Partial<DataTypes>;
  time_range: TimeRange;
}

export interface DataTypeInfo {
  key: keyof DataTypes;
  label: string;
  description: string;
  icon: string;
}
