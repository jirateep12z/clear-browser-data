import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { Cn } from '@/utils';

type SelectContextValue = {
  value: string;
  open: boolean;
  SetOpen: (open: boolean) => void;
  SetValue: (value: string) => void;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  labels: Record<string, React.ReactNode>;
  RegisterItem: (value: string, label: React.ReactNode) => void;
  UnregisterItem: (value: string) => void;
};

const SelectContext = React.createContext<SelectContextValue | null>(null);

function UseSelectContext() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error('Select compound used outside <Select>');
  return ctx;
}

type SelectProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
};

function Select({
  value: controlled_value,
  defaultValue = '',
  onValueChange,
  disabled,
  children
}: SelectProps) {
  const [internal_value, set_internal_value] = React.useState(
    defaultValue ?? ''
  );
  const [open, set_open] = React.useState(false);
  const [labels, set_labels] = React.useState<Record<string, React.ReactNode>>(
    {}
  );
  const is_controlled = controlled_value !== undefined;
  const value = is_controlled ? controlled_value : internal_value;

  const RegisterItem = React.useCallback(
    (item_value: string, item_label: React.ReactNode) => {
      set_labels(prev =>
        prev[item_value] === item_label
          ? prev
          : { ...prev, [item_value]: item_label }
      );
    },
    []
  );

  const UnregisterItem = React.useCallback((item_value: string) => {
    set_labels(prev => {
      const next = { ...prev };
      delete next[item_value];
      return next;
    });
  }, []);

  const SetValue = React.useCallback(
    (new_value: string) => {
      if (!is_controlled) set_internal_value(new_value);
      onValueChange?.(new_value);
      set_open(false);
    },
    [is_controlled, onValueChange]
  );

  const container_ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const HandleOutside = (e: MouseEvent) => {
      if (
        container_ref.current &&
        !container_ref.current.contains(e.target as Node)
      ) {
        set_open(false);
      }
    };
    document.addEventListener('mousedown', HandleOutside);
    return () => document.removeEventListener('mousedown', HandleOutside);
  }, [open]);

  return (
    <SelectContext.Provider
      value={{
        value,
        open,
        SetOpen: set_open,
        SetValue,
        onValueChange,
        disabled,
        labels,
        RegisterItem,
        UnregisterItem
      }}
    >
      <div ref={container_ref} data-slot="select" className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

type SelectTriggerProps = {
  className?: string;
  size?: 'sm' | 'default';
  children?: React.ReactNode;
};

function SelectTrigger({
  className,
  size = 'default',
  children
}: SelectTriggerProps) {
  const { open, SetOpen, disabled } = UseSelectContext();
  return (
    <button
      type="button"
      data-slot="select-trigger"
      data-size={size}
      disabled={disabled}
      aria-expanded={open}
      onClick={() => SetOpen(!open)}
      className={Cn(
        "border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        size === 'default' ? 'h-9' : 'h-8',
        className
      )}
    >
      <span
        data-slot="select-value"
        className="flex items-center gap-2 truncate"
      >
        {children}
      </span>
      <ChevronDownIcon
        className={Cn('size-4 shrink-0 opacity-50', open && 'rotate-180')}
      />
    </button>
  );
}

type SelectValueProps = {
  placeholder?: string;
  children?: React.ReactNode;
};

function SelectValue({ placeholder }: SelectValueProps) {
  const { value, labels } = UseSelectContext();
  const label = labels[value];

  if (!value || label === undefined) {
    return (
      <span className="text-muted-foreground">{placeholder ?? 'Select…'}</span>
    );
  }
  return <>{label}</>;
}

type SelectContentProps = {
  className?: string;
  children: React.ReactNode;
};

function SelectContent({ className, children }: SelectContentProps) {
  const { open } = UseSelectContext();

  return (
    <>
      <div className="hidden" aria-hidden>
        {children}
      </div>
      {open && (
        <div
          data-slot="select-content"
          className={Cn(
            'bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 absolute top-full right-0 left-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-md border',
            className
          )}
        >
          <div className="p-1">{children}</div>
        </div>
      )}
    </>
  );
}

type SelectItemProps = {
  className?: string;
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
};

function SelectItem({ className, value, disabled, children }: SelectItemProps) {
  const { value: selected, SetValue, RegisterItem } = UseSelectContext();
  const is_selected = selected === value;

  React.useEffect(() => {
    RegisterItem(value, children);
  }, [value, children, RegisterItem]);

  return (
    <div
      data-slot="select-item"
      data-disabled={disabled}
      aria-selected={is_selected}
      onClick={() => !disabled && SetValue(value)}
      className={Cn(
        'relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pr-8 pl-2 text-sm select-none',
        'hover:bg-accent hover:text-accent-foreground',
        is_selected && 'bg-accent/50 text-accent-foreground',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      {children}
      {is_selected && (
        <span className="absolute right-2 flex size-3.5 items-center justify-center">
          <CheckIcon className="size-4" />
        </span>
      )}
    </div>
  );
}

type SelectGroupProps = {
  children: React.ReactNode;
};

function SelectGroup({ children }: SelectGroupProps) {
  return <div data-slot="select-group">{children}</div>;
}

type SelectLabelProps = {
  className?: string;
  children: React.ReactNode;
};

function SelectLabel({ className, children }: SelectLabelProps) {
  return (
    <div
      data-slot="select-label"
      className={Cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
    >
      {children}
    </div>
  );
}

type SelectSeparatorProps = {
  className?: string;
};

function SelectSeparator({ className }: SelectSeparatorProps) {
  return (
    <div
      data-slot="select-separator"
      className={Cn('bg-border -mx-1 my-1 h-px', className)}
    />
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
};
