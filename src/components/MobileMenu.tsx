import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { siteConfig, telLink, whatsappLink } from "../config/site";
import { NAV_LINKS } from "./Navbar";
import { categories } from "../data/categories";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[55] lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/60 transition-opacity duration-400 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute right-0 top-0 flex h-full w-[min(88vw,26rem)] flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <img
            src={siteConfig.logo.lockup}
            alt={siteConfig.name}
            width={120}
            height={77}
            className="h-10 w-auto"
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center border border-line text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M1 1l14 14M15 1L1 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-7">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `block border-b border-line/70 py-4 text-2xl transition-colors ${
                      isActive ? "text-muted" : "text-ink hover:text-muted"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-9">Categories</p>
          <ul className="mt-4 space-y-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/categories/${c.slug}`}
                  className="text-[0.9375rem] text-muted transition-colors hover:text-ink"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-line px-6 py-6">
          <Link
            to="/quote"
            className="flex w-full items-center justify-center bg-ink px-6 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white"
          >
            Request a Quote
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={telLink}
              className="flex items-center justify-center border border-line px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink"
            >
              Call
            </a>
            <a
              href={whatsappLink("Hello Chandra & Co., I'd like to discuss a corporate gifting requirement.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center border border-line px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
