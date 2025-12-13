import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { DEFAULT_PRESETS } from '@/constants';
import type { Preset, PresetCardProps } from '@/types';
import { Code, Sparkles, Trash2, Zap } from 'lucide-react';

const PRESET_ICONS: Record<string, typeof Zap> = {
  'quick-clean': Zap,
  'privacy-clean': Sparkles,
  'developer-clean': Code,
  'full-clean': Trash2
};

export function PresetCard({ OnApplyPreset }: PresetCardProps) {
  const HandleApplyPreset = (preset: Preset) => {
    OnApplyPreset(preset.data_types, preset.time_range);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4" />
          Quick Presets
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-3">
        <ScrollArea className="h-[180px]">
          <div className="space-y-2">
            {DEFAULT_PRESETS.map(preset => {
              const IconComponent = PRESET_ICONS[preset.id] || Zap;
              const data_type_count = Object.keys(preset.data_types).length;

              return (
                <Button
                  key={preset.id}
                  variant="outline"
                  className="h-auto w-full justify-start px-4 py-3"
                  onClick={() => HandleApplyPreset(preset)}
                >
                  <div className="flex w-full items-start gap-3">
                    <IconComponent className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {preset.name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {data_type_count} types
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {preset.description}
                      </p>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
