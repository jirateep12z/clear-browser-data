import { DEFAULT_SETTINGS } from '@/constants';
import type {
  ClearResult,
  DataTypes,
  ScheduleConfig,
  Settings,
  TimeRange
} from '@/types';
import { useCallback, useEffect, useState } from 'react';

function IsChromeExtension(): boolean {
  return typeof chrome !== 'undefined' && chrome.runtime && !!chrome.runtime.id;
}

export function UseChromeStorage() {
  const [settings, set_settings] = useState<Settings>(DEFAULT_SETTINGS);
  const [is_loading, set_is_loading] = useState(true);
  const [is_clearing, set_is_clearing] = useState(false);

  const LoadSettings = useCallback(async () => {
    set_is_loading(true);
    try {
      if (IsChromeExtension()) {
        const response = await chrome.runtime.sendMessage({
          action: 'get-settings'
        });
        set_settings(response || DEFAULT_SETTINGS);
      } else {
        const stored = localStorage.getItem('clear_browser_data_settings');
        if (stored) {
          set_settings(JSON.parse(stored));
        }
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      set_is_loading(false);
    }
  }, []);

  const SaveSettings = useCallback(async (new_settings: Settings) => {
    try {
      if (IsChromeExtension()) {
        await chrome.runtime.sendMessage({
          action: 'save-settings',
          settings: new_settings
        });
      } else {
        localStorage.setItem(
          'clear_browser_data_settings',
          JSON.stringify(new_settings)
        );
      }
      set_settings(new_settings);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, []);

  const UpdateDataTypes = useCallback(
    (data_types: DataTypes) => {
      const new_settings = { ...settings, data_types };
      SaveSettings(new_settings);
    },
    [settings, SaveSettings]
  );

  const UpdateTimeRange = useCallback(
    (time_range: TimeRange) => {
      const new_settings = { ...settings, time_range };
      SaveSettings(new_settings);
    },
    [settings, SaveSettings]
  );

  const ToggleDataType = useCallback(
    (key: keyof DataTypes) => {
      const new_data_types = {
        ...settings.data_types,
        [key]: !settings.data_types[key]
      };
      UpdateDataTypes(new_data_types);
    },
    [settings.data_types, UpdateDataTypes]
  );

  const SelectAllDataTypes = useCallback(
    (selected: boolean) => {
      const new_data_types: DataTypes = Object.keys(settings.data_types).reduce(
        (acc, key) => {
          acc[key as keyof DataTypes] = selected;
          return acc;
        },
        {} as DataTypes
      );
      UpdateDataTypes(new_data_types);
    },
    [settings.data_types, UpdateDataTypes]
  );

  const ClearBrowserData = useCallback(async (): Promise<ClearResult> => {
    set_is_clearing(true);
    try {
      if (IsChromeExtension()) {
        const result = await chrome.runtime.sendMessage({
          action: 'clear-data',
          data_types: settings.data_types,
          time_range: settings.time_range
        });
        return result;
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: (error as Error).message };
    } finally {
      set_is_clearing(false);
    }
  }, [settings.data_types, settings.time_range]);

  const AddToWhitelist = useCallback(
    (domain: string) => {
      if (!settings.whitelist_domains.includes(domain)) {
        const new_settings = {
          ...settings,
          whitelist_domains: [...settings.whitelist_domains, domain]
        };
        SaveSettings(new_settings);
      }
    },
    [settings, SaveSettings]
  );

  const RemoveFromWhitelist = useCallback(
    (domain: string) => {
      const new_settings = {
        ...settings,
        whitelist_domains: settings.whitelist_domains.filter(d => d !== domain)
      };
      SaveSettings(new_settings);
    },
    [settings, SaveSettings]
  );

  const UpdateSchedule = useCallback(
    (schedule: ScheduleConfig) => {
      const new_settings = { ...settings, schedule };
      SaveSettings(new_settings);
    },
    [settings, SaveSettings]
  );

  useEffect(() => {
    LoadSettings();
  }, [LoadSettings]);

  useEffect(() => {
    if (!IsChromeExtension()) return;
    const HandleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      area_name: string
    ) => {
      if (area_name === 'sync' && changes.settings) {
        set_settings(changes.settings.newValue as Settings);
      }
    };
    chrome.storage.onChanged.addListener(HandleStorageChange);
    return () => {
      chrome.storage.onChanged.removeListener(HandleStorageChange);
    };
  }, []);

  return {
    settings,
    is_loading,
    is_clearing,
    SaveSettings,
    UpdateDataTypes,
    UpdateTimeRange,
    ToggleDataType,
    SelectAllDataTypes,
    ClearBrowserData,
    LoadSettings,
    AddToWhitelist,
    RemoveFromWhitelist,
    UpdateSchedule
  };
}
