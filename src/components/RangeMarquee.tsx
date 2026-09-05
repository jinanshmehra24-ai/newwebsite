import { Link } from "react-router-dom";
import { ArrowRight } from "./ui";
import { whatsappLink } from "../config/site";

/**
 * The size of the range, shown rather than claimed.
 *
 * The grid above this holds pens, because pens are what the site has photographed
 * — but a visitor who has just scrolled a page of pens will reasonably conclude
 * that pens are all there is. A sentence saying otherwise is easy to skip; a band
 * that keeps moving past the edge of the screen is not, and it reads as "there is
 * more here than fits" without anyone having to write the words.
 *
 * The list is the one Chandra & Co. actually stocks, given by the business
 * itself — pens, gift sets, keychains, mobile stands, desk pieces, bags,
 * diary sets and doctor gifting.
 * Nothing is added to make the band look fuller; a buyer who asks for a
 * fridge magnet because a passing chip said so is a buyer we have misled.
 */
const RANGE = [
  "Metal Pens",
  "Plastic Ball Pens",
  "Gift Sets",
  "Pen & Card Holder Sets",
  "Metal Keychains",
  "Mobile Stands",
  "Desk Organisers",
  "Pen Stands",
  "Paperweights",
  "Carry Bags",
  "Laptop Bags",
  "Laptop Backpacks",
  "Sling Bags",
  "Diary Gift Combos",
  "Doctor Gifting Items",
];

/**
 * Four copies, not two.
 *
 * The band only reads as endless while content covers the whole width at every
 * moment of the loop. With the list this short, two copies leave the far edge
 * bare on a wide monitor at the point the track resets; four never do, and the
 * slide is a quarter of the track to match.
 */
const COPIES = [0, 1, 2, 3];

/** The second row starts further along, so the two never march in step. */
const rotate = (items: string[], by: number) => [
  ...items.slice(by),
  ...items.slice(0, by),
];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee">
      <div className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}>
        {COPIES.map((copy) => (
          <ul key={copy} aria-hidden={copy > 0} className="marquee-group">
            {items.map((item) => (
              <li key={item} className="chip">
                <span aria-hidden className="chip-dot" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function RangeMarquee() {
  return (
    <section
      aria-labelledby="range-heading"
      className="overflow-hidden border-y border-line bg-paper py-20 sm:py-24"
    >
      <div className="reveal mx-auto max-w-[1400px] px-5 text-center sm:px-8">
        <span aria-hidden className="mx-auto block h-px w-9 bg-gold-500" />
        <p className="eyebrow mt-4">Beyond The Pens</p>
        <h2
          id="range-heading"
          className="mx-auto mt-3 max-w-2xl text-[clamp(1.2rem,2.1vw,1.75rem)] tracking-[0.05em] text-ink"
        >
          There Is A Great Deal More Than This
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[0.9375rem] leading-[1.8] text-muted">
          What you see here is a fraction of the catalogue. Tell us the occasion
          and the budget — we are here, and we will come back with options.
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        <Row items={RANGE} />
        <Row items={rotate(RANGE, 5)} reverse />
      </div>

      <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-x-9 gap-y-4 px-5">
        <a
          href={whatsappLink(
            "Hello Chandra & Co., I'd like to see more of your range. Here is what I am looking for:",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 border-b border-ink/40 pb-1 text-[0.75rem] uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:border-gold-500"
        >
          Ask For The Full Range
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </a>
        <Link
          to="/quote"
          className="border-b border-ink/40 pb-1 text-[0.75rem] uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:border-gold-500"
        >
          Request a Quote
        </Link>
      </div>
    </section>
  );
}
