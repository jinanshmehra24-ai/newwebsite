# Chandra & Co.

Catalogue and enquiry site for a New Delhi corporate gifting supplier. It shows
what the business can brand, and hands the conversation to WhatsApp with the
product and quantity already written into the message.

There is no cart and no pricing. Price depends on quantity and branding method,
so every route through the site ends at a conversation rather than a checkout.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Regenerates the sitemap, type-checks, then builds to `dist/` |
| `npm run preview` | Serves the built `dist/` |
| `npm run typecheck` | Types only |
| `npm run sitemap` | Rewrites `public/sitemap.xml` from the catalogue data |

> The scripts call `node ./node_modules/...` directly rather than the usual
> shorthand. The `&` in this folder's name breaks npm's Windows `.cmd` shims.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router.

---

## Where things live

```
src/
  config/site.ts      Brand, contact numbers, WhatsApp, SEO defaults, disclaimer
  data/
    products.ts       Every product, and the copy for each product family
    categories.ts     The ranges, and which of them are live
    content.ts        Home page copy: assurances, why-us, use cases, branding
    guides.ts         The buying guides, written out in full
    testimonials.ts   Client quotes — deliberately empty, see below
  lib/
    useSeo.ts         Per-page title, description, canonical, robots, JSON-LD
    useReveal.ts      Scroll-reveal observer for the `.reveal` class
    submitEnquiry.ts  Posts the enquiry form to FormSubmit
    spamGuard.ts      Honeypot, time trap and rate limits for that form
  components/         Everything shared; one file per piece
  pages/              One file per route
scripts/sitemap.mjs   Rewrites public/sitemap.xml from the data on every build
public/
  products/           <slug>-600.webp and <slug>-1200.webp for every product
  editorial/          Hero photographs and section imagery
```

Source photography and catalogue PDFs sit in the untracked folders at the
project root (`gift sets/`, `bags/`, `key chains photo/`, `mobile stands/`,
`paper weight/`, `pen stand/`, `home page hero/`, `resources/`, and the pen
catalogue folders). Nothing in `src/` reads them — they are the originals the
files in `public/` were made from.

---

## The catalogue

124 products across nine ranges:

| Range | Count |
| --- | --- |
| Executive Pens | 42 |
| Elite Pens | 24 |
| Supreme Pens | 20 |
| Gift Sets | 11 |
| Prime Pens | 9 |
| Keychains | 6 |
| Bags | 4 |
| Mobile Stands | 4 |
| Desk Accessories | 4 |

### Adding a product

1. Put `<slug>-1200.webp` and `<slug>-600.webp` in `public/products/`, both at
   **1200×1500** and **600×750** — a 4:5 portrait frame. Every card on the site
   is that shape, and mixing ratios is what made the grid look ragged before.
2. Add a row to `RAW` in `src/data/products.ts`:

   ```ts
   ["Metal Keychain", "keychain-oval-metal", "keychains", "KC-06", "Metal Keychain", 1200, 1500, "portrait"],
   //  name           slug                   category      sku      type          w     h     shape
   ```
3. If the `type` is new, add a block to `TYPE_COPY` above it. The build fails on
   a type with no copy, so this cannot be forgotten.

**Names are the product type only** — "Metal Keychain", "Gift Set", "Metal Pen".
Model numbers belong in `sku`, never in the name.

**SKUs are unique across the whole catalogue.** Executive and Prime carry the
manufacturer's own model numbers (`26088`, `FR-26003`); the rest are prefixed by
range (`EL-`, `SP-`, `GS-`, `BG-`, `KC-`, `MS-`, `DA-`). The Prime range is
prefixed because the metal range already has a `26093` and Prime has `26093A`.

### Adding a range

Add a record to `ALL_CATEGORIES` in `src/data/categories.ts` and put its slug in
`ACTIVE_CATEGORIES`. A range not in that list stays out of the site entirely —
that is how the 103 held-back metal pens are parked. `image` is the *slug of a
product*, not a file path.

---

## Preparing photographs

Product photographs come from two places, and they are handled differently.

**Studio shots on a plain ground** need only framing to 4:5. Where the product
does not fill that shape, the background is extended by repeating the edge
pixels rather than padded with a flat colour — a flat pad bands visibly across
the warm gradients behind the gift sets.

**Designed catalogue pages** — headings, feature icons, product codes and one
photograph among them — need the photograph lifted out first. Automatic
detection was tried twice and abandoned: a black strap on white has too little
colour variety to read as a photograph, and a keychain on a wooden board reads
as one edge to edge. The region is given by hand, once per page, and only the
tightening inside it is automatic.

Two things are always removed before a photograph ships:

- **Third-party brand names printed on the product.** The manufacturer prints
  client logos on sample pens to show print quality; those are lifted off by
  rebuilding the barrel between the clean cross-sections either side of the mark.
- **Manufacturer code tags** — the small white `GL 2035` labels dropped into the
  gifting shots. Each is refilled row by row from the clean pixels to its left
  and right, because the label straddles the dark box rim and the pale tray, and
  a general inpaint drags one into the other and leaves a grey smear.

Where a logo does appear on a product photograph it is Chandra & Co.'s own,
shown to demonstrate print placement. `siteConfig.brandingDisclaimer` says so,
and that line has to stay accurate if the photographs change.

---

## The enquiry flow

**Product page → WhatsApp.** `ProductEnquiry` asks for one thing, quantity, and
writes it into a WhatsApp message with the product name and SKU:

```
Hello Chandra & Co.,

I would like to enquire about this product:
• Product: Gift Set
• SKU: GS-03
• Quantity: 250 pieces

Please share pricing and branding options.
```

The quick-pick figures are derived from the product's own `moq`, not fixed —
offering 100 pieces of a pen that ships in thousands invites an enquiry that has
to be corrected.

**Forms → email.** `submitEnquiry.ts` posts to FormSubmit. Two things are still
outstanding there:

1. The address in `siteConfig.forms.enquiryTarget` must be **activated once** —
   submit the form, open the confirmation email FormSubmit sends, click the link.
2. After that, replace it with the hashed alias FormSubmit provides (it looks
   like `el/xxxxxxxx`) so the address is not sitting in the published page.

`spamGuard.ts` runs three checks before anything is sent: an off-screen honeypot
field, a minimum fill time, and a per-browser rate limit on repeats. A submission
that fails them is reported as successful and silently dropped.

---

## Design rules worth keeping

- **Tokens live in `src/index.css`** under `@theme`. Ink, paper, line, muted, and
  the brand gold. `.accent` is a shade darker than the logo's gold on purpose:
  the brand value measures 4.26:1 on the paper ground and small text needs 4.5.
- **Every piece of text must clear WCAG AA** — 4.5:1 normal, 3:1 large. This has
  caught real bugs twice, including a button on the dark band that was styled for
  a light one and came out at 2.9:1 with an invisible border.
- **Headings are uppercase, light weight, letterspaced**, with tracking easing
  off as size grows. Letterspacing that flatters a small label pulls a large line
  apart.
- **Cards have no frame.** The photograph sits on `bg-paper` and the name reads
  underneath it.
- **The hero is sized by width, never by viewport height.** With `object-cover` a
  short wide window crops more, and a `vh` height — or a `max-height`, which is
  the same trap — cut the pen tips off on large screens. The frame is 7:4 from
  640px, 5:4 below it, and stops widening at 1600px rather than growing taller.
- **Each hero slide carries its own crop position.** The pen photograph was
  widened to 7:4 in the file itself, because its pens stand the full height of
  the shot and no crop showed a whole one.

---

## SEO

`useSeo` sets the title, description, canonical, Open Graph tags, robots and
JSON-LD per page. Product pages emit `Product` schema; guides emit `Article`.

A page that cannot find its product or category passes `noindex` from the
*parent* route, not from `NotFound` — the parent's effect runs last and would
otherwise overwrite it, leaving a missing page titled "Product" and open to
indexing.

`public/sitemap.xml` is regenerated on every build by `scripts/sitemap.mjs`,
which reads the product rows, the active categories and the guide slugs. It was
written by hand once and by the time anyone looked again it listed twenty-five
withdrawn products and none of the new ranges.

---

## Things that are deliberately empty

- **`src/data/testimonials.ts`** — the section renders nothing while the list is
  empty. Invented praise is the fastest way to lose a corporate buyer; add real
  quotes with permission and the section appears on its own.
- **Client logos** — no logo wall exists for the same reason.

## Known gaps

- The Executive range's photographs were rendered from 3000px catalogue pages;
  the originals are 4961px and could be re-rendered for genuinely sharper cards.
- The metal-pen range (103 products) is built but held back — its slug is in
  `ALL_CATEGORIES` and out of `ACTIVE_CATEGORIES`.
- Bags, diary combos and doctor gifting are named in the copy and in the home
  page range band, but only the bags have photographs so far.
