import { cva, type VariantProps } from 'class-variance-authority';

const BADGE_VARIANTS = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'bg-green-600 text-white [a&]:hover:bg-green-700',
        secondary:
          'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90',
        outline:
          'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        ghost: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        link: 'text-green-600 underline-offset-4 [a&]:hover:underline dark:text-green-500'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

type BadgeVariantsProps = VariantProps<typeof BADGE_VARIANTS>;

export { BADGE_VARIANTS, type BadgeVariantsProps };
