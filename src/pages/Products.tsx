import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import CTASection from "../components/CTASection";
import MoreRangeNotice from "../components/MoreRangeNotice";
import { categories, type CategorySlug } from "../data/categories";
import { byShape, products } from "../data/products";
import { useReveal } from "../lib/useReveal";
import PageHeader from "../components/PageHeader";
import { useSeo } from "../lib/useSeo";

const PAGE_SIZE = 24;

export default function Products() {
  const [params, setParams] = useSearchParams();
  const active = params.get("category") as CategorySlug | null;
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);
  const root = useReveal<HTMLDivElement>();

  useSeo({
    title: "Products",
    description:
      "Browse the Chandra & Co. pen catalogue — laser-engraved executive metal pens plus the Elite and Supreme plastic ball pen ranges, customized with your company branding.",
    path: "/products",
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = products.filter((p) => {
      if (active && p.category !== active) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        (p.sku?.toLowerCase().includes(q) ?? false)
      );
    });
    // Same-shaped cards sit together, so the top of the grid stays aligned.
    return byShape(matches);
  }, [active, query]);

  const setCategory = (slug: CategorySlug | null) => {
    const next = new URLSearchParams(params);
    if (slug) next.set("category", slug);
    else next.delete("category");
    setParams(next, { replace: true });
    setShown(PAGE_SIZE);
  };

  return (
    <div ref={root}>
      <PageHeader
        trail={[{ label: "Products" }]}
        eyebrow={"Catalogue"}
        title={"Products"}
        intro={
          "Every piece below is drawn from our current corporate gifting and promotional catalogue. Pricing is quoted against your quantity and branding requirement."
        }
        images={[
          "gift-set-executive-navy",
          "metal-pen-26088",
          "keychain-plate-gold",
        ]}
      />

      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Horizontal strip on small screens so filters never push the grid off-screen */}
          <div
            role="group"
            aria-label="Filter by category"
            className="-mx-5 flex gap-7 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            <FilterChip active={!active} onClick={() => setCategory(null)}>
              All ({products.length})
            </FilterChip>
            {categories.map((c) => {
              const count = products.filter(
                (p) => p.category === c.slug,
              ).length;
              return (
                <FilterChip
                  key={c.slug}
                  active={active === c.slug}
                  onClick={() => setCategory(c.slug)}
                >
                  {c.name} ({count})
                </FilterChip>
              );
            })}
          </div>

          <div className="lg:w-72">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShown(PAGE_SIZE);
              }}
              placeholder="Search by name or SKU…"
              className="w-full border-0 border-b border-line bg-transparent px-0 py-2 text-[0.8125rem] placeholder:text-muted/60 focus:border-ink focus:outline-none"
            />
          </div>
        </div>

        <p aria-live="polite" className="mt-6 text-[0.875rem] text-muted">
          Showing {Math.min(shown, filtered.length)} of {filtered.length}{" "}
          products
        </p>

        {filtered.length === 0 ? (
          <p className="py-24 text-center text-2xl text-muted">
            No products match that search.
          </p>
        ) : (
          <div className="mt-6 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.slice(0, shown).map((p, i) => (
              <div
                key={p.slug}
                className="reveal"
                /* Staggered along the row only. Carrying the delay down a grid
                   of a hundred would leave the last card waiting seconds. */
                style={{ transitionDelay: `${(i % 4) * 55}ms` }}
              >
                <ProductCard product={p} priority={i < 4} />
              </div>
            ))}
          </div>
        )}

        {shown < filtered.length && (
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={() => setShown((s) => s + PAGE_SIZE)}
              className="rounded-sm border border-ink/25 px-8 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              Load more products
            </button>
          </div>
        )}

        <div className="mt-16">
          <MoreRangeNotice
            categoryName={
              active
                ? categories.find((c) => c.slug === active)?.name
                : undefined
            }
          />
        </div>
      </div>

      <CTASection />
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 whitespace-nowrap border-b pb-1.5 text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
        active
          ? "border-ink text-ink"
          : "border-transparent text-muted hover:border-ink/30 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
