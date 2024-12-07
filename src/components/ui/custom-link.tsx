import * as React from "react";
import { createLink, LinkComponent } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: "default" | "sm" | "lg" | "huge";
  hoverColor?: "default" | "primary" | "secondary";
  inline?: boolean;
}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>(
  ({ size = "md", inline = false, hoverColor = "default", ...props }, ref) => {
    const textSizeClass = {
      default: "text-base",
      sm: "text-xs",
      lg: "text-lg",
      huge: "text-3xl",
    }[size];

    const hoverColorClass = {
      default: "hover:text-highlight",
      primary: "hover:text-primary",
      secondary: "hover:text-secondary",
    }[hoverColor];

    const className = cn(
      textSizeClass,
      hoverColorClass,
      "hover:tracking-wide",
      inline
        ? "text-primary hover:tracking-wide text-lg hover:tracking-normal hover:underline"
        : "px-2",
    );

    return <a ref={ref} {...props} className={className} />;
  },
);

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const CustomLink: LinkComponent<typeof BasicLinkComponent> = ({
  size,
  ...props
}) => {
  return <CreatedLinkComponent preload={"intent"} size={size} {...props} />;
};
