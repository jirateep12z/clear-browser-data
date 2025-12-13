import { TIME_RANGE_MS } from '@/constants';
import type {
  ClearResult,
  DataTypes,
  PreservedCookie,
  TimeRange
} from '@/types';

export function GetTimeRangeMs(time_range: TimeRange): number {
  const now = Date.now();
  const offset = TIME_RANGE_MS[time_range];
  return offset === 0 ? 0 : now - offset;
}

export async function PreserveWhitelistCookies(
  whitelist_domains: string[]
): Promise<PreservedCookie[]> {
  const preserved_cookies: PreservedCookie[] = [];
  for (const domain of whitelist_domains) {
    try {
      const cookies = await chrome.cookies.getAll({ domain });
      preserved_cookies.push(
        ...cookies.map(c => ({ ...c, domain }) as PreservedCookie)
      );
    } catch (error) {
      console.error(`Failed to get cookies for ${domain}:`, error);
    }
  }
  return preserved_cookies;
}

export async function RestoreWhitelistCookies(
  preserved_cookies: PreservedCookie[]
): Promise<void> {
  for (const cookie of preserved_cookies) {
    try {
      const cookie_details: chrome.cookies.SetDetails = {
        url: `http${cookie.secure ? 's' : ''}://${cookie.domain.replace(
          /^\./,
          ''
        )}${cookie.path}`,
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        sameSite: cookie.sameSite || 'lax'
      };
      if (cookie.expirationDate) {
        cookie_details.expirationDate = cookie.expirationDate;
      }
      await chrome.cookies.set(cookie_details);
    } catch (error) {
      console.error(`Failed to restore cookie ${cookie.name}:`, error);
    }
  }
}

export async function ClearBrowserData(
  data_types: DataTypes,
  time_range: TimeRange,
  whitelist_domains: string[] = []
): Promise<ClearResult> {
  const since = GetTimeRangeMs(time_range);
  let preserved_cookies: PreservedCookie[] = [];
  if (data_types.cookies && whitelist_domains.length > 0) {
    preserved_cookies = await PreserveWhitelistCookies(whitelist_domains);
  }
  const removal_options: chrome.browsingData.RemovalOptions = {
    since
  };
  const data_to_remove: chrome.browsingData.DataTypeSet = {};
  if (data_types.cache) data_to_remove.cache = true;
  if (data_types.cookies) data_to_remove.cookies = true;
  if (data_types.history) data_to_remove.history = true;
  if (data_types.downloads) data_to_remove.downloads = true;
  if (data_types.form_data) data_to_remove.formData = true;
  if (data_types.passwords) data_to_remove.passwords = true;
  if (data_types.local_storage) data_to_remove.localStorage = true;
  if (data_types.indexed_db) data_to_remove.indexedDB = true;
  if (data_types.service_workers) data_to_remove.serviceWorkers = true;
  if (data_types.file_systems) data_to_remove.fileSystems = true;
  if (data_types.plugin_data) data_to_remove.pluginData = true;
  if (data_types.web_sql) data_to_remove.webSQL = true;
  try {
    await chrome.browsingData.remove(removal_options, data_to_remove);
    if (preserved_cookies.length > 0) {
      await RestoreWhitelistCookies(preserved_cookies);
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
