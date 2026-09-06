import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Breadcrumb from "../components/Breadcrumb";
import CTASection from "../components/CTASection";
import MoreRangeNotice from "../components/MoreRangeNotice";
import { ButtonLink } from "../components/ui";
import { categoryBySlug, categories } from "../data/categories";
import { byShape, products, productSrcSet } from "../data/products";
import { useReveal } from "../lib/useReveal";
import { useSeo } from "../lib/useSeo";
import NotFound from "./NotFound";

export default function CategoryDetail() {
  const { slug = "" } = useParams();
  const category = categoryBySlug(slug);
  const root = useReveal<HTMLDivElement>();

  const items = category
    ? byShape(products.filter((p) => p.category === category.slug))
    : [];

  useSeo(
    category
      ? {
          title: category.name,
          description: category.description,
          path: `/categories/${slug}`,
          image: `/products/${category.image}-1200.webp`,
        }
      : // NotFound sets its own tags, but this effect runs after the child's and
        // would overwrite them — leaving a missing page titled "Category" and,
        // more to the point, still open to indexing.
        { title: "Page not found", noindex: true },
  );

  if (!category) return <NotFound />;

  const others = categories.filter((c) => c.slug !== category.slug).slice(0, 4);

  return (
    <div ref={root}>
      <header className="relative isolate overflow-hidden bg-deep pb-14 pt-20 sm:pb-16 sm:pt-24">
        <img
          src={`/products/${category.image}-1200.webp`}
          srcSet={productSrcSet(category.image)}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          width={1200}
          height={800}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/60" />

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8">
          <Breadcrumb
            tone="light"
            trail={[
              { label: "Categories", to: "/categories" },
              { label: category.name },
            ]}
          />

          <div className="header-in mt-7 max-w-2xl">
            <div className="rule-accent w-16" />
            <h1 className="mt-6 text-[clamp(1.6rem,3.4vw,2.7rem)] text-white">
              {category.name}
            </h1>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-white/70">
              {category.description}
            </p>
            <p className="mt-6 text-[0.75rem] uppercase tracking-[0.16em] text-white">
              {items.length} {items.length === 1 ? "product" : "products"}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 py-14 sm:px-8 sm:py-24">
        <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => (
            <div
              key={p.slug}
              className="reveal"
              style={{ transitionDelay: `${(i % 4) * 55}ms` }}
            >
              <ProductCard product={p} priority={i < 4} />
            </div>
          ))}
        </div>

        <div className="mt-16">
          <MoreRangeNotice categoryName={category.name} />
        </div>

        <div className="mt-20 border-t border-line pt-14">
          <h2 className="text-[1.125rem] text-ink">Other categories</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                to={`/categories/${c.slug}`}
                className=" border border-line bg-white px-6 py-3 text-[0.8125rem] font-medium text-ink transition-colors hover:border-ink/40 hover:bg-paper"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <ButtonLink to="/categories" variant="outline" className="mt-8">
            View all categories
          </ButtonLink>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
