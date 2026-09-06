import { Link } from "react-router-dom";
import { SectionHeading, ArrowRight, ButtonLink } from "./ui";
import { guidesByDate } from "../data/guides";

/**
 * Three of the guides, on the way to the enquiry form.
 *
 * Most people arrive at a supplier before they have decided what they want, and
 * the guides answer the questions they are actually stuck on. Putting them here
 * also gives the home page somewhere to send a visitor who is not ready to ask
 * for a price — which is most of them, most of the time.
 */
export default function GuidesTeaser() {
  const list = guidesByDate().slice(0, 3);
  if (list.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 sm:py-28">
      <div className="reveal">
        <SectionHeading
          align="center"
          eyebrow="Before You Order"
          title="Buying Guides"
          intro="Which branding method suits which barrel, how many pieces an event really needs, and what artwork survives at pen size."
        />
      </div>

      <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-3">
        {list.map((g, i) => (
          <li
            key={g.slug}
            className="reveal"
            style={{ transitionDelay: `${(i % 3) * 70}ms` }}
          >
            <Link
              to={`/guides/${g.slug}`}
              className="group flex h-full flex-col border-t border-line pt-7 transition-colors duration-500 hover:border-violet-500"
            >
              <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                {g.readingMinutes} min read
              </p>
              <h3 className="mt-3 text-[1.0625rem] leading-snug text-ink">
                {g.title}
              </h3>
              <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-muted">
                {g.summary}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.12em] text-muted transition-colors duration-300 group-hover:text-ink">
                Read
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="reveal mt-12 text-center">
        <ButtonLink to="/guides" variant="link">
          All Guides
        </ButtonLink>
      </div>
    </section>
  );
}
