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
| `npm run icons` | Re-renders the app icons from the logo — see PWA below |

> The scripts call `node ./node_modules/...` directly rather than the usual
> shorthand. The `&` in this folder's name breaks npm's Windows `.cmd` shims —
> a shortened `build` script has already broken local builds once and had to be
> put back. The long form works on Windows and on the Linux build server alike,
> so leave it alone.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router.

---

## Deployment

Cloudflare Pages, configured by `wrangler.toml`:

```toml
name = "newwebsite-wkk"
pages_build_output_dir = "dist"
```

Pages runs `npm run build` and serves `dist/`. Pushing to `main` is the deploy —
there is no separate step. Cloudflare refuses any single file over 25 MiB, which
is why the catalogue PDFs are kept out of the repository (see below).

---

## Installable (PWA)

The site installs to a phone's home screen and opens without browser chrome.
There is no separate app codebase — `vite-plugin-pwa` generates the manifest and
a service worker from the same build.

| Script | What it does |
| --- | --- |
| `npm run icons` | Re-renders the app icons from `public/logo-mark.svg` |

**What is cached, and what is not.** The shell — HTML, JS, CSS, the logos — is
precached at install: 27 files, about 464 KiB. The 126 product photographs are
*not*; at 17MB they would turn a first visit into a download of the whole
catalogue. They are cached as they are viewed instead, capped at 220 files for
sixty days, so a range already browsed opens with its pictures on a train and
one never opened simply asks for the network.

Verified by stopping the server and loading a product page: it rendered from
cache, photograph included.

**Updates** are `autoUpdate` — a new deploy takes over on the next visit without
asking. A catalogue must not show a withdrawn product because someone installed
it in March.

**Icons** come from `scripts/icons.mjs`, which renders the gold mark centred on
the deep indigo. Transparent icons show as black squares on some Android
launchers, and the maskable one keeps the mark inside the 80% circle Android
crops to. `theme_color` is the deep indigo of the strip across the top of every
page, so the status bar continues it rather than cutting against it.

**On iPhone** there is no install prompt — Safari installs through Share → Add
to Home Screen. Everything else behaves the same.

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

A few components worth knowing by name:

| Component | What it is |
| --- | --- |
| `HeroCarousel` | The rotating home hero, and its controls |
| `ProductCard` / `CategoryCard` | The full-size cards, used in the catalogue grids and on the home page |
| `CategoryTile` | The compact range tile used on `/categories` |
| `SectionIndex` | The numbered section marker — "1 Product Range" |
| `Photo` | An `img` that fades up once decoded, cache included |
| `WhatsAppButton` | The floating button, and the note that comes out of it |
| `ui.tsx` | `ButtonLink`, `Button`, `SectionHeading` and the button variants |

### The photographs are in the repository

Both the web-ready images and the originals they were made from are committed.
A clone gets everything needed to build and to re-make any image:

| Folder | Files |
| --- | --- |
| `public/products/` | 252 — every product at 600px and 1200px |
| `public/editorial/` | 26 — hero and section imagery |
| `PERFECT/` | 103 — the held-back metal pen range |
| `2026 elite pens'/` | 24 |
| `Supreme Pen Catalogue . Chandra Co/` | 20 |
| `gift sets/` | 11 |
| `key chains photo/` | 6 |
| `bags/` | 5 |
| `mobile stands/` | 5 |
| `home page hero/` | 4 |
| `resources/` | 4 |
| `paper weight/` | 2 |
| `pen stand/` | 1 |

Nothing in `src/` reads the source folders — they are the originals, kept so the
`public/` files can be rebuilt without hunting for the photographs again.

**PDFs are the one exception.** `.gitignore` excludes `*.pdf`, because the metal
pen catalogue is larger than the 25 MiB file limit Cloudflare Pages enforces.
`Metal Pen Catelouge 2026-27.pdf` and `FRENCH PENS pdf.pdf` therefore live only
on the original machine — keep a copy somewhere else.

---

## The catalogue

126 products across nine ranges:

| Range | Slug | Count |
| --- | --- | --- |
| Metal Executive Pens | `executive-pens` | 42 |
| Plastic Elite Pens | `elite-pens` | 25 |
| Plastic Supreme Pens | `supreme-pens` | 20 |
| Gift Sets | `gift-sets` | 11 |
| Plastic Prime Pens | `prime-pens` | 9 |
| Keychains | `keychains` | 6 |
| Bags | `bags` | 5 |
| Mobile Stands | `mobile-stands` | 4 |
| Desk Accessories | `desk-accessories` | 4 |

The slugs and the names are deliberately out of step: the names gained "Metal"
and "Plastic" so a buyer can tell the ranges apart at a glance, and the slugs
stayed as they were because they appear in every product row, in the sitemap and
in any link already shared.

### Finding a range

`/categories` shows all nine at once — a square of the photograph, the name and
a count — rather than nine full cards down a four-thousand-pixel page. The
search above them reads more than each range's own copy: the names and types of
all 126 products are folded in, so "backpack" and "jute" find Bags,
"paperweight" finds Desk Accessories, and "gel" finds Elite and Prime. Without
that, a buyer searching for the thing they want gets nothing, because the word
lives on the product and not on the range holding it.

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

**SKUs are unique across the whole catalogue.** The Executive range carries the
manufacturer's bare model numbers (`26051`, `26088`); every other range is
prefixed — `EL-`, `SP-`, `PR-`, `GS-`, `BG-`, `KC-`, `MS-`, `DA-`. Prime is
prefixed rather than bare because the Executive range already has a `26093` and
Prime has `26093A`.

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

Every page carries WhatsApp in at least two places, and most in three or four:
the floating button, the footer, and — on the seven pages that end with
`CTASection` — a "Chat on WhatsApp" button ahead of the catalogue and the quote
form, because that is how most enquiries actually arrive.

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

**The floating button and its note.** `WhatsAppButton` appears 700ms after load
on every page. It waited for 600px of scrolling once, which meant it was missing
from every short page and absent on arrival everywhere else — a way to reach
someone is not a reward for scrolling.

Out of it, twice a visit, comes a note saying the catalogue is a part of what
the business holds rather than all of it. Fourteen seconds after arrival, nine
seconds on screen, once more eighty-five seconds later, then never again for
that visit. The count lives in `sessionStorage` *and* in a module variable,
because storage throws outright in a locked-down browser and the cap has to hold
there too. Closing the note ends it for the session.

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

**Tokens live in `src/index.css`** under `@theme`. The palette was rebuilt to
match a reference site the owner chose. Its secondary grey is the one value
taken off the source: `#777582` measures 4.29:1 on this ground, under the 4.5
small text has to clear, so it sits four steps darker.

| Token | Value | Used for |
| --- | --- | --- |
| `paper` | `#f9f9f9` | The page ground |
| `ink` | `#312e41` | Body copy and headings |
| `deep` | `#1e1b2e` | Whole dark sections; `deeper` for cards on them |
| `muted` | `#706e7b` | Secondary text on light — 4.74:1 |
| `dim` | `#abaab2` | Secondary text on dark — 7.29:1 |
| `lime-400` | `#e2f273` | The one raised voice; filled buttons, numeral badges |
| `violet-500` | `#695bc4` | The same job on light grounds — 5.12:1 |
| `whatsapp` | `#25d366` | Only for WhatsApp actions |

- **The violet never goes on the dark sections** (3.1:1 there) and the lime never
  carries small text on the light ones. Each has one ground it belongs to.
- **Text on the WhatsApp green is the deep indigo, not white.** White on that
  green measures 1.98:1 — the mistake most sites make with it. The indigo reads
  8.5.
- **Every piece of text must clear WCAG AA** — 4.5:1 normal, 3:1 large. This has
  caught real bugs more than once, including a button on the dark band styled for
  a light one that came out at 2.9:1 with an invisible border.

**Type.** Manrope for everything read; Archivo, held wide and heavy, for
headings. The reference sets its display type in Integral CF, which is a
licensed retail family that cannot be embedded here — Archivo at the top of its
width axis is the nearest thing in the free libraries.

- **Headings are sentence case, at the face's own spacing.** They were uppercase
  and letterspaced once, and so were the product names, buttons, captions and
  navigation. When every line on a page is shouting, none of them is. Uppercase
  is now spent on the small eyebrow label and nothing else.
- **The width axis narrows to 100 below 640px.** An expanded heavy grotesque at
  35px fits about fourteen characters to a line on a 375px screen, so every
  headline ran wall to wall. Narrowing buys roughly a sixth more characters at
  the same type size. This is the whole reason a variable face was chosen.

**Layout.**

- **16px corners on anything boxed, 8px on controls.** The site was square before
  the palette changed; softening it is most of what separates the two looks.
- **`.reveal` resolves out of a blur** — six pixels over 0.65s alongside the lift
  and fade, and off entirely under `prefers-reduced-motion`.
- **The hero is sized by width, never by viewport height.** With `object-cover` a
  short wide window crops more, and a `vh` height — or a `max-height`, which is
  the same trap — cut the pen tips off on large screens. The frame is 7:4 from
  640px, 5:4 below it, and stops widening at 1600px rather than growing taller.
- **Each hero slide carries its own crop position.** The pen photograph was
  widened to 7:4 in the file itself, because its pens stand the full height of
  the shot and no crop showed a whole one.
- **Nothing sits on the hero photograph below 640px.** The range label, the slide
  markers and the two links all move off it — a gift box is photographed centred,
  so anything floating in that frame covers the thing it is advertising. From
  640px up they go back on, where the framing leaves room.
- **Standalone links and buttons clear 24px in both directions.** The marks stay
  small; the padding around them does the work. This has had to be restored once
  after a revert took it out.

---

## SEO

`useSeo` sets the title, description, canonical, Open Graph tags, robots and
JSON-LD per page. Product pages emit `Product` schema; guides emit `Article`.

A page that cannot find its product or category passes `noindex` from the
*parent* route, not from `NotFound` — the parent's effect runs last and would
otherwise overwrite it, leaving a missing page titled "Product" and open to
indexing.

`public/sitemap.xml` is regenerated on every build by `scripts/sitemap.mjs`,
which reads the product rows, the active categories and the guide slugs — 146
URLs at present. It has been wrong twice. Written by hand, it drifted to listing
twenty-five withdrawn products and none of the new ranges. Rewritten to read the
data, its pattern required the category to end in `-pens`, which was true of
every range on the day it was written and silently dropped all thirty gifting
products afterwards. It now counts what it matched against the rows the file
declares and fails the build on a mismatch.

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
- Diary combos and doctor gifting are named in the copy and in the home page
  range band but have no photographs yet, so they are not ranges.
- The wordmark is gold, and gold is now the only warm thing on an indigo and
  lime site. An off-white or lime version for the dark sections would settle it.
- FormSubmit is not activated — see the enquiry flow above. Until it is, the
  contact and quote forms report success without delivering anything.
