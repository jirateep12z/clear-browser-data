import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { StatisticsCardProps } from '@/types';
import { BarChart3, Calendar, TrendingUp } from 'lucide-react';

export function StatisticsCard({ statistics }: StatisticsCardProps) {
  const FormatDate = (date_string: string | null): string => {
    if (!date_string) return 'Never';
    const date = new Date(date_string);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const GetTopDataTypes = (): { name: string; count: number }[] => {
    return Object.entries(statistics.data_types_cleared)
      .map(([name, count]) => ({ name: name.replace(/_/g, ' '), count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  };

  const top_types = GetTopDataTypes();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="h-4 w-4" />
          Statistics
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-muted-foreground flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3" />
              Total Clears
            </p>
            <p className="text-2xl font-bold">{statistics.total_clears}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground flex items-center gap-1 text-xs">
              <Calendar className="h-3 w-3" />
              Last Clear
            </p>
            <p className="text-sm font-medium">
              {FormatDate(statistics.last_clear_date)}
            </p>
          </div>
        </div>
        {top_types.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-muted-foreground text-xs">
                Most Cleared Types
              </p>
              <div className="flex flex-wrap gap-2">
                {top_types.map(type => (
                  <Badge
                    key={type.name}
                    variant="secondary"
                    className="text-xs"
                  >
                    {type.name}: {type.count}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
