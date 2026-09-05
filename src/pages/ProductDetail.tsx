import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "../components/ui";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import ProductEnquiry from "../components/ProductEnquiry";
import MoreRangeNotice from "../components/MoreRangeNotice";
import { productBySlug, products, productSrcSet } from "../data/products";
import { categoryBySlug } from "../data/categories";
import { siteConfig } from "../config/site";
import { useSeo } from "../lib/useSeo";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { slug = "" } = useParams();
  const product = productBySlug(slug);
  const [activeImage, setActiveImage] = useState(0);

  const category = product ? categoryBySlug(product.category) : undefined;

  const related = useMemo(() => {
    if (!product) return [];
    // Prefer same-shaped siblings so the related row lines up.
    const siblings = products.filter(
      (p) => p.category === product.category && p.slug !== product.slug,
    );
    const sameShape = siblings.filter((p) => p.shape === product.shape);
    return (sameShape.length >= 4 ? sameShape : siblings).slice(0, 4);
  }, [product]);

  const jsonLd = useMemo(() => {
    if (!product) return undefined;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      sku: product.sku,
      category: category?.name,
      description: product.description,
      image: `${siteConfig.url}/products/${product.slug}-1200.webp`,
      brand: { "@type": "Brand", name: siteConfig.name },
      manufacturer: { "@type": "Organization", name: siteConfig.name },
    };
  }, [product, category]);

  useSeo(
    product
      ? {
          title: product.name,
          description: product.description,
          path: `/products/${slug}`,
          image: `/products/${product.slug}-1200.webp`,
          jsonLd,
        }
      : // NotFound sets its own tags, but this effect runs after the child's
        // and would overwrite them — leaving a missing page titled "Product"
        // and, more to the point, still open to indexing.
        { title: "Page not found", noindex: true },
  );

  if (!product) return <NotFound />;

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-5 pt-26 sm:px-8 sm:pt-40">
        <Breadcrumb
          trail={[
            { label: "Products", to: "/products" },
            {
              label: category?.name ?? "Category",
              to: `/categories/${product.category}`,
            },
            { label: product.name },
          ]}
        />
      </div>

      <article className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Gallery */}
          <div>
            <div className="border border-line bg-paper">
              <img
                src={product.images[activeImage]}
                srcSet={productSrcSet(product.slug)}
                sizes="(max-width: 1024px) 92vw, 46vw"
                alt={`${product.name} — ${category?.name} by Chandra & Co.`}
                width={product.width}
                height={product.height}
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-current={i === activeImage}
                    className={`h-20 w-20 overflow-hidden border transition-colors ${
                      i === activeImage ? "border-line" : "border-line"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      width={80}
                      height={80}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detail */}
          <div>
            <p className="eyebrow">{category?.name}</p>
            <h1 className="mt-4 text-[clamp(1.05rem,1.6vw,1.375rem)] text-ink">
              {product.name}
            </h1>

            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-y border-line py-5 text-[0.875rem]">
              {product.sku && (
                <div className="flex gap-2">
                  <dt className="text-muted">SKU</dt>
                  <dd className="font-mono text-ink">{product.sku}</dd>
                </div>
              )}
              {product.moq && (
                <div className="flex gap-2">
                  <dt className="text-muted">Minimum order</dt>
                  <dd className="text-ink">{product.moq}</dd>
                </div>
              )}
              <div className="flex gap-2">
                <dt className="text-muted">Pricing</dt>
                <dd className="text-ink">Quoted on requirement</dd>
              </div>
            </dl>

            <p className="mt-7 text-[1.0625rem] leading-relaxed text-muted">
              {product.description}
            </p>

            <div className="mt-9 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="eyebrow">Features</h2>
                <ul className="mt-4 space-y-2.5">
                  {product.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-3 text-[0.9375rem] text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="eyebrow">Customization</h2>
                <ul className="mt-4 space-y-2.5">
                  {product.customization.map((c) => (
                    <li
                      key={c}
                      className="flex gap-3 text-[0.9375rem] text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ProductEnquiry product={product} />

            <p className="mt-7 text-[0.875rem] leading-relaxed text-muted">
              This is one of a much wider range — the site shows a selection,
              not the whole of what we stock. If this one is close but not quite
              right, say so and we will send alternatives.
            </p>

            <p className="mt-8 border-t border-line pt-6 text-[0.8125rem] leading-relaxed text-muted">
              {siteConfig.brandingDisclaimer}
            </p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-paper">
          <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[1.125rem] text-ink">
                More from {category?.name}
              </h2>
              <Link
                to={`/categories/${product.category}`}
                className="group inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink"
              >
                View category
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>

            <div className="mt-10 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1400px] px-5 pb-24 pt-20 sm:px-8 sm:pb-28">
        <MoreRangeNotice categoryName={category?.name} />
      </section>
    </div>
  );
}
