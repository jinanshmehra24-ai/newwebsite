export type CategorySlug =
  | "metal-pens"
  | "executive-pens"
  | "elite-pens"
  | "supreme-pens"
  | "prime-pens"
  | "gift-sets"
  | "bags"
  | "desk-accessories"
  | "keychains"
  | "mobile-stands"
  | "corporate-pens";

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  /** Slug of the product whose photograph represents this category. */
  image: string;
};

/**
 * The pen ranges, active and dormant.
 *
 * Chandra & Co. also supplies carry bags, laptop bags and backpacks, sling
 * bags, diary gift combos, doctor gifting items and customisable acrylic
 * paperweights. Those are named in the copy and in the range band on the home
 * page, but they are not categories here: a category needs photographs, and
 * none have been shot yet. The keychain, desk clock, flask and mug entries that
 * once sat in this list were removed — they described a range the business does
 * not carry, and would have gone live the moment someone widened the list below.
 */
const ALL_CATEGORIES: Category[] = [
  {
    slug: "metal-pens",
    name: "Metal Pens",
    short: "Weighted metal bodies, laser-engraved branding.",
    description:
      "Our flagship range. Metal-bodied pens with weighted barrels and finishes chosen to hold a laser engraving cleanly — the pen most companies reach for when the gift has to feel considered.",
    image: "metal-pen-001",
  },
  {
    slug: "executive-pens",
    name: "Executive Pens",
    short: "Weighted metal bodies that hold an engraving cleanly.",
    description:
      "Metal pens with weighted barrels and polished, matte and textured finishes, shown in the desk settings they are gifted into. Each carries a branding panel that holds a laser engraving cleanly.",
    image: "metal-pen-26088",
  },
  {
    slug: "corporate-pens",
    name: "Corporate Pens",
    short: "High-volume plastic pens with wide print areas.",
    description:
      "Plastic and promotional ball pens built for scale — conference bags, branch networks, dealer campaigns and everyday office supply, printed in full colour across a generous barrel area.",
    image: "elite-ball-pen-04",
  },
  {
    slug: "elite-pens",
    name: "Elite Pens",
    short: "Clean-lined plastic bodies in a wide colour palette.",
    description:
      "The Elite range — plastic ball pens with clean barrels and a broad colour palette, alongside a clear-barrelled gel pen, all printed end to end with your branding. Built for conferences, campaigns and everyday corporate supply.",
    image: "elite-ball-pen-04",
  },
  {
    slug: "supreme-pens",
    name: "Supreme Pens",
    short: "Named models across click, grip and transparent bodies.",
    description:
      "Our Supreme catalogue — individually named models spanning click-action, rubber-grip, frosted and transparent bodies, each offered across its own colour set and printed to your brand.",
    image: "supreme-apollo-et",
  },
  {
    slug: "prime-pens",
    name: "Prime Pens",
    short: "Moulded bodies in full colour sets, and two gel rollers.",
    description:
      "The Prime range — plastic ball pens moulded in wood, marble and soft-touch finishes across full colour sets, printed end to end with your branding, alongside a pair of metallic-barrelled gel rollers for gifting.",
    image: "prime-pen-26015",
  },
  {
    slug: "gift-sets",
    name: "Gift Sets",
    short: "Boxed diaries, pens and desk pieces, ready to hand over.",
    description:
      "Presentation boxes holding a diary, a pen and — on the larger sets — a card holder and keyring, in matched finishes. What to reach for when the gift has to be handed over as one piece rather than assembled at your end.",
    image: "gift-set-executive-navy",
  },
  {
    slug: "bags",
    name: "Bags",
    short: "Laptop bags, sling bags and printed jute carry bags.",
    description:
      "Leather-finish laptop and sling bags for employee and client gifting, alongside printed jute carry bags for conferences, hampers and campaign giveaways. Branding is applied to the panel that faces out when the bag is carried.",
    image: "laptop-bag-tan-strap",
  },
  {
    slug: "keychains",
    name: "Keychains",
    short: "Metal keychains with a printing plate on the face.",
    description:
      "Metal keychains — rectangular, oval and hook-opener bodies, in polished steel, gunmetal and gold finishes. Each carries a flat plate sized for a printed or UV-marked logo, and it goes into a pocket every single day.",
    image: "keychain-plate-gold",
  },
  {
    slug: "mobile-stands",
    name: "Mobile Stands",
    short: "Folding steel and aluminium stands for a desk.",
    description:
      "Folding phone and tablet stands in steel and aluminium — flat-folding, rotating and pen-holder formats. A gift that is opened once and then left standing on the desk, which is exactly where a brand wants to be.",
    image: "mobile-stand-rotating",
  },
  {
    slug: "desk-accessories",
    name: "Desk Accessories",
    short: "Pen stands, desk organisers and paperweights.",
    description:
      "Pieces that stay in view on a working desk — moulded pen stands carrying a full-colour printed panel, metal desk organisers, weighted paperweights, and clear acrylic cut to a shape of your own with the brand marked into it.",
    image: "acrylic-paperweight",
  },
];

/** Widen this list to put the other ranges back on the site. */
const ACTIVE_CATEGORIES: CategorySlug[] = [
  "executive-pens",
  "elite-pens",
  "supreme-pens",
  "prime-pens",
  "gift-sets",
  "bags",
  "keychains",
  "mobile-stands",
  "desk-accessories",
];

export const categories: Category[] = ALL_CATEGORIES.filter((c) =>
  ACTIVE_CATEGORIES.includes(c.slug),
);

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);
