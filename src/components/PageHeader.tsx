import type { ReactNode } from "react";
import Breadcrumb from "./Breadcrumb";

export type HeaderFact = {
  /** What the figure is. Kept to two or three words — this is a label, not a sentence. */
  label: string;
  value: string;
};

/**
 * The band at the top of every inner page.
 *
 * Two earlier versions of this went wrong in the same way. The first ran 470px
 * tall with 257px of it empty. The second filled the gap with three product
 * photographs at thumbnail size — decoration standing in for content, which is
 * the tell of a page nobody thought hard about.
 *
 * What sits there now is a short spec panel: figures counted from the
 * catalogue itself, so they cannot drift out of date, and each one answering a
 * question a buyer actually arrives with — how much is there, how little can I
 * order, how long will it take. A page that opens by answering is worth more
 * than one that opens by looking pretty.
 *
 * Pages with nothing to state — About, Contact, the quote form — run the type
 * alone at a wider measure. The band is short enough that no gap is left to
 * fill.
 */
export default function PageHeader({
  trail,
  eyebrow,
  title,
  intro,
  facts = [],
  note,
}: {
  trail: { label: string; to?: string }[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Figures for the panel at the right. Three or four read best. */
  facts?: HeaderFact[];
  /** A single line under the figures — used to say the catalogue is partial. */
  note?: ReactNode;
}) {
  const hasRail = facts.length > 0;

  return (
    <header
      className={`border-b border-line bg-paper pt-20 sm:pt-24 ${
        hasRail ? "" : "pb-11 sm:pb-14"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Breadcrumb trail={trail} />

        <div className="mt-7 gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end lg:gap-16">
          <div className="header-in max-w-2xl">
            <span
              aria-hidden
              className="block h-px w-9 origin-left bg-gold-500"
            />
            <p className="eyebrow mt-4">{eyebrow}</p>
            <h1 className="mt-3 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.15] text-ink">
              {title}
            </h1>
            {intro && (
              <p className="mt-5 text-[0.9375rem] leading-[1.8] text-muted">
                {intro}
              </p>
            )}
          </div>

          {note && (
            <p className="header-meta mt-7 border-l border-line pl-5 text-[0.8125rem] leading-[1.7] text-muted lg:mt-0">
              {note}
            </p>
          )}
        </div>
      </div>

      {hasRail && (
        /* The figures run as a rail across the foot of the band rather than a
           column at its side. Stacked at the side they pushed the band to
           597px — taller than the empty version it replaced, which rather
           defeated the point. Along the bottom they cost about seventy
           pixels and are read left to right in one pass. */
        <div className="mt-10 border-t border-line">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            {/* The bleed-and-repad trick used by the catalogue filters: the
                rail scrolls edge to edge on a narrow screen while its first
                figure still lines up with the heading above it. */}
            <dl className="no-bar -mx-5 flex overflow-x-auto px-5 sm:mx-0 sm:px-0">
              {facts.map((f, i) => (
                <div
                  key={f.label}
                  /* Wide enough that a two-word label stays on one line, or the
                     figures below it would sit at different heights. */
                  className={`min-w-[10.5rem] shrink-0 grow basis-0 border-line py-5 pr-6 ${
                    i === 0 ? "" : "border-l pl-6"
                  }`}
                >
                  <dt className="text-[0.625rem] uppercase tracking-[0.16em] text-muted">
                    {f.label}
                  </dt>
                  {/* Deliberately not the display serif. Marcellus draws its 0
                      on exactly the metrics of its O and its 1 barely apart
                      from its I, so "125" reads as "I25" and "100" as "IOO".
                      The serif carries the voice, the sans carries the
                      figures. */}
                  <dd className="mt-2 whitespace-nowrap text-[1.0625rem] leading-none text-ink">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </header>
  );
}
