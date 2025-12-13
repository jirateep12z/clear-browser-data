import type { ContextMenuId } from '@/types';

export function CreateContextMenus(): void {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'clear-site-data' satisfies ContextMenuId,
      title: 'Clear data for this site',
      contexts: ['page']
    });
    chrome.contextMenus.create({
      id: 'clear-site-cookies' satisfies ContextMenuId,
      title: 'Clear cookies for this site',
      contexts: ['page']
    });
    chrome.contextMenus.create({
      id: 'clear-site-cache' satisfies ContextMenuId,
      title: 'Clear cache for this site',
      contexts: ['page']
    });
    chrome.contextMenus.create({
      id: 'separator-1' satisfies ContextMenuId,
      type: 'separator',
      contexts: ['page']
    });
    chrome.contextMenus.create({
      id: 'add-to-whitelist' satisfies ContextMenuId,
      title: 'Add this site to whitelist',
      contexts: ['page']
    });
    chrome.contextMenus.create({
      id: 'remove-from-whitelist' satisfies ContextMenuId,
      title: 'Remove this site from whitelist',
      contexts: ['page']
    });
  });
}
