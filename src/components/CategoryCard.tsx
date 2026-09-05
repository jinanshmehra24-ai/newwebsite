import { Link } from "react-router-dom";
import Photo from "./Photo";
import type { Category } from "../data/categories";
import { productSrcSet } from "../data/products";

/**
 * The photograph is left alone — no scrim, no overlaid type. The range name
 * reads underneath it, centred and small.
 */
export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link to={`/categories/${category.slug}`} className="group block">
      <div
        /* Matches the product photography's own 4:5 frame, so the pen is shown
           whole rather than cropped to a band across its middle. */
        className="aspect-[4/5] overflow-hidden bg-paper"
      >
        <Photo
          src={`/products/${category.image}-600.webp`}
          srcSet={productSrcSet(category.image)}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 33vw"
          alt={`${category.name} from Chandra & Co.`}
          width={600}
          height={750}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>

      <div className="pt-5 text-center">
        <h3 className="caption">{category.name}</h3>
        <p className="mx-auto mt-2 max-w-[22rem] text-[0.8125rem] leading-relaxed text-muted">
          {category.short}
        </p>
      </div>
    </Link>
  );
}
