import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import CTASection from "../components/CTASection";
import { ArrowRight, ButtonLink } from "../components/ui";
import { guideBySlug, guidesByDate } from "../data/guides";
import { categoryBySlug } from "../data/categories";
import { siteConfig, whatsappLink } from "../config/site";
import { useReveal } from "../lib/useReveal";
import { useSeo } from "../lib/useSeo";
import NotFound from "./NotFound";

const readable = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function GuideDetail() {
  const root = useReveal<HTMLDivElement>();
  const { slug = "" } = useParams();
  const guide = guideBySlug(slug);
  const range = guide?.range ? categoryBySlug(guide.range) : undefined;

  const others = useMemo(
    () =>
      guidesByDate()
        .filter((g) => g.slug !== slug)
        .slice(0, 3),
    [slug],
  );

  const jsonLd = useMemo(() => {
    if (!guide) return undefined;
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.summary,
      datePublished: guide.published,
      author: { "@type": "Organization", name: siteConfig.name },
      publisher: { "@type": "Organization", name: siteConfig.name },
      mainEntityOfPage: `${siteConfig.url}/guides/${guide.slug}`,
    };
  }, [guide]);

  useSeo(
    guide
      ? {
          title: guide.title,
          description: guide.summary,
          path: `/guides/${slug}`,
          jsonLd,
        }
      : // As on the product and category pages: this effect runs after the
        // child's and would otherwise leave a missing guide indexable.
        { title: "Page not found", noindex: true },
  );

  if (!guide) return <NotFound />;

  return (
    <div ref={root}>
      <header className="border-b border-line bg-paper pb-12 pt-20 sm:pb-16 sm:pt-24">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
          <Breadcrumb
            trail={[{ label: "Guides", to: "/guides" }, { label: guide.title }]}
          />

          <div className="header-in mt-7 max-w-3xl">
            <span aria-hidden className="block h-px w-9 bg-violet-500" />
            <p className="eyebrow mt-4">
              <time dateTime={guide.published}>
                {readable(guide.published)}
              </time>
              <span aria-hidden> · </span>
              {guide.readingMinutes} min read
            </p>
            <h1 className="mt-3 text-[clamp(1.85rem,4.4vw,3.4rem)] text-ink">
              {guide.title}
            </h1>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-[1400px] px-6 py-14 sm:px-8 sm:py-24">
        {/* A single measured column: this is prose, and prose is read, not
            scanned across a grid. */}
        <div className="max-w-2xl">
          <p className="reveal text-[1.0625rem] leading-[1.85] text-ink">
            {guide.intro}
          </p>

          {guide.sections.map((section, i) => (
            <section key={section.heading} className="reveal mt-14">
              <h2 className="text-[clamp(1.25rem,1.9vw,1.6rem)] text-ink">
                {section.heading}
              </h2>

              {section.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="mt-5 text-[1rem] leading-[1.85] text-muted"
                >
                  {p}
                </p>
              ))}

              {section.list && (
                <ul className="mt-7 space-y-3 border-t border-line pt-6">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 text-[0.9375rem] leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 h-px w-5 shrink-0 bg-violet-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {i === guide.sections.length - 1 && null}
            </section>
          ))}

          <aside className="reveal mt-16 border-t border-line pt-9">
            <p className="eyebrow">Still Deciding?</p>
            <p className="mt-4 text-[0.9375rem] leading-[1.8] text-muted">
              Send us the logo and tell us what the gift is for. We will say
              which method the artwork will survive, what it will cost at your
              quantity, and show you the placement before anything is made.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink
                href={whatsappLink(
                  `Hello ${siteConfig.name}, I was reading your guide "${guide.title}" and have a requirement to discuss.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask On WhatsApp
              </ButtonLink>
              {range && (
                <ButtonLink to={`/categories/${range.slug}`} variant="link">
                  See the {range.name}
                </ButtonLink>
              )}
            </div>
          </aside>
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-line bg-paper">
          <div className="mx-auto max-w-[1400px] px-6 py-14 sm:px-8 sm:py-24">
            <h2 className="text-[1.125rem] text-ink">More Guides</h2>

            <ul className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-3">
              {others.map((g) => (
                <li key={g.slug}>
                  <Link
                    to={`/guides/${g.slug}`}
                    className="group flex h-full flex-col border-t border-line pt-7 transition-colors duration-500 hover:border-violet-500"
                  >
                    <h3 className="text-[1.0625rem] leading-snug text-ink">
                      {g.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-muted">
                      {g.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.12em] text-muted transition-colors duration-300 group-hover:text-ink">
                      Read
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
}
