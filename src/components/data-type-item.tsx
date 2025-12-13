import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import type { DataTypeItemProps } from '@/types';
import {
  Cog,
  Cookie,
  Database,
  Download,
  FileText,
  Folder,
  HardDrive,
  History,
  Key,
  Layers,
  Puzzle,
  Table,
  type LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  HardDrive,
  Cookie,
  History,
  Download,
  FileText,
  Key,
  Database,
  Layers,
  Cog,
  Folder,
  Puzzle,
  Table
};

export function DataTypeItem({
  info,
  is_checked,
  show_icon,
  OnToggle
}: DataTypeItemProps) {
  const IconComponent = ICON_MAP[info.icon] || HardDrive;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-[opacity,transform] hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
              is_checked
                ? 'border-green-600 bg-green-600/5 dark:bg-green-600/10'
                : 'border-neutral-200 dark:border-neutral-700'
            }`}
            onClick={() => OnToggle(info.key)}
          >
            <Checkbox
              id={info.key}
              checked={is_checked}
              onCheckedChange={() => OnToggle(info.key)}
              className="pointer-events-none"
            />
            {show_icon && (
              <IconComponent className="text-muted-foreground h-4 w-4 flex-shrink-0" />
            )}
            <Label
              htmlFor={info.key}
              className="flex-1 cursor-pointer text-sm font-medium"
            >
              {info.label}
            </Label>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="text-xs">{info.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
