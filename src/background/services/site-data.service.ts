import type { DataTypes } from '@/types';
import { ShowNotification } from './notification.service';

export async function ClearSiteData(domain: string): Promise<void> {
  try {
    await ClearSiteCookies(domain);
    await ClearSiteCache(domain);
    await ClearSiteLocalStorage(domain);
    ShowNotification(
      true,
      { site_data: true } as unknown as DataTypes,
      `Cleared all data for ${domain}`
    );
  } catch {
    ShowNotification(
      false,
      {} as DataTypes,
      `Failed to clear data for ${domain}`
    );
  }
}

export async function ClearSiteCookies(domain: string): Promise<void> {
  try {
    const cookies = await chrome.cookies.getAll({ domain });
    for (const cookie of cookies) {
      const url = `http${cookie.secure ? 's' : ''}://${cookie.domain}${
        cookie.path
      }`;
      await chrome.cookies.remove({ url, name: cookie.name });
    }
    ShowNotification(
      true,
      { cookies: true } as unknown as DataTypes,
      `Cleared ${cookies.length} cookies for ${domain}`
    );
  } catch (error) {
    console.error('Failed to clear cookies:', error);
  }
}

export async function ClearSiteCache(domain: string): Promise<void> {
  try {
    await chrome.browsingData.removeCache({
      origins: [`https://${domain}`, `http://${domain}`]
    });
    ShowNotification(
      true,
      { cache: true } as unknown as DataTypes,
      `Cleared cache for ${domain}`
    );
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
}

export async function ClearSiteLocalStorage(domain: string): Promise<void> {
  try {
    await chrome.browsingData.removeLocalStorage({
      origins: [`https://${domain}`, `http://${domain}`]
    });
  } catch (error) {
    console.error('Failed to clear local storage:', error);
  }
}
