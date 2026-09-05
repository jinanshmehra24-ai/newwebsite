import { Link } from "react-router-dom";
import Photo from "./Photo";
import type { Product } from "../data/products";
import { productSrcSet } from "../data/products";
import { categoryBySlug } from "../data/categories";

/**
 * No frame, no rules, no hover chrome — the photograph sits on a soft ground
 * and the name sits quietly beneath it.
 */
export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const category = categoryBySlug(product.category);

  return (
    <article className="group relative flex h-full flex-col">
      <Link
        to={`/products/${product.slug}`}
        className="block overflow-hidden bg-paper"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Photo
          src={`/products/${product.slug}-600.webp`}
          srcSet={productSrcSet(product.slug)}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 25vw"
          alt={`${product.name} — ${category?.name ?? "corporate gifting"} by Chandra & Co.`}
          width={product.width}
          height={product.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="block h-auto w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col items-center px-2 pt-5 text-center">
        <h3 className="caption">
          <Link
            to={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {product.name}
          </Link>
        </h3>

        {/* Always occupies a line so cards stay the same height with or without a code. */}
        <p className="mt-1.5 min-h-[1rem] text-[0.6875rem] tracking-[0.06em] text-muted">
          {product.sku ? `SKU ${product.sku}` : ""}
        </p>

        <span className="mt-3 border-b border-transparent pb-0.5 text-[0.6875rem] uppercase tracking-[0.12em] text-muted transition-colors duration-300 group-hover:border-gold-500 group-hover:text-ink">
          Request a Quote
        </span>
      </div>
    </article>
  );
}
