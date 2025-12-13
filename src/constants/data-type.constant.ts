import type { DataTypeInfo } from '@/types';
import type { TimeRange } from '@/types/common.type';

export const DATA_TYPE_INFO: DataTypeInfo[] = [
  {
    key: 'cache',
    label: 'Cached Images & Files',
    description: 'Temporary files stored by your browser',
    icon: 'HardDrive'
  },
  {
    key: 'cookies',
    label: 'Cookies',
    description: 'Website login and preference data',
    icon: 'Cookie'
  },
  {
    key: 'history',
    label: 'Browsing History',
    description: 'List of visited websites',
    icon: 'History'
  },
  {
    key: 'downloads',
    label: 'Download History',
    description: 'List of downloaded files (not the files)',
    icon: 'Download'
  },
  {
    key: 'form_data',
    label: 'Autofill Form Data',
    description: 'Saved form entries and autofill data',
    icon: 'FileText'
  },
  {
    key: 'passwords',
    label: 'Saved Passwords',
    description: 'Stored login credentials',
    icon: 'Key'
  },
  {
    key: 'local_storage',
    label: 'Local Storage',
    description: 'Website data stored locally',
    icon: 'Database'
  },
  {
    key: 'indexed_db',
    label: 'IndexedDB',
    description: 'Client-side database storage',
    icon: 'Layers'
  },
  {
    key: 'service_workers',
    label: 'Service Workers',
    description: 'Background scripts for offline functionality',
    icon: 'Cog'
  },
  {
    key: 'file_systems',
    label: 'File Systems',
    description: 'Website file system access data',
    icon: 'Folder'
  },
  {
    key: 'plugin_data',
    label: 'Plugin Data',
    description: 'Data from browser plugins',
    icon: 'Puzzle'
  },
  {
    key: 'web_sql',
    label: 'Web SQL Data',
    description: 'Legacy web database storage',
    icon: 'Table'
  }
];

export const TIME_RANGE_OPTIONS: { value: TimeRange; label: string }[] = [
  { value: '1hour', label: 'Last hour' },
  { value: '24hours', label: 'Last 24 hours' },
  { value: '7days', label: 'Last 7 days' },
  { value: '4weeks', label: 'Last 4 weeks' },
  { value: 'all', label: 'All time' }
];
