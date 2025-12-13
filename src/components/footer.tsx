import { Coffee, Heart } from 'lucide-react';

export function Footer() {
  const HandleDonateClick = () => {
    chrome.tabs.create({ url: 'https://buymeacoffee.com/jirateep12z' });
  };

  return (
    <footer className="border-border mt-4 border-t pt-3">
      <div className="flex flex-col items-center gap-2">
        <p className="text-muted-foreground flex items-center gap-1 text-xs">
          Made with <Heart className="h-3 w-3 fill-red-500 text-red-500" /> by
          <span className="text-foreground font-medium">jirateep12z</span>
        </p>
        <button
          onClick={HandleDonateClick}
          className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-600 transition-colors hover:bg-amber-500/20 dark:text-amber-400"
        >
          <Coffee className="h-3.5 w-3.5" />
          Buy me a coffee
        </button>
      </div>
    </footer>
  );
}
