import { Link } from "react-router-dom";
import { SectionHeading } from "./ui";
import { testimonials } from "../data/testimonials";
import { productBySlug } from "../data/products";

/**
 * Renders nothing until there is something true to render.
 *
 * A supplier page with no testimonials reads as new. One with invented
 * testimonials reads as dishonest, and a corporate buyer who spots a single
 * fake quote stops believing the delivery promise as well. So the section is
 * built and waiting, and stays out of the page until real quotes exist.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-y border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 sm:py-28">
        <div className="reveal">
          <SectionHeading
            align="center"
            eyebrow="In Their Words"
            title="What Our Clients Say"
          />
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            const product = t.product ? productBySlug(t.product) : undefined;
            return (
              <li
                key={t.quote.slice(0, 40)}
                className="reveal flex flex-col border-t border-line pt-7"
                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
              >
                <span aria-hidden className="block h-px w-7 bg-violet-500" />
                <blockquote className="mt-6 flex-1 text-[0.9375rem] leading-[1.85] text-ink">
                  {t.quote}
                </blockquote>
                <footer className="mt-7 border-t border-line pt-5">
                  <p className="caption">{t.name}</p>
                  <p className="mt-1.5 text-[0.8125rem] text-muted">
                    {t.company ? `${t.role}, ${t.company}` : t.role}
                  </p>
                  {product && (
                    <Link
                      to={`/products/${product.slug}`}
                      className="mt-3 inline-block border-b border-ink/30 pb-0.5 text-[0.6875rem] uppercase tracking-[0.12em] text-muted transition-colors duration-300 hover:border-violet-500 hover:text-ink"
                    >
                      {product.name}
                    </Link>
                  )}
                </footer>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
