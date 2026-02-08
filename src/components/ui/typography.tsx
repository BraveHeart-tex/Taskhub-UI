import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7',
      lead: 'text-xl text-muted-foreground leading-relaxed',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      caption: 'text-xs text-muted-foreground',
      blockquote: 'border-l-2 border-primary pl-6 italic text-muted-foreground',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    color: {
      default: '',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    variant: 'p',
    color: 'default',
  },
});

type VariantKey = keyof typeof variantElementMap;

const variantElementMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  lead: 'p',
  large: 'p',
  small: 'p',
  muted: 'p',
  caption: 'span',
  blockquote: 'blockquote',
  code: 'code',
} as const;

type AllowedElements =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'blockquote'
  | 'code'
  | 'label';

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  as?: AllowedElements;
  balance?: boolean;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = 'p',
      weight,
      align,
      color,
      as,
      balance,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as || variantElementMap[variant as VariantKey];

    return React.createElement(
      Component,
      {
        ref: ref as React.Ref<
          HTMLElement &
            HTMLParagraphElement &
            HTMLHeadingElement &
            HTMLQuoteElement &
            HTMLSpanElement
        >,
        className: cn(
          typographyVariants({ variant, weight, align, color }),
          balance && 'text-balance',
          className
        ),
        ...props,
      },
      children
    );
  }
);

Typography.displayName = 'Typography';

function createTypographyShorthand<T extends VariantKey>(variant: T) {
  const Component = React.forwardRef<
    HTMLElement,
    Omit<TypographyProps, 'variant'>
  >((props, ref) => <Typography ref={ref} variant={variant} {...props} />);
  Component.displayName = variant.charAt(0).toUpperCase() + variant.slice(1);
  return Component;
}

const H1 = createTypographyShorthand('h1');
const H2 = createTypographyShorthand('h2');
const H3 = createTypographyShorthand('h3');
const H4 = createTypographyShorthand('h4');
const Paragraph = createTypographyShorthand('p');
const Lead = createTypographyShorthand('lead');
const Large = createTypographyShorthand('large');
const Small = createTypographyShorthand('small');
const Muted = createTypographyShorthand('muted');
const Caption = createTypographyShorthand('caption');
const Blockquote = createTypographyShorthand('blockquote');
const Code = createTypographyShorthand('code');

export {
  Typography,
  typographyVariants,
  H1,
  H2,
  H3,
  H4,
  Paragraph,
  Lead,
  Large,
  Small,
  Muted,
  Caption,
  Blockquote,
  Code,
};
