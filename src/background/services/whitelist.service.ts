import type { DataTypes, Settings } from '@/types';
import { ShowNotification } from './notification.service';

export async function AddToWhitelist(domain: string): Promise<void> {
  const { settings } = (await chrome.storage.sync.get('settings')) as {
    settings: Settings;
  };
  if (!settings.whitelist_domains.includes(domain)) {
    settings.whitelist_domains.push(domain);
    await chrome.storage.sync.set({ settings });
    ShowNotification(true, {} as DataTypes, `Added ${domain} to whitelist`);
  } else {
    ShowNotification(
      true,
      {} as DataTypes,
      `${domain} is already in whitelist`
    );
  }
}

export async function RemoveFromWhitelist(domain: string): Promise<void> {
  const { settings } = (await chrome.storage.sync.get('settings')) as {
    settings: Settings;
  };
  const index = settings.whitelist_domains.indexOf(domain);
  if (index > -1) {
    settings.whitelist_domains.splice(index, 1);
    await chrome.storage.sync.set({ settings });
    ShowNotification(true, {} as DataTypes, `Removed ${domain} from whitelist`);
  } else {
    ShowNotification(true, {} as DataTypes, `${domain} is not in whitelist`);
  }
}
