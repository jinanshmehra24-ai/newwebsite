import ContactOptions from "../components/ContactOptions";
import EnquiryForm from "../components/EnquiryForm";
import { siteConfig } from "../config/site";
import { useReveal } from "../lib/useReveal";
import PageHeader from "../components/PageHeader";
import { useSeo } from "../lib/useSeo";

export default function Contact() {
  const root = useReveal<HTMLDivElement>();

  useSeo({
    title: "Contact",
    description:
      "Contact Chandra & Co. for corporate gifting and promotional product requirements. Call, WhatsApp or email our New Delhi team.",
    path: "/contact",
  });

  return (
    <div ref={root}>
      <PageHeader
        trail={[{ label: "Contact" }]}
        eyebrow={"Contact"}
        title={"Let's Build Something for Your Brand."}
        intro={
          "Tell us the product, the quantity and the occasion — we'll come back with options, branding methods and pricing."
        }
      />

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="reveal">
          <ContactOptions />
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="reveal">
            <h2 className="eyebrow">Our Office</h2>
            <address className="mt-5 space-y-2 text-[1.0625rem] not-italic leading-relaxed text-muted">
              <p className="text-2xl text-ink">{siteConfig.name}</p>
              <p>
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2} – {siteConfig.address.postalCode}
                <br />
                {siteConfig.address.country}
              </p>
            </address>

            <h2 className="eyebrow mt-10">Speak To</h2>
            <ul className="mt-5 space-y-4 text-[0.9375rem] text-muted">
              <li>
                <span className="block text-ink">Jinansh Mehra</span>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="transition-colors hover:text-ink"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="block text-ink">Vikram Mehra</span>
                <a
                  href={`tel:${siteConfig.contact.altPhone}`}
                  className="transition-colors hover:text-ink"
                >
                  {siteConfig.contact.altPhoneDisplay}
                </a>
              </li>
            </ul>

            <h2 className="eyebrow mt-10">Hours</h2>
            <p className="mt-5 text-[0.9375rem] text-muted">
              Monday – Saturday
              <br />
              10:00 – 19:00 IST
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-[1.125rem] text-ink">Send an enquiry</h2>
            <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-muted">
              The more detail you share on quantity and branding, the faster we
              can quote accurately.
            </p>
            <div className="mt-8">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
