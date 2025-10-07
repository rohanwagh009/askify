"use client";

import { cn } from "@/utils/cn";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) => {
  const beamSize = size || 200;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden",
        className
      )}
      style={{
        padding: `${borderWidth}px`,
        background: "transparent",
        // This creates a mask that only shows the border area
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    >
      <div
        className="absolute inset-[-200%] animate-border-beam-spin"
        style={{
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 340deg, ${colorFrom} 340deg, ${colorTo} 355deg, transparent 360deg)`,
        }}
      />
    </div>
  );
};
