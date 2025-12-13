# Clear Browser Data

🧹 A modern Chrome Extension to quickly clear your browser data with customizable options, presets, and one-click cleanup.

## ✨ Features

### Core Features

- **Data Types Selection** - Select multiple data types to clear
  - Cached Images & Files
  - Cookies
  - Browsing History
  - Download History
  - Autofill Form Data
  - Saved Passwords
  - Local Storage
  - IndexedDB
  - Service Workers
  - File Systems
  - Plugin Data
  - Web SQL Data

### Advanced Features

- **Time Range Selection** - Choose time range (1 hour, 24 hours, 7 days, 4 weeks, All time)
- **Quick Presets** - Presets for quick data clearing
  - Quick Clean - Clear cache and cookies
  - Privacy Clean - Clear history, cookies, and form data
  - Developer Clean - Clear cache, local storage, and service workers
  - Full Clean - Clear everything except passwords
- **Keyboard Shortcuts** - Clear data with keyboard shortcuts
  - `Ctrl+Shift+Delete` - Clear selected data types with current settings
  - `Ctrl+Shift+C` - Quick clear cache only
- **Dark/Light Theme** - Theme support (Light, Dark, System)
- **Notifications** - Notify when clearing is successful
- **Statistics** - Display clearing statistics
- **Confirmation Dialog** - Confirm before clearing data
- **Clear on Browser Startup** - Automatically clear selected data types when browser starts
- **Scheduled Cleanup** - Automatic data clearing with flexible scheduling options
  - Custom minutes interval (5, 10, 15, 20, 30, 45 minutes)
  - Custom hours interval (1, 2, 3, 4, 6, 8, 12 hours)
  - Hourly, Daily, Weekly, Monthly options
- **Whitelist Domains** - Protect cookies from specific domains during cleanup
- **Context Menu Integration** - Right-click to clear data for current site

## 🚀 Installation

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Load Extension in Chrome

1. Build the extension: `npm run build`
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `dist` folder from this project

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!

## 📝 Author

**Made with ❤️ by @jirateep12z**
