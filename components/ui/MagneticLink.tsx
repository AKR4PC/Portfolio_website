"use client";

import type { MouseEvent, ReactNode } from "react";
import { useMagnetic } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  cursor?: string;
};

export function MagneticLink({
  href,
  children,
  className,
  external,
  onClick,
  cursor = "OPEN",
}: MagneticLinkProps) {
  const ref = useMagnetic<HTMLAnchorElement>(11);
  return (
    <a
      ref={ref}
      href={href}
      className={cn("magnetic-link", className)}
      data-cursor={cursor}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
