import * as React from "react";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: number;
    max?: number;
    showSpinner?: boolean;
  }
>(({ className, value = 0, max = 100, showSpinner = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative w-full overflow-hidden bg-[#17404C] rounded-full h-2",
      className
    )}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-light-green transition-all duration-300 ease-in-out"
      style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
    />
    {showSpinner && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-light-green border-t-transparent rounded-full animate-spin" />
      </div>
    )}
  </div>
));
Progress.displayName = "Progress";

export { Progress };
