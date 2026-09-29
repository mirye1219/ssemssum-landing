"use client";

import { useEffect, useState } from "react";
import { SECTION_IDS } from "@/config/site";
import { cn } from "@/lib/utils";
import { TrialLink } from "./cta-link";

/** 모바일 고정 CTA: 첫 화면을 지난 뒤에만 보이고, 마지막 CTA 섹션과 겹치면 숨긴다. */
export function MobileStickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [atFinal, setAtFinal] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(SECTION_IDS.top);
    const final = document.getElementById(SECTION_IDS.cta);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setPastHero(!e.isIntersecting);
        if (e.target === final) setAtFinal(e.isIntersecting);
      }
    });
    if (hero) io.observe(hero);
    if (final) io.observe(final);
    return () => io.disconnect();
  }, []);

  const visible = pastHero && !atFinal;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-border-default bg-surface-warm/95 px-5 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-md transition-[transform,opacity] duration-300 lg:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      aria-hidden={!visible}
      inert={!visible}
    >
      <TrialLink className="w-full" />
    </div>
  );
}
