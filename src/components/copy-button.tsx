"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import IconConfirmed from "@/components/icon-confirmed";
import IconCopy from "@/components/icon-copy";

type SizeVariant = "sm" | "default" | "lg";

interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  size?: SizeVariant;
}

const sizeMap: Record<SizeVariant, { button: string; icon: number }> = {
  sm: { button: "h-8 gap-2 rounded-md px-3 text-sm", icon: 14 },
  default: { button: "h-9 gap-2 rounded-md px-4 text-sm", icon: 16 },
  lg: { button: "h-10 gap-2 rounded-md px-6 text-base", icon: 20 },
};

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      size = "default",
      className,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState<boolean>(false);
    const canCopy = Boolean(value);
    const hasLabel = Boolean(children);

    const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!canCopy) return;

      navigator.clipboard.writeText(value!).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      onClick?.(event);
    };

    const { button: buttonSize, icon: iconSize } = sizeMap[size];

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : canCopy ? "Copy to clipboard" : "Nothing to copy"}
        disabled={copied || !canCopy}
        className={cn(
          "cursor-pointer inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b dark:bg-linear-to-t border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.97] active:brightness-95 dark:border-0 dark:border-zinc-950/50 from-zinc-900/85 to-zinc-900 text-white dark:from-zinc-100/85 dark:to-zinc-100 dark:text-zinc-900",
          buttonSize,
          !hasLabel && "w-8 px-0",
          className,
        )}
        {...props}
      >
        <span
          className="relative inline-flex items-center justify-center"
          style={{ width: iconSize, height: iconSize }}
        >
          <span
            className={cn(
              "absolute transition-all duration-200",
              copied
                ? "scale-100 opacity-100 blur-none"
                : "scale-70 opacity-0 blur-[2px]",
            )}
          >
            <IconConfirmed size={`${iconSize}px`} aria-hidden="true" />
          </span>
          <span
            className={cn(
              "absolute transition-all duration-200",
              copied
                ? "scale-0 opacity-0 blur-[2px]"
                : "scale-100 opacity-100 blur-none",
            )}
          >
            <IconCopy size={`${iconSize}px`} aria-hidden="true" />
          </span>
        </span>
        {hasLabel ? (
          <span className="relative [text-shadow:0_1px_0_rgb(0,0,0)] dark:[text-shadow:0_1px_0_rgb(255,255,255)]">
            {children}
          </span>
        ) : null}
      </button>
    );
  },
);

CopyButton.displayName = "CopyButton";

export { CopyButton };
export type { CopyButtonProps };
