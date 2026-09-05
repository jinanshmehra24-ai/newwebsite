import { ButtonLink } from "./ui";
import { whatsappLink } from "../config/site";

/**
 * The catalogue on the site is a curated selection. This makes the fuller
 * range explicit and routes the visitor straight to a conversation.
 *
 * It sits on the catalogue, on each range, and on every product — a visitor who
 * lands on one pen from a search has seen none of the others, and would
 * otherwise take that single page for the whole of what we stock.
 */
export default function MoreRangeNotice({
  categoryName,
}: {
  categoryName?: string;
}) {
  const subject = categoryName
    ? `Hello Chandra & Co., could you share more options in ${categoryName}?`
    : "Hello Chandra & Co., could you share more product options from your range?";

  return (
    <aside className="border border-line bg-paper px-6 py-9 sm:px-10 sm:py-11">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <p className="eyebrow">More Than Shown Here</p>
          <h2 className="mt-3 text-[1rem] leading-tight text-ink sm:text-[1.125rem]">
            {categoryName
              ? `Looking for a different ${categoryName.replace(/s$/, "").toLowerCase()}?`
              : "Looking for something you don't see here?"}
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
            The site shows a selection of our pen catalogue. We carry many more models,
            finishes and price points — along with boxed gift sets, pen and card
            holder sets, metal keychains, mobile stands, desk organisers,
            paperweights, laptop and sling bags, printed jute bags, diary gift
            combos and doctor gifting items. Send us your requirement and we'll
            come back with options that fit.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <ButtonLink
            href={whatsappLink(subject)}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </ButtonLink>
          <ButtonLink to="/quote" variant="outline">
            Request a Quote
          </ButtonLink>
        </div>
      </div>
    </aside>
  );
}
