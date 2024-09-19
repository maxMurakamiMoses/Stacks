"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const ButtonsCard = ({
  children,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full rounded-xl dark:bg-black dark:border-white/[0.2] hover:border-neutral-200 group/btn", // Removed h-60
        className
      )}
    >
      <div className="relative z-40">{children}</div>
    </div>
  );
};
