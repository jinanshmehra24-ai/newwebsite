import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import { ArrowRight } from "../components/ui";
import { guidesByDate } from "../data/guides";
import { useReveal } from "../lib/useReveal";
import PageHeader from "../components/PageHeader";
import { useSeo } from "../lib/useSeo";

const readable = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function Guides() {
  const root = useReveal<HTMLDivElement>();
  const list = guidesByDate();

  useSeo({
    title: "Buying Guides",
    description:
      "Practical guides to ordering branded corporate pens — choosing between screen printing, laser engraving and UV, working out quantities, preparing artwork, and deciding between metal and plastic.",
    path: "/guides",
  });

  return (
    <div ref={root}>
      <PageHeader
        trail={[{ label: "Guides" }]}
        eyebrow={"Before You Order"}
        title={"Buying Guides"}
        intro={
          "The questions that come before the catalogue — which branding method suits which barrel, how many pieces an event really needs, and what artwork survives at pen size."
        }
        note={
          "These are the questions we are asked most often. If yours is not answered here, send it across and we will answer it directly."
        }
      />

      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        <ul className="border-t border-line">
          {list.map((g, i) => (
            <li
              key={g.slug}
              className="reveal border-b border-line"
              style={{ transitionDelay: `${(i % 4) * 60}ms` }}
            >
              <Link
                to={`/guides/${g.slug}`}
                className="group flex flex-col gap-4 py-9 sm:py-11 lg:flex-row lg:items-center lg:gap-14"
              >
                <div className="lg:flex-1">
                  <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                    <time dateTime={g.published}>{readable(g.published)}</time>
                    <span aria-hidden> · </span>
                    {g.readingMinutes} min read
                  </p>
                  <h2 className="mt-3 text-[clamp(1.25rem,1.9vw,1.6rem)] text-ink">
                    {g.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-[0.9375rem] leading-[1.8] text-muted">
                    {g.summary}
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center gap-2 border-b border-ink/40 pb-1 text-[0.75rem] uppercase tracking-[0.12em] text-ink transition-colors duration-300 group-hover:border-violet-500">
                  Read
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <CTASection />
    </div>
  );
}
