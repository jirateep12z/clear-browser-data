# Clear Browser Data - Copilot Instructions

## Project Overview

Chrome Extension (Manifest V3) built with React 19 + TypeScript + Vite + Tailwind CSS v4. Provides customizable browser data clearing with presets, scheduling, and whitelist features.

## Architecture

### Two-Entry Build System

- **Popup UI**: `index.html` → React app in `src/`
- **Background Service Worker**: `src/background/index.ts` → Chrome APIs

Communication flow: Popup ↔ `chrome.runtime.sendMessage` ↔ Background Service Worker ↔ `chrome.storage.sync`

### Key Directories

- `src/background/services/` - Domain services (browsing-data, schedule, whitelist, etc.)
- `src/components/` - Feature components + `ui/` primitives (Radix-based)
- `src/hooks/` - `UseChromeStorage` (main state management), `UseTheme`
- `src/types/` - Centralized type exports via barrel file
- `src/constants/` - Settings defaults, data type configs, presets

## Naming Conventions (CRITICAL)

```typescript
// Functions, Components, Hooks: PascalCase
function HandleClear() {}
function UseChromeStorage() {}
export function ClearButton() {}

// Variables, Parameters, Props: snake_case
const is_loading = true;
const { data_types, time_range } = settings;

// Constants: UPPER_CASE
export const DEFAULT_SETTINGS: Settings = {};
export const BUTTON_VARIANTS = cva(...);

// Files: kebab-case
// browsing-data.service.ts, use-chrome-storage.ts, clear-button.tsx
```

## Component Patterns

### UI Components (src/components/ui/)

Separate variants from component logic:

```typescript
// button-variants.ts - CVA definition
export const BUTTON_VARIANTS = cva("base-classes", { variants: {...} });

// button.tsx - Component using variants
import { BUTTON_VARIANTS } from './button-variants';
function Button({ variant, size, ...props }) {
  return <Comp className={Cn(BUTTON_VARIANTS({ variant, size }))} {...props} />;
}
```

### Props Interfaces

Define in `src/types/component-props.interface.type.ts`, export via `src/types/index.ts`:

```typescript
export interface ClearButtonProps {
  data_types: DataTypes;
  is_clearing: boolean;
  OnClear: () => Promise<ClearResult>; // Event handlers: On* prefix
}
```

## Background Services Pattern

Services in `src/background/services/` follow single-responsibility:

```typescript
// browsing-data.service.ts - exports pure functions
export async function ClearBrowserData(
  data_types: DataTypes,
  time_range: TimeRange,
  whitelist_domains: string[]
): Promise<ClearResult> { ... }

// Aggregate exports in services/index.ts
export { ClearBrowserData } from './browsing-data.service';
```

## Message System

Actions defined in `src/types/message.interface.type.ts`:

```typescript
// Message types
type action = 'clear-data' | 'get-settings' | 'save-settings' | 'get-statistics'
            | 'add-to-whitelist' | 'remove-from-whitelist' | 'clear-site-data';

// Handler returns true for async response
HandleMessage(message, sender, send_response): boolean {
  if (message.action === 'clear-data') {
    someAsyncWork().then(result => send_response(result));
    return true; // Keep message channel open
  }
}
```

## Development Commands

```bash
npm run dev      # Start Vite dev server (for UI development)
npm run build    # Build extension → dist/
npm run lint     # ESLint with auto-fix
npm run format   # Prettier formatting
```

**Load in Chrome**: Build → `chrome://extensions/` → Developer mode → Load unpacked → Select `dist/`

## Type Imports

Always use barrel exports from `@/types`:

```typescript
import type { DataTypes, Settings, ClearResult, TimeRange } from '@/types';
```

Path alias `@/` resolves to `./src/`.

## Chrome APIs Used

- `chrome.browsingData` - Clear browser data
- `chrome.storage.sync` - Persist settings across devices
- `chrome.alarms` - Scheduled cleanup
- `chrome.contextMenus` - Right-click menu integration
- `chrome.cookies` - Whitelist preservation
- `chrome.notifications` - Success/error feedback
