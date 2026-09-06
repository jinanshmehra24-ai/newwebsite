import { ButtonLink } from "./ui";
import { siteConfig, whatsappLink } from "../config/site";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-deep" aria-labelledby="cta-heading">
      <img
        src="/editorial/hero-dark-pen-1800.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/55" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-32">
        <div className="max-w-2xl">
          <div className="rule-accent w-20" />
          <h2
            id="cta-heading"
            className="mt-7 text-[clamp(1.4rem,2.6vw,2.1rem)] text-white"
          >
            Looking for the Right Product for Your Brand?
          </h2>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/70">
            Explore our products or speak with our team about your custom corporate
            requirements.
          </p>
          {/* Three ways out of here, and the quickest one is first. Most
              enquiries arrive on WhatsApp, so it should not be the option a
              visitor has to go looking for. */}
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink
              href={whatsappLink(
                `Hello ${siteConfig.name}, I have a corporate gifting requirement I would like to discuss.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
            >
              Chat on WhatsApp
            </ButtonLink>
            <ButtonLink to="/products" variant="accent">
              View Catalogue
            </ButtonLink>
            <ButtonLink to="/quote" variant="ghostLight">
              Request a Quote
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
