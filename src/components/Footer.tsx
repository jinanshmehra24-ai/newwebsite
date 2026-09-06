import { Link } from "react-router-dom";
import { siteConfig, mailLink, telLink } from "../config/site";
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
