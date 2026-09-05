import CTASection from "../components/CTASection";
import { SectionHeading } from "../components/ui";
import { whyPoints, brandingMethods } from "../data/content";
import { siteConfig } from "../config/site";
import { useReveal } from "../lib/useReveal";
import PageHeader from "../components/PageHeader";
import { useSeo } from "../lib/useSeo";

export default function About() {
  const root = useReveal<HTMLDivElement>();

  useSeo({
    title: "About",
    description:
      "Chandra & Co. is a New Delhi based corporate gifting supplier, providing branded pens, boxed gift sets, metal keychains, mobile stands, desk organisers, paperweights and bags to businesses across India.",
    path: "/about",
  });

  return (
    <div ref={root}>
      <PageHeader
        trail={[{ label: "About" }]}
        eyebrow={"About Us"}
        title={"The Gift Carries Your Name, Not Ours."}
        intro="We supply corporate gifts to businesses across India and put their branding on them — from a single dealer campaign to a company-wide employee gift. What leaves here carries the client's name and nothing else."
        note={
          "Your logo goes on the gift. Ours does not go anywhere on it, and we do not put your order on our own shelf for someone else to see."
        }
      />

      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <img
              src="/editorial/editorial-craft-900.webp"
              alt="A metal corporate pen photographed alongside desk objects in an editorial still life"
              width={900}
              height={600}
              loading="lazy"
              decoding="async"
              className="w-full object-cover"
            />
          </div>

          <div className="reveal space-y-6 text-[1.0625rem] leading-relaxed text-muted">
            <p>
              We work with companies that need merchandise to do a job — carry a brand
              into a client's office, mark a milestone with a team, or hold attention
              across a dealer network. That means getting the product right first, then
              getting the branding on it cleanly.
            </p>
            <p>
              The catalogue on this site is our pen range — an executive metal range
              for corporate gifting, and the Elite and Supreme plastic ranges for
              high-volume campaigns and everyday office supply. Each is offered with the
              branding method that suits it: laser engraving on metal, screen and UV
              printing on moulded bodies. Beyond pens we supply boxed gift
              sets, pen and card holder sets, metal keychains, mobile stands,
              desk organisers, paperweights, laptop and sling bags, printed jute
              bags, diary gift combos and doctor gifting items.
            </p>
            <p>
              We operate from {siteConfig.address.line2}, supplying across India, and
              handle requirements from a hundred pieces to full-scale campaigns.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="reveal">
            <SectionHeading
              eyebrow="How We Work"
              title="Built Around Your Brand"
              tone="light"
            />
          </div>

          <div className="mt-14 grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="reveal">
          <SectionHeading
            eyebrow="Branding Methods"
            title="Getting Your Logo on It, Properly"
            intro="The method is chosen for the material and the mark — so fine detail survives at the size it is actually printed."
          />
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {brandingMethods.map((m, i) => (
            <div
              key={m.title}
              className="reveal border-t border-line pt-7"
              style={{ transitionDelay: `${(i % 4) * 70}ms` }}
            >
              <h3 className="text-[1.0625rem] text-ink">{m.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
