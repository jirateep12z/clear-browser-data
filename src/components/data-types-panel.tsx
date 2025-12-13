import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { DATA_TYPE_INFO } from '@/constants';
import type { DataTypesPanelProps } from '@/types';
import { CheckSquare, Square } from 'lucide-react';
import { DataTypeItem } from './data-type-item';

export function DataTypesPanel({
  data_types,
  show_icons,
  OnToggle,
  OnSelectAll
}: DataTypesPanelProps) {
  const selected_count = Object.values(data_types).filter(Boolean).length;
  const total_count = Object.keys(data_types).length;
  const all_selected = selected_count === total_count;
  const none_selected = selected_count === 0;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Data Types</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {selected_count}/{total_count}
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => OnSelectAll(true)}
              disabled={all_selected}
            >
              <CheckSquare className="mr-1 h-3.5 w-3.5" />
              All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => OnSelectAll(false)}
              disabled={none_selected}
            >
              <Square className="mr-1 h-3.5 w-3.5" />
              None
            </Button>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-3">
        <ScrollArea className="h-[320px] pr-3">
          <div className="space-y-2">
            {DATA_TYPE_INFO.map(info => (
              <DataTypeItem
                key={info.key}
                info={info}
                is_checked={data_types[info.key]}
                show_icon={show_icons}
                OnToggle={OnToggle}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
