import { ButtonLink } from "../components/ui";
import { useSeo } from "../lib/useSeo";

export default function NotFound() {
  useSeo({
    title: "Page not found",
    description: "The page you were looking for could not be found.",
    noindex: true,
  });

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-5 py-32 text-center sm:px-8">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-5 text-[clamp(1.9rem,3.4vw,2.7rem)] text-ink">
        We couldn't find that page.
      </h1>
      <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-muted">
        The page may have moved. Browse the catalogue, or get in touch and we'll
        point you to the right product.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <ButtonLink to="/">Back to Home</ButtonLink>
        <ButtonLink to="/products" variant="outline">
          View Catalogue
        </ButtonLink>
        <ButtonLink to="/contact" variant="outline">
          Contact Us
        </ButtonLink>
      </div>
    </section>
  );
}
