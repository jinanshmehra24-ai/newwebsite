import CategoryCard from "../components/CategoryCard";
import CTASection from "../components/CTASection";
import { categories } from "../data/categories";
import { products, smallestOrder } from "../data/products";
import { useReveal } from "../lib/useReveal";
import PageHeader from "../components/PageHeader";
import { useSeo } from "../lib/useSeo";

export default function Categories() {
  const root = useReveal<HTMLDivElement>();

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
        facts={[
          { label: "Ranges", value: String(categories.length) },
          { label: "Pieces", value: String(products.length) },
          { label: "Smallest order", value: smallestOrder() },
        ]}
        note={
          "Not everything we supply has been photographed yet. Tell us what the gift is for and we will send images of what fits."
        }
      />

      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const count = products.filter((p) => p.category === c.slug).length;
            return (
              <div
                key={c.slug}
                className="reveal"
                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
              >
                <CategoryCard category={c} />
                <p className="mt-3 text-[0.8125rem] text-muted">
                  {count} {count === 1 ? "product" : "products"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <CTASection />
    </div>
  );
}
