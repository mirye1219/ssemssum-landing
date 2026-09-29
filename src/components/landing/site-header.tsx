"use client";

import { Menu } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_ITEMS, SECTION_IDS } from "@/config/site";
import { cn } from "@/lib/utils";
import { TrialLink } from "./cta-link";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** 앵커 이동 후 해당 섹션으로 포커스를 옮겨 키보드·스크린리더 사용자도 위치를 잃지 않게 한다. */
export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", hash);
  el.focus({ preventScroll: true });
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[22px] font-extrabold tracking-[-0.04em] text-ink-900", className)}>
      쌤씀
      <span aria-hidden className="size-1.5 translate-y-1.5 rounded-full bg-brand-500" />
    </span>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const onNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToHash(href);
  };

  const onMobileNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollToHash(href), 240);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,height] duration-300",
        scrolled
          ? "h-(--header-h) border-b border-border-default bg-surface-warm/90 backdrop-blur-md"
          : "h-[72px] bg-transparent lg:h-20",
      )}
    >
      <div className="container-landing flex h-full items-center justify-between gap-6">
        <a
          href={`#${SECTION_IDS.top}`}
          onClick={(e) => onNavClick(e, `#${SECTION_IDS.top}`)}
          className="focus-ring rounded-md"
          aria-label="쌤씀, 맨 위로 이동"
        >
          <Wordmark />
        </a>

        <nav aria-label="주요 메뉴" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.href)}
                  aria-current={current === item.href ? "true" : undefined}
                  className={cn(
                    "focus-ring rounded-lg px-3.5 py-2 text-[15px] font-medium text-ink-600 transition-colors hover:text-ink-900",
                    "aria-[current=true]:font-semibold aria-[current=true]:text-ink-900",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <TrialLink size="sm" withArrow={false} className="hidden sm:inline-flex" />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="focus-ring inline-flex size-11 items-center justify-center rounded-xl text-ink-900 hover:bg-surface-cool lg:hidden"
              aria-label="메뉴 열기"
            >
              <Menu className="size-6" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] max-w-sm bg-surface-warm px-5 pt-5 pb-8">
              <SheetTitle className="sr-only">쌤씀 메뉴</SheetTitle>
              <Wordmark />
              <nav aria-label="모바일 메뉴" className="mt-6">
                <ul className="divide-y divide-border-default border-y border-border-default">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => onMobileNavClick(e, item.href)}
                        className="focus-ring flex min-h-14 items-center text-[18px] font-semibold text-ink-900"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <TrialLink className="mt-auto w-full" />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
