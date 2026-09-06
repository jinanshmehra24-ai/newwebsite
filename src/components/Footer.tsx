import { Link } from "react-router-dom";
import { siteConfig, mailLink, telLink, whatsappLink } from "../config/site";
import { categories } from "../data/categories";
import { NAV_LINKS } from "./Navbar";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-12 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <img
              src={siteConfig.logo.lockup}
              alt={siteConfig.name}
              width={170}
              height={109}
              loading="lazy"
              className="h-14 w-auto"
            />
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-white/65">
              Corporate gifting and promotional products branded for you, so
              your name stays in front of the people who matter.
            </p>
            <p className="mt-5 text-lg text-white">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="eyebrow text-white">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[0.9375rem] text-white/65 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/quote"
                  className="text-[0.9375rem] text-white/65 transition-colors hover:text-white"
                >
                  Request a Quote
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Product categories">
            <h2 className="eyebrow text-white">Categories</h2>
            <ul className="mt-5 space-y-3">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/categories/${c.slug}`}
                    className="text-[0.9375rem] text-white/65 transition-colors hover:text-white"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-white">Contact</h2>
            <address className="mt-5 space-y-4 text-[0.9375rem] not-italic leading-relaxed text-white/65">
              <p>
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2} – {siteConfig.address.postalCode}
                <br />
                {siteConfig.address.country}
              </p>
              <p className="space-y-1">
                <a
                  href={telLink}
                  className="block transition-colors hover:text-white"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
                <a
                  href={`tel:${siteConfig.contact.altPhone}`}
                  className="block transition-colors hover:text-white"
                >
                  {siteConfig.contact.altPhoneDisplay}
                </a>
              </p>
              <a
                href={mailLink}
                className="block break-all transition-colors hover:text-white"
              >
                {siteConfig.contact.email}
              </a>

              {/* The footer is on every page, so this is the one WhatsApp link
                  a visitor can always find, whatever they were reading. */}
              <a
                href={whatsappLink(
                  `Hello ${siteConfig.name}, I have a corporate gifting requirement I would like to discuss.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-[0.6875rem] font-semibold uppercase not-italic tracking-[0.14em] text-deep transition-colors hover:bg-whatsapp-dark"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.19-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
                </svg>
                Message Us
              </a>
            </address>
          </div>
        </div>

        <div className="mt-14 border-t border-white/12 pt-8">
          <p className="max-w-4xl text-[0.75rem] leading-relaxed text-white/40">
            {siteConfig.brandingDisclaimer}
          </p>
          <p className="mt-6 text-[0.8125rem] text-white/50">
            © {year} {siteConfig.name} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
