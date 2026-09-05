import { ButtonLink, SectionHeading } from "../components/ui";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import BrandPromise from "../components/BrandPromise";
import HeroCarousel from "../components/HeroCarousel";
import Capabilities from "../components/Capabilities";
import RangeMarquee from "../components/RangeMarquee";
import CTASection from "../components/CTASection";
import Testimonials from "../components/Testimonials";
import GuidesTeaser from "../components/GuidesTeaser";
import EnquiryForm from "../components/EnquiryForm";
import ContactOptions from "../components/ContactOptions";
import { categories } from "../data/categories";
import { products } from "../data/products";
import {
  assurances,
  whyPoints,
  useCases,
  brandingMethods,
} from "../data/content";
import { useReveal } from "../lib/useReveal";
import { useSeo } from "../lib/useSeo";

/**
 * All one shape so the featured grid lines up exactly, and spread across the
 * four ranges so the row shows the breadth of the catalogue.
 */
const FEATURED = [
  "metal-pen-26088",
  "metal-pen-26080",
  "metal-pen-26089",
  "metal-pen-26090",
  "elite-ball-pen-01",
  "prime-pen-26015",
  "supreme-apollo-rgtr",
  "supreme-comet-jsw",
];

export default function Home() {
  const root = useReveal<HTMLDivElement>();
  const featured = FEATURED.map((s) =>
    products.find((p) => p.slug === s),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  useSeo({ path: "/" });

  return (
    <div ref={root}>
      {/* ---------------------------------------------------------------- Hero */}
      {/* One layout, at every width.
          It used to be two. Below 1280px the headline sat under the picture
          and a translucent white bar floated on top of it carrying the two
          links; above 1280px the whole text block moved onto the photograph
          inside a second white panel. Neither was designed so much as
          negotiated, and a frosted white box laid over a photograph is the
          most template-looking device on the web.
          The photograph is now left alone — no panels, no pills, not even the
          controls — and the words are given the paper below it, where they can
          be as large as they deserve without fighting a picture for contrast.
          The eye reads the product, then the promise. */}
      <section className="bg-paper">
        <HeroCarousel />

        <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16">
          <div className="grid gap-9 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-20">
            <div className="header-in">
              <span aria-hidden className="block h-px w-9 origin-left bg-gold-500" />
              <p className="eyebrow mt-4">Corporate Gifting · New Delhi</p>
              <h1 className="mt-4 text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.02] text-ink">
                Put Your Name in Their Hands.
              </h1>
            </div>

            {/* Held to the baseline of the headline rather than its top, so the
                two columns meet along one line instead of floating apart. */}
            <div className="header-meta lg:pb-2">
              <p className="max-w-md text-[0.9375rem] leading-[1.9] text-muted">
                Corporate gifts branded for you and delivered where you need
                them — so the people you are trying to reach carry your name
                every day.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink to="/products">Explore Products</ButtonLink>
                <ButtonLink to="/quote" variant="link">
                  Request a Quote
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Categories */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="reveal">
          <SectionHeading
            align="center"
            eyebrow="Product Range"
            title="Products That Represent Your Brand"
            intro="Nine ranges, every one of them a surface for your logo — pick the one that suits who is receiving it."
          />
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <div
              key={c.slug}
              className="reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <CategoryCard category={c} />
            </div>
          ))}
        </div>
      </section>

      <RangeMarquee />

      {/* ---------------------------------------------------- Featured products */}
      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
          <div className="reveal">
            <SectionHeading
              align="center"
              eyebrow="Selected Pieces"
              title="Featured Products"
              intro="A cross-section of the pen catalogue — from laser-engraved metal bodies to high-volume promotional ranges."
            />
          </div>

          <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <div
                key={p.slug}
                className="reveal"
                style={{ transitionDelay: `${(i % 4) * 60}ms` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Capabilities />

      <BrandPromise />

      {/* ------------------------------------------------------ Custom branding */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="reveal relative">
            <img
              src="/editorial/editorial-branding-900.webp"
              alt="Corporate ball pens printed with company branding, arranged on a marble desk"
              width={900}
              height={600}
              loading="lazy"
              decoding="async"
              className="w-full object-cover"
            />
            <img
              src="/editorial/editorial-custom-900.webp"
              alt="A set of branded pens in bespoke corporate colours"
              width={420}
              height={280}
              loading="lazy"
              decoding="async"
              className="absolute -bottom-10 -right-4 hidden w-[46%] border-8 border-white object-cover shadow-xl sm:block"
            />
          </div>

          <div className="reveal">
            <SectionHeading
              eyebrow="Custom Branding"
              title={
                <>
                  Your Brand. On Products
                  <br className="hidden sm:block" /> People Remember.
                </>
              }
              intro="The method is chosen for the material and the mark, so your logo reads as sharply on a moulded barrel as it does on your letterhead."
            />

            <ul className="mt-10 space-y-5">
              {brandingMethods.map((m) => (
                <li key={m.title} className="border-t border-line pt-5">
                  <h3 className="text-[0.9375rem] text-ink">{m.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                    {m.body}
                  </p>
                </li>
              ))}
            </ul>

            <ButtonLink to="/quote" className="mt-10">
              Get a Custom Quote
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Why us */}
      <section className="bg-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
          <div className="reveal">
            <SectionHeading
              eyebrow="Why Chandra & Co."
              title="Built Around Your Brand"
              tone="light"
            />
          </div>

          <div className="mt-16 grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map((p, i) => (
              <div
                key={p.title}
                className="reveal border-t border-white/15 pt-6"
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <span className="text-[1rem] text-white/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[0.9375rem] text-white">{p.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/60">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Use cases */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="reveal">
            <SectionHeading
              eyebrow="Where We Fit"
              title="Made for Every Corporate Moment"
              intro="From a hundred-piece dealer campaign to a company-wide employee gift, the range is built to scale with the occasion."
            />
            <img
              src="/editorial/editorial-colour-pens-900.webp"
              alt="A range of promotional ball pens in corporate colours laid out on a desk"
              width={900}
              height={600}
              loading="lazy"
              decoding="async"
              className="mt-10 hidden w-full object-cover lg:block"
            />
          </div>

          <ul className="grid gap-x-12 self-start sm:grid-cols-2">
            {useCases.map((u, i) => (
              <li
                key={u}
                className="reveal group flex items-center justify-between gap-4 border-b border-line py-5 last:sm:col-span-2"
                style={{ transitionDelay: `${(i % 4) * 55}ms` }}
              >
                <span className="text-[0.9375rem] text-ink">{u}</span>
                <span className="font-mono text-[0.6875rem] text-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials />

      <GuidesTeaser />

      {/* -------------------------------------------------------- Value strip */}
      <section
        aria-label="How we work"
        className="border-b border-line bg-paper"
      >
        <div className="mx-auto grid max-w-[1400px] gap-x-10 gap-y-12 px-5 py-20 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {assurances.map((v, i) => (
            <div
              key={v.title}
              className="reveal border-t border-line pt-7"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="accent text-[0.6875rem] tracking-[0.16em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 text-[1.0625rem] text-ink">{v.title}</h2>
              <p className="mt-3 text-[0.8125rem] leading-[1.85] text-muted">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />

      {/* ------------------------------------------------------------- Enquiry */}
      <section
        id="enquiry"
        className="border-t border-line bg-paper"
        aria-labelledby="enquiry-heading"
      >
        <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="reveal">
              <SectionHeading
                eyebrow="Enquire"
                title="Let's Build Something for Your Brand."
                intro="Share your requirement and our team will come back with product options, branding methods and pricing."
              />
              <div className="mt-10">
                <ContactOptions />
              </div>
            </div>

            <div className="reveal">
              <h2 id="enquiry-heading" className="sr-only">
                Enquiry form
              </h2>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
