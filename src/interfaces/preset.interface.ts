import type { DataTypes } from '@/interfaces/data.interface';
import type { TimeRange } from '@/types/common.type';

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
