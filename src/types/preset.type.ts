import type { TimeRange } from '@/types/common.type';
import type { DataTypes } from '@/types/data.type';

export type Preset = {
  id: string;
  name: string;
  description: string;
  data_types: Partial<DataTypes>;
  time_range: TimeRange;
};

export type DataTypeInfo = {
  key: keyof DataTypes;
  label: string;
  description: string;
  icon: string;
};
