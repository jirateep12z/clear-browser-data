'use client';

import {
  Content as TabsContentPrimitive,
  List as TabsListPrimitive,
  Root as TabsRootPrimitive,
  Trigger as TabsTriggerPrimitive
} from '@radix-ui/react-tabs';
import type { ComponentProps } from 'react';

import { Cn } from '@/utils';

function Tabs({
  className,
  ...props
}: ComponentProps<typeof TabsRootPrimitive>) {
  return (
    <TabsRootPrimitive
      data-slot="tabs"
      className={Cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: ComponentProps<typeof TabsListPrimitive>) {
  return (
    <TabsListPrimitive
      data-slot="tabs-list"
      className={Cn(
        'inline-flex h-9 w-fit items-center justify-center rounded-lg bg-neutral-200 p-[3px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsTriggerPrimitive>) {
  return (
    <TabsTriggerPrimitive
      data-slot="tabs-trigger"
      className={Cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-neutral-800 focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-50 dark:text-neutral-400 dark:data-[state=active]:border-neutral-700 dark:data-[state=active]:bg-neutral-900 dark:data-[state=active]:text-neutral-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsContentPrimitive>) {
  return (
    <TabsContentPrimitive
      data-slot="tabs-content"
      className={Cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
