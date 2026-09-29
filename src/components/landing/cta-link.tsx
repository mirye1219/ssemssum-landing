import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { HAS_TRIAL_URL, SECTION_IDS, TRIAL_URL } from "@/config/site";
import { cn } from "@/lib/utils";

export const ctaVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-(--radius-button) font-semibold whitespace-nowrap transition-colors duration-200 focus-ring",
  {
    variants: {
      variant: {
        primary: "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-700",
        secondary: "border border-border-default bg-surface-base text-ink-900 hover:bg-surface-cool",
      },
      size: {
        lg: "h-[52px] px-6 text-[16px] lg:h-14 lg:text-[17px]",
        sm: "h-10 px-4 text-[14px]",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  },
);

type CtaLinkProps = ComponentProps<"a"> & VariantProps<typeof ctaVariants>;

export function CtaLink({ className, variant, size, ...props }: CtaLinkProps) {
  return <a className={cn(ctaVariants({ variant, size }), className)} {...props} />;
}

/** 기본 행동 ‘쌤씀 체험하기’. 체험 주소는 src/config/site.ts 의 단일 설정값을 따른다. */
export function TrialLink({
  className,
  size,
  withArrow = true,
  label = "쌤씀 체험하기",
}: {
  className?: string;
  size?: "lg" | "sm";
  withArrow?: boolean;
  label?: string;
}) {
  const href = HAS_TRIAL_URL ? TRIAL_URL : `#${SECTION_IDS.howItWorks}`;
  return (
    <CtaLink
      href={href}
      size={size}
      className={className}
      data-trial-configured={HAS_TRIAL_URL}
      {...(HAS_TRIAL_URL && /^https?:/.test(TRIAL_URL) ? { target: "_blank", rel: "noopener" } : {})}
    >
      {label}
      {withArrow && <ArrowRight aria-hidden className="size-[18px]" />}
      {HAS_TRIAL_URL && /^https?:/.test(TRIAL_URL) && <span className="sr-only">(새 창에서 열림)</span>}
    </CtaLink>
  );
}
