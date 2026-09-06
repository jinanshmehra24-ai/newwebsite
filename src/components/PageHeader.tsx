import type { ReactNode } from "react";
import Breadcrumb from "./Breadcrumb";

/**
 * The band at the top of every inner page.
 *
 * Three versions of this have now been wrong, each in its own way. The first
 * ran 470px tall with 257px of it empty. The second filled the gap with three
 * product photographs at thumbnail size — decoration standing in for content.
 * The third put a rail of counted figures along the foot: pieces shown,
 * ranges, smallest order, branding. That one was at least true, but on the
 * catalogue page it restated the filter row immediately beneath it — which
 * already reads "All (126)" and gives every range its own count — and it
 * turned the opening of a page into a specification table.
 *
 * So the band says one thing now. The heading, a line of introduction, and at
 * the right a single sentence addressed to the reader rather than about the
 * stock. The figures stay where they were always going to be read: in the
 * filters, on the product page, on the guide cards.
 */
export default function PageHeader({
  trail,
  eyebrow,
  title,
  intro,
  note,
}: {
  trail: { label: string; to?: string }[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** One sentence at the right — used to say the catalogue is partial. */
  note?: ReactNode;
}) {
  return (
    <header className="border-b border-line bg-paper pb-11 pt-20 sm:pb-14 sm:pt-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
        <Breadcrumb trail={trail} />

        <div className="mt-7 gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end lg:gap-16">
          <div className="header-in max-w-2xl">
            <span
              aria-hidden
              className="block h-px w-9 origin-left bg-violet-500"
            />
            <p className="eyebrow mt-4">{eyebrow}</p>
            <h1 className="mt-3 text-[clamp(1.85rem,4.4vw,3.4rem)] text-ink">
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
    </header>
  );
}
