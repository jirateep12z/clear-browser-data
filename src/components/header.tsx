import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Keyboard, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Clear Browser Data</h1>
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="cursor-help">
              <Keyboard className="mr-1 h-3 w-3" />
              Shortcuts
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-[220px]">
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between gap-3">
                <kbd className="rounded bg-green-600 px-1.5 py-0.5 font-mono text-[10px] text-white">
                  Ctrl+Shift+Del
                </kbd>
                <span className="text-muted-foreground">Clear selected</span>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </header>
  );
}
