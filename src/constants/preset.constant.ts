import type { Preset } from '@/types';

export const DEFAULT_PRESETS: Preset[] = [
  {
    id: 'quick-clean',
    name: 'Quick Clean',
    description: 'Clear cache and cookies only',
    data_types: { cache: true, cookies: true },
    time_range: 'all'
  },
  {
    id: 'privacy-clean',
    name: 'Privacy Clean',
    description: 'Clear history, cookies, and form data',
    data_types: { history: true, cookies: true, form_data: true },
    time_range: 'all'
  },
  {
    id: 'developer-clean',
    name: 'Developer Clean',
    description: 'Clear cache, local storage, and service workers',
    data_types: {
      cache: true,
      local_storage: true,
      service_workers: true,
      indexed_db: true
    },
    time_range: 'all'
  },
  {
    id: 'full-clean',
    name: 'Full Clean',
    description: 'Clear everything except passwords',
    data_types: {
      cache: true,
      cookies: true,
      history: true,
      downloads: true,
      form_data: true,
      local_storage: true,
      indexed_db: true,
      service_workers: true,
      file_systems: true,
      plugin_data: true,
      web_sql: true
    },
    time_range: 'all'
  }
];
