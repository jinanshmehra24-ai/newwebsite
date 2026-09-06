import { Link } from "react-router-dom";
import Photo from "./Photo";
import type { Category } from "../data/categories";

/**
 * A range, at a size that lets all nine be seen at once.
 *
 * The full CategoryCard gives each range a 4:5 photograph and a sentence of
 * its own, which is right on the home page where three of them are an
 * invitation. On the index of every range it made a page four thousand pixels
 * long: to compare the ninth against the first you had to scroll past
 * everything in between and remember what you saw.
 *
 * This is the same information at a glance — a square of the photograph, the
 * name, and how many pieces are in it. Two across on a phone, three on a
 * laptop, so the whole list stands inside one screen either way.
 */
export default function CategoryTile({
  category,
  count,
}: {
  category: Category;
  count: number;
}) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      /* h-full so two tiles sharing a row match, whatever their names do:
         "Metal Executive Pens" takes three lines in a phone column while
         "Bags" takes one, and without it the row came out ragged. */
      className="group flex h-full items-center gap-2.5 rounded-2xl border border-line bg-white p-2 transition-colors duration-300 hover:border-ink/25 sm:gap-4 sm:p-3"
    >
      {/* Small enough on a phone that two tiles sit across a 375px screen and
          all nine stand inside one view; it grows back at 640px, where there
          is width to spare. */}
      <div className="card-radius aspect-square w-11 shrink-0 bg-sand sm:w-16 lg:w-[4.5rem]">
        <Photo
          src={`/products/${category.image}-600.webp`}
          alt=""
          width={600}
          height={600}
          loading="lazy"
          decoding="async"
          className="card-zoom h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0">
        <h3 className="text-[0.8125rem] leading-tight text-ink sm:text-[0.9375rem]">
          {category.name}
        </h3>
        <p className="mt-1 text-[0.6875rem] text-muted sm:text-[0.75rem]">
          {count} {count === 1 ? "piece" : "pieces"}
        </p>
      </div>
    </Link>
  );
}
