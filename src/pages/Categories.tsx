import { useMemo, useState } from "react";
import CategoryTile from "../components/CategoryTile";
import CTASection from "../components/CTASection";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { useReveal } from "../lib/useReveal";
import PageHeader from "../components/PageHeader";
import { useSeo } from "../lib/useSeo";

export default function Categories() {
  const root = useReveal<HTMLDivElement>();
  const [query, setQuery] = useState("");

  /* Counted once for all nine rather than filtered per tile inside the map,
     which walked 126 products nine times on every keystroke. */
  const counts = useMemo(() => {
    const tally = new Map<string, number>();
    for (const p of products) tally.set(p.category, (tally.get(p.category) ?? 0) + 1);
    return tally;
  }, []);

  /*
   * What each range can be found by: its own name and copy, and the names of
   * the pieces inside it.
   *
   * The copy alone was not enough. "Engraving" finds the metal range because
   * the description happens to say so, but "backpack" found nothing at all —
   * the word appears only on the product, not on the range that holds it. A
   * buyer searches for the thing they want, not for the heading we filed it
   * under, so the pieces are folded into the haystack.
   */
  const haystacks = useMemo(() => {
    const bag = new Map<string, string[]>();
    for (const p of products) {
      const list = bag.get(p.category) ?? [];
      list.push(p.name, p.type);
      bag.set(p.category, list);
    }
    return new Map(
      categories.map((c) => [
        c.slug,
        `${c.name} ${c.short} ${c.description} ${(bag.get(c.slug) ?? []).join(" ")}`.toLowerCase(),
      ]),
    );
  }, []);

  const shown = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return categories;
    return categories.filter((c) => haystacks.get(c.slug)?.includes(term));
  }, [query, haystacks]);

  useSeo({
    title: "Categories",
    description:
      "Explore Chandra & Co. pen ranges — executive metal pens for corporate gifting, plus the Elite and Supreme plastic ball pen ranges for high-volume campaigns.",
    path: "/categories",
  });

  return (
    <div ref={root}>
      <PageHeader
        trail={[{ label: "Categories" }]}
        eyebrow={"Range"}
        title={"Categories"}
        intro={
          "Four pen ranges and five gifting ranges, each built around a different corporate requirement — from a boxed set for a client to a print run for a whole dealer network."
        }
        note={
          "Not everything we supply has been photographed yet. Tell us what the gift is for and we will send images of what fits."
        }
      />

      <div className="mx-auto max-w-[1400px] px-6 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
          <label className="sm:max-w-xs sm:flex-1">
            <span className="sr-only">Search the ranges</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the ranges..."
              className="w-full border-b border-line bg-transparent pb-2 text-[0.9375rem] text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none"
            />
          </label>

          <p className="text-[0.8125rem] text-muted" aria-live="polite">
            {shown.length} of {categories.length} ranges
          </p>
        </div>

        {shown.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
            {shown.map((c, i) => (
              <div
                key={c.slug}
                className="reveal h-full"
                style={{ transitionDelay: `${(i % 3) * 60}ms` }}
              >
                <CategoryTile category={c} count={counts.get(c.slug) ?? 0} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 max-w-md">
            <p className="text-[0.9375rem] text-ink">
              Nothing here matches “{query.trim()}”.
            </p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
              Not everything we supply has been photographed yet. Tell us what
              the gift is for and we will send images of what fits.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-5 border-b border-ink/40 pb-1.5 pt-1.5 text-[0.75rem] uppercase tracking-[0.12em] text-ink transition-colors hover:border-violet-500"
            >
              Show all ranges
            </button>
          </div>
        )}
      </div>

      <CTASection />
    </div>
  );
}
