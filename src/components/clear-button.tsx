import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { ClearButtonProps, ClearResult } from '@/types';
import { CheckCircle2, Loader2, Trash2, XCircle } from 'lucide-react';
import { useState } from 'react';

export function ClearButton({
  data_types,
  is_clearing,
  confirm_before_clear,
  OnClear
}: ClearButtonProps) {
  const [result, set_result] = useState<ClearResult | null>(null);
  const [show_result, set_show_result] = useState(false);

  const selected_count = Object.values(data_types).filter(Boolean).length;
  const is_disabled = selected_count === 0 || is_clearing;

  const HandleClear = async () => {
    set_result(null);
    const clear_result = await OnClear();
    set_result(clear_result);
    set_show_result(true);
    setTimeout(() => set_show_result(false), 3000);
  };

  const GetSelectedTypesText = (): string => {
    const selected = Object.entries(data_types)
      .filter(([, value]) => value)
      .map(([key]) => key.replace(/_/g, ' '))
      .join(', ');
    return selected || 'No data types selected';
  };

  if (confirm_before_clear) {
    return (
      <div className="space-y-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="w-full"
              size="lg"
              variant="destructive"
              disabled={is_disabled}
            >
              {is_clearing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Clearing...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Data ({selected_count})
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear Browser Data?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the following data:
                <br />
                <span className="text-foreground mt-2 block font-medium">
                  {GetSelectedTypesText()}
                </span>
                <br />
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={HandleClear}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Clear Data
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {show_result && result && (
          <div
            className={`flex items-center justify-center gap-2 rounded-md p-2 text-sm ${
              result.success
                ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                : 'bg-red-500/10 text-red-600 dark:text-red-400'
            }`}
          >
            {result.success ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Data cleared successfully!
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                {result.error || 'Failed to clear data'}
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        className="w-full"
        size="lg"
        variant="destructive"
        disabled={is_disabled}
        onClick={HandleClear}
      >
        {is_clearing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Clearing...
          </>
        ) : (
          <>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Data ({selected_count})
          </>
        )}
      </Button>
      {show_result && result && (
        <div
          className={`flex items-center justify-center gap-2 rounded-md p-2 text-sm ${
            result.success
              ? 'bg-green-500/10 text-green-600 dark:text-green-400'
              : 'bg-red-500/10 text-red-600 dark:text-red-400'
          }`}
        >
          {result.success ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Data cleared successfully!
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4" />
              {result.error || 'Failed to clear data'}
            </>
          )}
        </div>
      )}
    </div>
  );
}
