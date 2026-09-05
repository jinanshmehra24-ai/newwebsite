import type { ReactNode } from "react";
import Breadcrumb from "./Breadcrumb";
import Photo from "./Photo";

/**
 * The band at the top of every inner page.
 *
 * It used to run 470px tall with 257px of that empty — more than half the band
 * holding nothing, on every page of the site. The air is cut back here, and
 * what remains is given something to do: the rule draws itself in, the type
 * follows a beat later, and on the catalogue pages a few product photographs
 * sit at the right rather than blank paper.
 *
 * Pages with nothing to show — About, the guides, the forms — simply run the
 * type full width at the same reduced height. A stock photograph chosen to fill
 * a gap would be worse than the gap.
 */
export default function PageHeader({
  trail,
  eyebrow,
  title,
  intro,
  images = [],
}: {
  trail: { label: string; to?: string }[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Product slugs, shown as a small fan on the right from 1024px up. */
  images?: string[];
}) {
  return (
    <header className="border-b border-line bg-paper pb-12 pt-20 sm:pb-16 sm:pt-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Breadcrumb trail={trail} />

        <div className="mt-7 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="header-in max-w-xl">
            <span
              aria-hidden
              className="block h-px w-9 origin-left bg-gold-500"
            />
            <p className="eyebrow mt-4">{eyebrow}</p>
            <h1 className="mt-3 text-[clamp(1.3rem,2.6vw,1.9rem)] text-ink">
              {title}
            </h1>
            {intro && (
              <p className="mt-4 text-[0.9375rem] leading-[1.8] text-muted">
                {intro}
              </p>
            )}
          </div>

          {images.length > 0 && (
            <ul aria-hidden className="hidden justify-end gap-4 lg:flex">
              {images.slice(0, 3).map((slug, i) => (
                <li
                  key={slug}
                  className="header-fan w-[9.5rem] shrink-0 overflow-hidden bg-white"
                  /* Stepped down the page so the three read as a fan rather
                     than a row of tiles. */
                  style={{
                    transform: `translateY(${i * 14}px)`,
                    animationDelay: `${140 + i * 90}ms`,
                  }}
                >
                  <Photo
                    /* No srcSet: the slot is 152px and offering the 1200px
                       file only invites a browser on a dense screen to fetch
                       it for a decorative thumbnail. */
                    src={`/products/${slug}-600.webp`}
                    alt=""
                    width={600}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
