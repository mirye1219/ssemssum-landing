import { NAV_ITEMS, SITE } from "@/config/site";
import { Wordmark } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="pt-16 pb-28 lg:pb-16">
      <div className="container-landing flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <Wordmark />
          <p className="text-small mt-3 text-ink-600">{SITE.tagline}</p>
        </div>
        <nav aria-label="하단 메뉴">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="focus-ring text-small rounded text-ink-600 hover:text-ink-900">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-landing">
        <p className="text-small mt-12 border-t border-border-default pt-6 text-ink-600">© 2026 쌤씀. All rights reserved.</p>
      </div>
    </footer>
  );
}
