export interface PreservedCookie extends chrome.cookies.Cookie {
  domain: string;
}

export interface WhitelistMessage {
  action: 'add-to-whitelist' | 'remove-from-whitelist';
  domain: string;
}

export interface ClearSiteDataMessage {
  action: 'clear-site-data';
  domain: string;
}
