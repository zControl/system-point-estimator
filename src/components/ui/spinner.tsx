import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

const sizes = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
  full: "h-full w-full",
};

const colors = {
  default: "text-foreground/80",
  primary: "text-primary",
  highlight: "text-highlight",
};

export type SpinnerProps = {
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
  className?: string;
};

export const Spinner = ({
  size = "md",
  color = "default",
  className = "",
}: SpinnerProps) => {
  return (
    <>
      <Loader2Icon
        className={cn("animate-spin", sizes[size], colors[color], className)}
      />
      <span className="sr-only">Loading</span>
    </>
  );
};
