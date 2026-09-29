import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-small inline-flex items-center gap-2 font-semibold text-brand-600", className)}>
      <span aria-hidden className="size-1.5 rounded-full bg-brand-500" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-[760px]", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className={align === "center" ? "justify-center" : undefined}>{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-h1 mt-4 text-ink-900">
        {title}
      </h2>
      {description && <p className="text-lead mt-5 text-ink-600">{description}</p>}
    </div>
  );
}
