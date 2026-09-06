import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { siteConfig } from "../config/site";
import MobileMenu from "./MobileMenu";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/guides", label: "Guides" },
  { to: "/contact", label: "Contact" },
];

/**
 * The wordmark takes you to the top, not just to the home page.
 *
 * On any other page the route change does it — ScrollToTop jumps as the new
 * page mounts. But a reader already on the home page, halfway down it, clicked
 * the logo and nothing happened at all: React Router treats a link to the
 * current route as a no-op, so there was no navigation to scroll. So that case
 * is handled here, and smoothly, since the reader can see where they are going.
 */
function scrollToTop() {
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      {/* Announcement rule — scrolls away, the way it does on the reference site */}
      <div className="bg-deep py-2 text-center">
        <p className="text-[0.625rem] uppercase tracking-[0.2em] text-white/85">
          Corporate gifting, customised to your brand
        </p>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "border-line bg-white/95 backdrop-blur-md"
            : "border-transparent bg-white"
        }`}
      >
        {/* Centred wordmark, with the utility action held to the right edge. */}
        <div className="relative mx-auto flex max-w-[1400px] items-center justify-center px-6 sm:px-8">
          <Link
            to="/"
            onClick={() => {
              if (pathname === "/") scrollToTop();
            }}
            aria-label={`${siteConfig.name} — home`}
            className="flex items-center"
          >
            <img
              src={siteConfig.logo.lockup}
              alt={siteConfig.name}
              width={160}
              height={102}
              className={`w-auto transition-all duration-500 ${
                scrolled ? "h-10 py-1" : "h-14 py-2"
              }`}
            />
          </Link>

          <div className="absolute right-5 flex items-center gap-3 sm:right-8">
            <Link
              to="/quote"
              className="hidden text-[0.6875rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink sm:inline-flex"
            >
              Request a Quote
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
            >
              <svg width="20" height="12" viewBox="0 0 20 12" aria-hidden="true">
                <path
                  d="M0 1h20M0 6h20M0 11h20"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation sits on its own line beneath the mark. */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="mx-auto flex max-w-[1400px] items-center justify-center gap-12 px-8 pb-3">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `relative text-[0.6875rem] uppercase tracking-[0.16em] transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-ink after:transition-all after:duration-300 ${
                      isActive
                        ? "text-ink after:w-full"
                        : "text-muted after:w-0 hover:text-ink hover:after:w-full"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
