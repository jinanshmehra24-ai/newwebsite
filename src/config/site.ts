/**
 * Single source of truth for brand, contact and SEO details.
 * Update values here and they propagate across the entire site.
 */
export const siteConfig = {
  name: "Chandra & Co.",
  tagline: "Your Brand, in Their Hands.",
  description:
    "Corporate gifting and promotional products branded for you, so your name stays in front of the people who matter.",
  url: "https://www.chandraandco.in",

  logo: {
    lockup: "/logo.svg",
    mark: "/logo-mark.svg",
    full: "/logo-full.svg",
  },

  contact: {
    phone: "+918076233798",
    phoneDisplay: "+91 80762 33798",
    altPhone: "+919560480950",
    altPhoneDisplay: "+91 95604 80950",
    whatsapp: "918076233798",
    email: "Chandrapromotionalhub@gmail.com",
  },

  forms: {
    /**
     * Where enquiries are delivered, via FormSubmit.
     *
     * The address must be activated once: send the form, open the confirmation
     * email FormSubmit sends here, and click the link. After that, replace this
     * value with the hashed alias FormSubmit gives you (it looks like
     * "el/xxxxxxxx"). The alias works identically but keeps the address out of
     * the published page, where scrapers would otherwise find it.
     */
    enquiryTarget: "Chandrapromotionalhub@gmail.com",
  },

  address: {
    line1: "C-1/27, Street No-5",
    line2: "Rajapuri, New Delhi",
    postalCode: "110059",
    country: "India",
  },

  social: {
    instagram: "",
    linkedin: "",
  },

  seo: {
    defaultTitle:
      "Chandra & Co. | Corporate Gifting & Branded Promotional Products",
    titleTemplate: "%s | Chandra & Co.",
    defaultDescription:
      "Chandra & Co. brands corporate gifts for businesses across India — metal and plastic pens, boxed gift sets, keychains, mobile stands, desk organisers, paperweights, laptop and sling bags and printed jute bags, all carrying your logo and nobody else's.",
  },

  /**
   * Catalogue imagery shows sample branding to demonstrate print quality and
   * placement. This mirrors the disclaimer printed in the company catalogues.
   */
  /**
   * The catalogue photographs once carried other companies' logos, printed by
   * the manufacturer to show off the print quality, and this line disclaimed
   * them. Those marks have since been taken off every pen image. What remains
   * is our own mark on the gifting samples, which is a demonstration of
   * placement rather than something the buyer receives — and since the site
   * promises elsewhere that no Chandra & Co. name goes on the product, the
   * note has to say so plainly.
   */
  brandingDisclaimer:
    "Where a logo appears on a product photograph it is our own, shown to demonstrate the print position. Nothing you order carries it — your logo takes its place, and the artwork, method and placement are confirmed with you before production.",
} as const;

export const whatsappLink = (message?: string) => {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const telLink = `tel:${siteConfig.contact.phone}`;
export const mailLink = `mailto:${siteConfig.contact.email}`;
