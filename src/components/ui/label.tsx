"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      color: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        destructive: "text-destructive",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-lg",
        xl: "text-xl",
      },
      fontStyle: {
        normal: "font-normal",
        italic: "italic",
      },
      justify: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      color: "default",
      size: "md",
      fontStyle: "normal",
      justify: "left",
    },
  },
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ color, size, fontStyle, justify, className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      labelVariants({ color, size, fontStyle, justify }),
      className,
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

// eslint-disable-next-line react-refresh/only-export-components
export { Label, labelVariants };
