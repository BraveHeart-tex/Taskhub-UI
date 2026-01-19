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

type VariantElement = {
  h1: 'h1';
  h2: 'h2';
  h3: 'h3';
  h4: 'h4';
  p: 'p';
  lead: 'p';
  large: 'p';
  small: 'p';
  muted: 'p';
  caption: 'span';
  blockquote: 'blockquote';
  code: 'code';
};

const variantElementMap: VariantElement = {
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
};

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
    const Component = as || variantElementMap[variant || 'p'];

    return React.createElement(
      Component,
      {
        ref,
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

// Convenient shorthand components for common use cases
const H1 = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography ref={ref as React.Ref<HTMLElement>} variant='h1' {...props} />
));
H1.displayName = 'H1';

const H2 = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography ref={ref as React.Ref<HTMLElement>} variant='h2' {...props} />
));
H2.displayName = 'H2';

const H3 = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography ref={ref as React.Ref<HTMLElement>} variant='h3' {...props} />
));
H3.displayName = 'H3';

const H4 = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography ref={ref as React.Ref<HTMLElement>} variant='h4' {...props} />
));
H4.displayName = 'H4';

const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography ref={ref as React.Ref<HTMLElement>} variant='p' {...props} />
));
Paragraph.displayName = 'Paragraph';

const Lead = React.forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography ref={ref as React.Ref<HTMLElement>} variant='lead' {...props} />
));
Lead.displayName = 'Lead';

const Large = React.forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography ref={ref as React.Ref<HTMLElement>} variant='large' {...props} />
));
Large.displayName = 'Large';

const Small = React.forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography ref={ref as React.Ref<HTMLElement>} variant='small' {...props} />
));
Small.displayName = 'Small';

const Muted = React.forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography ref={ref as React.Ref<HTMLElement>} variant='muted' {...props} />
));
Muted.displayName = 'Muted';

const Caption = React.forwardRef<
  HTMLSpanElement,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography
    ref={ref as React.Ref<HTMLElement>}
    variant='caption'
    {...props}
  />
));
Caption.displayName = 'Caption';

const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  Omit<TypographyProps, 'variant'>
>((props, ref) => (
  <Typography
    ref={ref as React.Ref<HTMLElement>}
    variant='blockquote'
    {...props}
  />
));
Blockquote.displayName = 'Blockquote';

const Code = React.forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => (
    <Typography ref={ref as React.Ref<HTMLElement>} variant='code' {...props} />
  )
);
Code.displayName = 'Code';

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
