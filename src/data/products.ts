import type { CategorySlug } from "./categories";

/** Ordered most-prominent first; the catalogue groups by this. */
export const SHAPE_ORDER = ["portrait", "landscape", "classic", "wide"] as const;

export type ProductShape = (typeof SHAPE_ORDER)[number];

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  sku?: string;
  type: string;
  /** Intrinsic size of the master image, so cards reserve the right space. */
  width: number;
  height: number;
  /** Fixed shape bucket — cards of the same shape line up exactly. */
  shape: ProductShape;
  description: string;
  images: string[];
  features: string[];
  customization: string[];
  moq?: string;
};

type TypeCopy = {
  description: string;
  features: string[];
  customization: string[];
  moq?: string;
};

/**
 * Copy is authored per product family so the catalogue stays consistent.
 *
 * Only families that a product actually uses belong here. Blocks for keychains,
 * table clocks, flasks and the rest were left behind when those ranges came off
 * the site; one of them declared a second "Pen Stand" and collided with the
 * real one the moment desk accessories were added back.
 */
const TYPE_COPY: Record<string, TypeCopy> = {
  "Metal Pen": {
    description:
      "A metal-bodied ball pen built for corporate gifting, with a weighted barrel, clean branding panel and a smooth-writing refill. Finished to hold a laser engraving crisply, so your logo reads sharply at small sizes.",
    features: ["Weighted metal barrel", "Smooth-writing ball refill", "Branding panel that holds an engraving crisply", "Individual box or sleeve packing available"],
    customization: ["Laser engraving", "Screen printing", "Custom gift box or sleeve"],
    moq: undefined,
  },
  "Gift Set": {
    description:
      "A boxed set built to be handed over as it is — a diary, a pen and, on the larger set, a card holder and keyring, finished to match and seated in a fitted tray. The lid comes off in front of the recipient, which is most of what makes a set feel like a gift rather than a handout.",
    features: ["Fitted presentation box with lid", "Matched finishes across every piece", "Diary with ribbon marker and elastic closure", "Metal-trimmed pen seated in the tray"],
    customization: ["Foil or screen printing on the diary cover", "Laser engraving on the metal trim", "Printed sleeve or belly band around the box"],
    moq: "50 sets",
  },
  "Pen & Card Holder Set": {
    description:
      "A pen and an RFID-blocking card holder, boxed together in a fitted tray. The card holder is the part that gets used daily — a slim metal case that shields contactless cards from being read in a pocket — and the pen makes it a gift rather than an accessory.",
    features: ["Slim metal card holder with RFID blocking", "Matching ball or roller pen", "Fitted presentation box", "Polished, brushed and leather-finish options"],
    customization: ["Laser engraving on the card holder", "Engraving or printing on the pen", "Printed sleeve around the box"],
    moq: "50 sets",
  },
  "Metal Keychain": {
    description:
      "A metal keychain with a flat plate across the face, sized to carry a logo at a readable size. Rectangular, oval and hook-opener bodies, in polished steel, gunmetal and gold. The longest-lived thing on this list — it goes into a pocket every day for years.",
    features: ["Solid metal body with a split ring", "Flat branding plate on the face", "Polished, gunmetal and gold finishes", "Hook-opener and strap formats available"],
    customization: ["UV printing on the plate", "Laser engraving", "Full-colour dome printing"],
    moq: "100 pieces",
  },
  "Mobile Stand": {
    description:
      "A folding phone and tablet stand in steel or aluminium, with silicone pads to hold the device and the finish. Folds flat to post or pack, and once it is on a desk it stays there — which is what makes it worth branding.",
    features: ["Steel or aluminium body", "Folds flat for packing", "Silicone pads front and back", "Adjustable viewing angle"],
    customization: ["Laser engraving on the base", "Screen printing", "Printed gift box"],
    moq: "50 pieces",
  },
  "Desk Organiser": {
    description:
      "A metal desk organiser with a phone slot and compartments for pens, scissors and the rest of it. One piece that replaces the four things scattered across a desk, and holds a brand in view while it does.",
    features: ["Metal construction with a phone slot", "Separate compartments for pens and tools", "Weighted base", "Matte powder-coated finish"],
    customization: ["Laser engraving on the body", "Screen printing", "Custom body colour"],
    moq: "50 pieces",
  },
  "Metal Paperweight": {
    description:
      "A weighted metal paperweight with a mirror-polished finish. Substantial in the hand and quietly expensive-looking on a desk — a gift for the recipient who already has everything practical.",
    features: ["Solid metal with a polished finish", "Substantial weight", "Felt-lined base", "Presentation boxed"],
    customization: ["Laser engraving on the face", "Custom shapes to order", "Printed gift box"],
    moq: "50 pieces",
  },
  "Laptop Bag": {
    description:
      "A leather-finish laptop bag with a padded main compartment, twin handles and a detachable shoulder strap. Weighted towards employee and client gifting where the piece is used daily and carries the brand into every meeting it goes to.",
    features: ["Padded laptop compartment", "Twin carry handles with a detachable shoulder strap", "Zipped main compartment and front document pocket", "Textured leather finish with metal hardware"],
    customization: ["Embossing on the front panel", "Metal badge with your logo", "Screen printing on the lining or strap"],
    moq: "50 pieces",
  },
  "Sling Bag": {
    description:
      "A compact cross-body bag in the same leather finish, sized for a tablet, documents and the things that travel between desks. A lighter gift than a laptop bag and an easier one to give across a whole team.",
    features: ["Flap closure over a zipped main compartment", "Adjustable webbing shoulder strap", "Zipped outer pocket", "Textured leather finish"],
    customization: ["Embossing on the flap", "Metal badge with your logo", "Screen printing on the strap"],
    moq: "50 pieces",
  },
  "Jute Carry Bag": {
    description:
      "A printed jute bag with rope handles and a laminated lining — the standard carry for conference kits, hampers and campaign giveaways, and the one piece of a gift that everybody walks out holding.",
    features: ["Natural jute with laminated inner lining", "Rope handles", "Reinforced base and side gussets", "Reusable, and used long after the event"],
    customization: ["Screen printing in one or more colours", "Full-colour printing on the face", "Custom sizes on request"],
    moq: "100 pieces",
  },
  "Pen Stand": {
    description:
      "A moulded desk pen stand with a full-colour printed panel across its face. It sits on a desk at eye level all day, which makes the print area on it worth more than its size suggests.",
    features: ["Moulded body with a weighted base", "Full-colour printed face panel", "Single-well pen holder", "Available in your own body colour"],
    customization: ["Full-colour panel printing", "Body moulded in a brand colour", "Printed rim detail"],
    moq: "100 pieces",
  },
  "Acrylic Paperweight": {
    description:
      "Clear acrylic cut to a shape of your own — a product silhouette, a logo mark, a map of the territory — with the brand marked into the face. Made to order in whatever outline suits the occasion.",
    features: ["Cast clear acrylic, cut to a custom outline", "Polished edges", "Marking on the face in metallic or tonal finish", "Made to a shape of your choosing"],
    customization: ["Custom cut shape", "Laser marking or printed logo", "Tinted or layered acrylic"],
    moq: "50 pieces",
  },
  "Prime Ball Pen": {
    description:
      "A plastic-bodied ball pen from the Prime range, moulded in a full colour set and printed end to end with your branding. Built for conference bags, dealer campaigns and everyday office supply where the run is long and the print has to stay crisp.",
    features: ["Moulded plastic barrel in a full colour set", "Smooth-writing ball refill", "Generous print area along the barrel", "Secure cap or click action"],
    customization: ["Screen printing", "UV printing", "Full-colour barrel wrap"],
    moq: "100 pieces",
  },
  "Prime Gel Pen": {
    description:
      "A gel roller from the Prime range, with a metallic barrel, a sprung clip and a visible ink window. The heavier build suits it to client and employee gifting where a plastic promotional pen would read as too light.",
    features: ["Metallic barrel with contrast collar", "Gel roller refill with visible ink level", "Sprung metal clip", "Cap with positive lock"],
    customization: ["Screen printing", "UV printing", "Laser marking on the collar"],
    moq: "100 pieces",
  },
  "Supreme Ball Pen": {
    description:
      "A clean-lined plastic ball pen from the Supreme range, offered across a broad colour palette with a generous branding surface — a dependable choice for events, conferences and everyday office supply.",
    features: ["Wide colour range", "Generous branding surface", "Comfortable grip section", "Reliable everyday refill"],
    customization: ["Screen printing", "Full-colour UV printing", "Colour matching to brand palette"],
    moq: "1,000 pcs",
  },
  "Gel Pen": {
    description:
      "A gel pen with a needle tip and a clear barrel, so the ink level is visible and the colour of the refill is part of the look. Writes wetter and darker than a ballpoint, which is why offices that sign a lot of paper ask for it by name.",
    features: ["Needle tip for a fine, consistent line", "Clear barrel showing the ink level", "Vented cap with a moulded clip", "Smooth gel refill"],
    customization: ["Screen printing on the barrel", "Full-colour UV printing", "Barrel and cap colour matching"],
    moq: "1,000 pcs",
  },
  "Elite Ball Pen": {
    description:
      "A plastic ball pen from the Elite range, offered across a wide colour palette with a clean barrel that carries printed branding cleanly end to end. Built for conferences, campaigns and everyday corporate supply.",
    features: ["Broad colour and finish range", "Full wrap-around branding area", "Comfortable balanced body", "Reliable smooth-writing refill"],
    customization: ["Screen printing", "Full-colour UV printing", "Barrel and trim colour matching"],
    moq: "1,000 pcs",
  },
};

/** [name, slug, category, sku, type] — generated from the Chandra & Co. print catalogues. */
const RAW: ReadonlyArray<
  readonly [
    string, string, CategorySlug, string | undefined, string,
    number, number, ProductShape,
  ]
> = [
  ["Metal Pen", "metal-pen-26051", "executive-pens", "26051", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26052", "executive-pens", "26052", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26053", "executive-pens", "26053", "Metal Pen", 1200, 1500, "portrait"],
  ["Metal Pen", "metal-pen-26054", "executive-pens", "26054", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26055", "executive-pens", "26055", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26058", "executive-pens", "26058", "Metal Pen", 1200, 1500, "portrait"],
  ["Metal Pen", "metal-pen-26059", "executive-pens", "26059", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26060", "executive-pens", "26060", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26061", "executive-pens", "26061", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26062", "executive-pens", "26062", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26063", "executive-pens", "26063", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26064", "executive-pens", "26064", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26066", "executive-pens", "26066", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26067", "executive-pens", "26067", "Metal Pen", 1200, 950, "classic"],
  ["Metal Pen", "metal-pen-26068", "executive-pens", "26068", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26069", "executive-pens", "26069", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26070", "executive-pens", "26070", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26071", "executive-pens", "26071", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26072", "executive-pens", "26072", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26073", "executive-pens", "26073", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26074", "executive-pens", "26074", "Metal Pen", 1200, 1500, "portrait"],
  ["Metal Pen", "metal-pen-26075", "executive-pens", "26075", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26076", "executive-pens", "26076", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26077", "executive-pens", "26077", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26078", "executive-pens", "26078", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26079", "executive-pens", "26079", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26080", "executive-pens", "26080", "Metal Pen", 1200, 1500, "portrait"],
  ["Metal Pen", "metal-pen-26081", "executive-pens", "26081", "Metal Pen", 1200, 1500, "portrait"],
  ["Metal Pen", "metal-pen-26082", "executive-pens", "26082", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26083", "executive-pens", "26083", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26084", "executive-pens", "26084", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26085", "executive-pens", "26085", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26086", "executive-pens", "26086", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26087", "executive-pens", "26087", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26088", "executive-pens", "26088", "Metal Pen", 1200, 1500, "portrait"],
  ["Metal Pen", "metal-pen-26089", "executive-pens", "26089", "Metal Pen", 1200, 1500, "portrait"],
  ["Metal Pen", "metal-pen-26090", "executive-pens", "26090", "Metal Pen", 1200, 1500, "portrait"],
  ["Metal Pen", "metal-pen-26092", "executive-pens", "26092", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26093", "executive-pens", "26093", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26095", "executive-pens", "26095", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26096", "executive-pens", "26096", "Metal Pen", 1200, 800, "landscape"],
  ["Metal Pen", "metal-pen-26097", "executive-pens", "26097", "Metal Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-01", "elite-pens", "EL-01", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-02", "elite-pens", "EL-02", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-04", "elite-pens", "EL-04", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-05", "elite-pens", "EL-05", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-06", "elite-pens", "EL-06", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-07", "elite-pens", "EL-07", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-08", "elite-pens", "EL-08", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-10", "elite-pens", "EL-10", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-11", "elite-pens", "EL-11", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-13", "elite-pens", "EL-13", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-15", "elite-pens", "EL-15", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-17", "elite-pens", "EL-17", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-19", "elite-pens", "EL-19", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-20", "elite-pens", "EL-20", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-21", "elite-pens", "EL-21", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-22", "elite-pens", "EL-22", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-24", "elite-pens", "EL-24", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-26", "elite-pens", "EL-26", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-27", "elite-pens", "EL-27", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-28", "elite-pens", "EL-28", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-29", "elite-pens", "EL-29", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-31", "elite-pens", "EL-31", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-32", "elite-pens", "EL-32", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Elite Ball Pen", "elite-ball-pen-33", "elite-pens", "EL-33", "Elite Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-apollo-rgtr", "supreme-pens", "SP-02", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-apollo-et", "supreme-pens", "SP-06", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-apex-yb", "supreme-pens", "SP-09", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-clipto-lite", "supreme-pens", "SP-11", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-comfy-rg", "supreme-pens", "SP-14", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-crysta-ezmw", "supreme-pens", "SP-16", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-comet-jsw", "supreme-pens", "SP-21", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-gloria-fop", "supreme-pens", "SP-22", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-hourglass-cw", "supreme-pens", "SP-27", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-klass-lite", "supreme-pens", "SP-28", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-ticker-ezmw", "supreme-pens", "SP-30", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-breeza-opb", "supreme-pens", "SP-34", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-fusion-rgc", "supreme-pens", "SP-35", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-splash-rgc", "supreme-pens", "SP-36", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-zorro-mbb", "supreme-pens", "SP-37", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-newton", "supreme-pens", "SP-40", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-regal", "supreme-pens", "SP-41", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-tri-click", "supreme-pens", "SP-42", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-roller-pen", "supreme-pens", "SP-43", "Supreme Ball Pen", 1200, 1500, "portrait"],
  ["Supreme Ball Pen", "supreme-ace", "supreme-pens", "SP-44", "Supreme Ball Pen", 1200, 1500, "portrait"],

  // The Prime range — plastic promotional bodies and two gel rollers.
  ["Prime Ball Pen", "prime-pen-26003", "prime-pens", "PR-26003", "Prime Ball Pen", 1200, 1500, "portrait"],
  ["Prime Ball Pen", "prime-pen-26007", "prime-pens", "PR-26007", "Prime Ball Pen", 1200, 1500, "portrait"],
  ["Prime Ball Pen", "prime-pen-26015", "prime-pens", "PR-26015", "Prime Ball Pen", 1200, 1500, "portrait"],
  ["Prime Ball Pen", "prime-pen-26020", "prime-pens", "PR-26020", "Prime Ball Pen", 1200, 1500, "portrait"],
  ["Prime Ball Pen", "prime-pen-26022", "prime-pens", "PR-26022", "Prime Ball Pen", 1200, 1500, "portrait"],
  ["Prime Ball Pen", "prime-pen-26031", "prime-pens", "PR-26031", "Prime Ball Pen", 1200, 1500, "portrait"],
  ["Prime Ball Pen", "prime-pen-26033", "prime-pens", "PR-26033", "Prime Ball Pen", 1200, 1500, "portrait"],
  ["Prime Gel Pen", "prime-pen-26093a", "prime-pens", "PR-26093A", "Prime Gel Pen", 1200, 1500, "portrait"],
  ["Prime Gel Pen", "prime-pen-26093b", "prime-pens", "PR-26093B", "Prime Gel Pen", 1200, 1500, "portrait"],
  // Corporate gifting beyond the pens — boxed sets, bags and desk pieces.
  ["Executive Gift Set", "gift-set-executive-navy", "gift-sets", "GS-01", "Gift Set", 1200, 1500, "portrait"],
  ["Diary & Pen Gift Set", "gift-set-diary-tan", "gift-sets", "GS-02", "Gift Set", 1200, 1500, "portrait"],
  ["Laptop Bag", "laptop-bag-brown", "bags", "BG-01", "Laptop Bag", 1200, 1500, "portrait"],
  ["Laptop Bag", "laptop-bag-tan-strap", "bags", "BG-02", "Laptop Bag", 1200, 1500, "portrait"],
  ["Sling Bag", "sling-bag-brown", "bags", "BG-03", "Sling Bag", 1200, 1500, "portrait"],
  ["Jute Carry Bag", "jute-carry-bag", "bags", "BG-04", "Jute Carry Bag", 1200, 1500, "portrait"],
  ["Pen Stand", "pen-stand-desk", "desk-accessories", "DA-01", "Pen Stand", 1200, 1500, "portrait"],
  ["Acrylic Paperweight", "acrylic-paperweight", "desk-accessories", "DA-02", "Acrylic Paperweight", 1200, 1500, "portrait"],
  // Gift combos and pen-and-card sets from the 2026 gifting catalogue.
  ["Gift Set", "gift-set-black-gold", "gift-sets", "GS-03", "Gift Set", 1200, 1500, "portrait"],
  ["Gift Set", "gift-set-brown-textured", "gift-sets", "GS-04", "Gift Set", 1200, 1500, "portrait"],
  ["Gift Set", "gift-set-bamboo", "gift-sets", "GS-05", "Gift Set", 1200, 1500, "portrait"],
  ["Gift Set", "gift-set-combo-blue", "gift-sets", "GS-06", "Gift Set", 1200, 1500, "portrait"],
  ["Gift Set", "gift-set-combo-grey", "gift-sets", "GS-07", "Gift Set", 1200, 1500, "portrait"],
  ["Pen & Card Holder Set", "pen-card-set-navy", "gift-sets", "GS-08", "Pen & Card Holder Set", 1200, 1500, "portrait"],
  ["Pen & Card Holder Set", "pen-card-set-brown", "gift-sets", "GS-09", "Pen & Card Holder Set", 1200, 1500, "portrait"],
  ["Pen & Card Holder Set", "pen-card-set-tan", "gift-sets", "GS-10", "Pen & Card Holder Set", 1200, 1500, "portrait"],
  ["Pen & Card Holder Set", "pen-card-set-silver", "gift-sets", "GS-12", "Pen & Card Holder Set", 1200, 1500, "portrait"],

  ["Metal Keychain", "keychain-rectangle-gm", "keychains", "KC-01", "Metal Keychain", 1200, 1500, "portrait"],
  ["Metal Keychain", "keychain-strap-gold", "keychains", "KC-02", "Metal Keychain", 1200, 1500, "portrait"],
  ["Metal Keychain", "keychain-hook-opener", "keychains", "KC-03", "Metal Keychain", 1200, 1500, "portrait"],
  ["Metal Keychain", "keychain-hook-blue", "keychains", "KC-04", "Metal Keychain", 1200, 1500, "portrait"],
  ["Metal Keychain", "keychain-plate-gold", "keychains", "KC-05", "Metal Keychain", 1200, 1500, "portrait"],
  ["Metal Keychain", "keychain-oval-metal", "keychains", "KC-06", "Metal Keychain", 1200, 1500, "portrait"],

  ["Mobile Stand", "mobile-stand-steel", "mobile-stands", "MS-01", "Mobile Stand", 1200, 1500, "portrait"],
  ["Mobile Stand", "mobile-stand-foldable", "mobile-stands", "MS-02", "Mobile Stand", 1200, 1500, "portrait"],
  ["Mobile Stand", "mobile-stand-rotating", "mobile-stands", "MS-03", "Mobile Stand", 1200, 1500, "portrait"],
  ["Mobile Stand", "mobile-stand-pen-holder", "mobile-stands", "MS-04", "Mobile Stand", 1200, 1500, "portrait"],

  ["Desk Organiser", "desk-organiser-metal", "desk-accessories", "DA-03", "Desk Organiser", 1200, 1500, "portrait"],
  ["Metal Paperweight", "paperweight-gold-bar", "desk-accessories", "DA-04", "Metal Paperweight", 1200, 1500, "portrait"],
  ["Gel Pen", "elite-gel-pen-01", "elite-pens", "EL-34", "Gel Pen", 1200, 1500, "portrait"],
];

export const products: Product[] = RAW.map(
  ([name, slug, category, sku, type, width, height, shape]) => {
  const copy = TYPE_COPY[type];
  return {
    id: slug,
    name,
    slug,
    category,
    sku,
    type,
    description: copy.description,
    features: copy.features,
    customization: copy.customization,
    moq: copy.moq,
    width,
    height,
    shape,
    images: [`/products/${slug}-1200.webp`],
  };
  },
);

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const productsByCategory = (category: CategorySlug): Product[] =>
  products.filter((p) => p.category === category);

/** Image srcset helper — the 600px file serves cards, the 1200px file detail views. */
export const productSrcSet = (slug: string) =>
  `/products/${slug}-600.webp 600w, /products/${slug}-1200.webp 1200w`;


/** Groups products so identically-shaped cards sit together and align. */
export const byShape = (list: Product[]): Product[] => {
  const rank = new Map(SHAPE_ORDER.map((s, i) => [s, i]));
  return [...list].sort(
    (a, b) => (rank.get(a.shape) ?? 9) - (rank.get(b.shape) ?? 9),
  );
};
/**
 * The lowest minimum order in the catalogue, counted off the products rather
 * than written down anywhere. The figure is quoted in the header of the
 * Products page, and a number stated on a page is a promise — reading it from
 * the data is the only way it cannot quietly fall out of date.
 */
export const smallestOrder = (list: Product[] = products): string => {
  const counts = list
    .map((p) => Number(p.moq?.replace(/,/g, "").match(/\d+/)?.[0]))
    .filter((n) => Number.isFinite(n) && n > 0);

  return counts.length ? `${Math.min(...counts)} pieces` : "On request";
};
