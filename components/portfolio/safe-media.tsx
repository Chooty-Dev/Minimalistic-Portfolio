"use client";

import { useState } from "react";
import { Image as ImageIcon, User } from "lucide-react";
import { cn } from "cn";

interface SafeMediaProps {
  src?: string;
  alt: string;
  fallbackLabel?: string;
  fallbackIcon?: "image" | "user";
  priority?: boolean;
  contain?: boolean;
  frameless?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * Renders user images dropped into `/public` with smooth hover zoom.
 * Gracefully displays a minimalist themed placeholder if the path is empty
 * or not uploaded yet—preventing broken image icons.
 */
export function SafeMedia({
  src,
  alt,
  fallbackLabel,
  fallbackIcon = "image",
  priority = false,
  contain = false,
  frameless = false,
  className,
  imgClassName,
}: SafeMediaProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const trimmed = src?.trim() || "";
  const hasSrc = trimmed.length > 0 && failedSrc !== trimmed;

  if (!hasSrc) {
    return (
      <div
        className={cn(
          "relative flex min-h-[160px] flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-border bg-muted/45 p-6 text-center backdrop-blur-md",
          className
        )}
      >
        {fallbackIcon === "user" ? (
          <User className="size-10 text-primary/75 stroke-[1.4]" aria-hidden="true" />
        ) : (
          <ImageIcon className="size-7 text-primary/70 stroke-[1.5]" aria-hidden="true" />
        )}
        {fallbackLabel ? (
          <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
            {fallbackLabel}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        !frameless && "rounded-2xl border border-border bg-muted/40",
        className
      )}
    >
      {/* Standard img supports arbitrary paths placed in /public without remote-host config */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={trimmed}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onError={() => setFailedSrc(trimmed)}
        className={cn(
          "transition-transform duration-700 group-hover:scale-105",
          contain ? "w-full h-auto object-contain" : "h-full w-full object-cover",
          imgClassName
        )}
      />
    </div>
  );
}
