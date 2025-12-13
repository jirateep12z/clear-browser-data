import { ClearButton } from '@/components/clear-button';
import { DataTypesPanel } from '@/components/data-types-panel';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { PresetCard } from '@/components/preset-card';
import { SchedulePanel } from '@/components/schedule-panel';
import { SettingsPanel } from '@/components/settings-panel';
import { StatisticsCard } from '@/components/statistics-card';
import { TimeRangeSelect } from '@/components/time-range-select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WhitelistPanel } from '@/components/whitelist-panel';
import { UseChromeStorage } from '@/hooks/use-chrome-storage';
import { UseTheme } from '@/hooks/use-theme';
import type { DataTypes, ScheduleConfig, Theme, TimeRange } from '@/types';
import { BarChart3, Settings, Shield, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

function App() {
  const {
    settings,
    is_loading,
    is_clearing,
    SaveSettings,
    ToggleDataType,
    SelectAllDataTypes,
    UpdateTimeRange,
    ClearBrowserData,
    AddToWhitelist,
    RemoveFromWhitelist,
    UpdateSchedule
  } = UseChromeStorage();

  const { ChangeTheme } = UseTheme();

  useEffect(() => {
    ChangeTheme(settings.theme);
  }, [settings.theme, ChangeTheme]);

  const HandleApplyPreset = (
    data_types: Partial<DataTypes>,
    time_range: TimeRange
  ) => {
    const new_data_types: DataTypes = {
      cache: false,
      cookies: false,
      history: false,
      downloads: false,
      form_data: false,
      passwords: false,
      local_storage: false,
      indexed_db: false,
      service_workers: false,
      file_systems: false,
      plugin_data: false,
      web_sql: false,
      ...data_types
    };
    SaveSettings({ ...settings, data_types: new_data_types, time_range });
  };

  const HandleThemeChange = (theme: Theme) => {
    SaveSettings({ ...settings, theme });
    ChangeTheme(theme);
  };

  const HandleNotificationsChange = (value: boolean) => {
    SaveSettings({ ...settings, show_notifications: value });
  };

  const HandleIconsChange = (value: boolean) => {
    SaveSettings({ ...settings, show_data_type_icons: value });
  };

  const HandleConfirmChange = (value: boolean) => {
    SaveSettings({ ...settings, confirm_before_clear: value });
  };

  const HandleClearOnStartupChange = (value: boolean) => {
    SaveSettings({ ...settings, clear_on_startup: value });
  };

  const HandleScheduleChange = (schedule: ScheduleConfig) => {
    UpdateSchedule(schedule);
  };

  if (is_loading) {
    return (
      <div className="flex h-[600px] w-[420px] items-center justify-center bg-neutral-100 dark:bg-neutral-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[600px] w-[420px] bg-neutral-100 p-4 dark:bg-neutral-950">
      <Header />
      <Tabs defaultValue="clear" className="mt-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="clear" className="text-xs">
            <Trash2 className="mr-1 h-3.5 w-3.5" />
            Clear
          </TabsTrigger>
          <TabsTrigger value="protect" className="text-xs">
            <Shield className="mr-1 h-3.5 w-3.5" />
            Protect
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs">
            <Settings className="mr-1 h-3.5 w-3.5" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="stats" className="text-xs">
            <BarChart3 className="mr-1 h-3.5 w-3.5" />
            Stats
          </TabsTrigger>
        </TabsList>
        <TabsContent value="clear" className="mt-4 space-y-4">
          <DataTypesPanel
            data_types={settings.data_types}
            show_icons={settings.show_data_type_icons}
            OnToggle={ToggleDataType}
            OnSelectAll={SelectAllDataTypes}
          />
          <TimeRangeSelect
            value={settings.time_range}
            OnChange={UpdateTimeRange}
          />
          <Separator />
          <ClearButton
            data_types={settings.data_types}
            is_clearing={is_clearing}
            confirm_before_clear={settings.confirm_before_clear}
            OnClear={ClearBrowserData}
          />
        </TabsContent>
        <TabsContent value="protect" className="mt-4 space-y-4">
          <WhitelistPanel
            whitelist_domains={settings.whitelist_domains || []}
            OnAddDomain={AddToWhitelist}
            OnRemoveDomain={RemoveFromWhitelist}
          />
          <SchedulePanel
            schedule={
              settings.schedule || {
                enabled: false,
                frequency: 'disabled',
                custom_interval: 30,
                time: '00:00',
                day_of_week: 0,
                day_of_month: 1,
                last_run: null,
                next_run: null
              }
            }
            OnScheduleChange={HandleScheduleChange}
          />
        </TabsContent>
        <TabsContent value="settings" className="mt-4 space-y-4">
          <SettingsPanel
            theme={settings.theme}
            show_notifications={settings.show_notifications}
            show_data_type_icons={settings.show_data_type_icons}
            confirm_before_clear={settings.confirm_before_clear}
            clear_on_startup={settings.clear_on_startup}
            OnThemeChange={HandleThemeChange}
            OnNotificationsChange={HandleNotificationsChange}
            OnIconsChange={HandleIconsChange}
            OnConfirmChange={HandleConfirmChange}
            OnClearOnStartupChange={HandleClearOnStartupChange}
          />
          <PresetCard OnApplyPreset={HandleApplyPreset} />
        </TabsContent>
        <TabsContent value="stats" className="mt-4">
          <StatisticsCard statistics={settings.statistics} />
        </TabsContent>
      </Tabs>
      <Footer />
    </div>
  );
}

export default App;
