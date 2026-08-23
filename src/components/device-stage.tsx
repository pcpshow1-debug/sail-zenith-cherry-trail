import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PhoneStage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px]",
        className,
      )}
    >
      <div className="relative rounded-[2.35rem] bg-[#111217] p-[9px] shadow-[0_28px_70px_-18px_rgba(0,0,0,0.5)] ring-1 ring-black/25">
        <div className="overflow-hidden rounded-[1.85rem] bg-black">
          {children}
        </div>
      </div>
    </div>
  );
}
