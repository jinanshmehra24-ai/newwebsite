/**
 * Buying guides.
 *
 * The catalogue answers "what does it look like". These answer the questions
 * that come before that — which print method survives on which barrel, how many
 * pieces an event actually needs, what artwork is usable — and they are the
 * questions people type into Google months before they contact anyone. Written
 * to be genuinely useful on their own: a page that only funnels the reader to a
 * quote form ranks badly and reads worse.
 *
 * Nothing here promises anything the business has not already stated elsewhere
 * on the site: the branding methods, the minimums and the delivery terms all
 * match the product data and the capability list.
 */

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  /** Shown on cards and in search results. */
  summary: string;
  /** ISO date — used for article metadata and ordering. */
  published: string;
  readingMinutes: number;
  intro: string;
  sections: GuideSection[];
  /** Slug of the range this guide sends the reader to, if any. */
  range?: string;
};

export const guides: Guide[] = [
  {
    slug: "printing-methods-for-corporate-pens",
    title: "Screen Printing, Laser Engraving or UV: Which Suits Your Pen",
    summary:
      "The branding method is decided by the barrel, not by preference. What each one does, where each one fails, and how to pick before you order.",
    published: "2026-08-12",
    readingMinutes: 6,
    range: "executive-pens",
    intro:
      "Most branding problems on corporate pens are not print problems — they are pairing problems. A logo that looks crisp on a matte metal barrel can close up on a round plastic one, and a four-colour mark that works on a wide plastic body cannot be reproduced by engraving at all. Choosing the method first, and the pen second, avoids nearly all of it.",
    sections: [
      {
        heading: "Laser engraving — metal only, one tone, permanent",
        paragraphs: [
          "Engraving burns the mark into the surface, so it cannot rub off, fade in a pocket or wash out. It reads as a tonal mark in the colour the metal turns underneath — usually a lighter grey or a warm bronze — which means it carries shape beautifully and colour not at all.",
          "It is the right choice for a gift that has to feel considered: a weighted metal pen for a client or a long-serving employee. It is the wrong choice for a logo that depends on its colours to be recognised.",
        ],
        list: [
          "Best on: metal barrels, matte or brushed finishes",
          "Reproduces: outlines, letterforms, single-tone marks",
          "Cannot reproduce: brand colours, gradients, photographs",
          "Wears: effectively never",
        ],
      },
      {
        heading: "Screen printing — plastic bodies, solid colours, high volume",
        paragraphs: [
          "Ink is pushed through a fine mesh onto the barrel, one colour at a time. Each colour needs its own screen, so a one- or two-colour logo is economical at volume and a six-colour one is not.",
          "The result is a solid, opaque mark that sits slightly proud of the surface. On a light barrel a dark logo is unmissable; on a dark barrel, light inks need care, and this is worth raising when you send artwork.",
        ],
        list: [
          "Best on: plastic and moulded barrels",
          "Reproduces: solid brand colours, one to three of them",
          "Struggles with: fine gradients, very small type",
          "Wears: well, with normal handling",
        ],
      },
      {
        heading: "UV printing — full colour, fine detail, wide print area",
        paragraphs: [
          "UV printing lays the whole image down at once and cures it instantly, which makes full-colour marks and gradients possible on a pen barrel. It is what to ask for when the logo has photographic elements or a colour blend that screen printing would have to simplify.",
          "It needs a reasonably flat and generous print area, so it suits the wider plastic bodies rather than a slim metal barrel.",
        ],
        list: [
          "Best on: wide plastic barrels and flat panels",
          "Reproduces: full colour, gradients, fine detail",
          "Needs: a decent print area and a resolvable file",
        ],
      },
      {
        heading: "How to decide in one minute",
        paragraphs: [
          "Ask two questions. Does the logo have to appear in its brand colours? If yes, engraving is out. Is the pen metal? If yes, screen and UV are usually out. That leaves one method most of the time, and the pen range follows from it.",
          "If you are unsure, send the logo and say what the gift is for. We will tell you which method the artwork will survive and show the placement before anything is made.",
        ],
      },
    ],
  },
  {
    slug: "how-many-pens-corporate-gift-quantities",
    title: "How Many Pens to Order for an Event, a Team or a Dealer Network",
    summary:
      "Ordering short costs more than ordering long. A practical way to arrive at a quantity for conferences, employee gifts and dealer campaigns.",
    published: "2026-08-26",
    readingMinutes: 5,
    intro:
      "The most expensive order is the second one. Setting up a print run has a fixed cost — the screen, the plate, the machine setup — and it is paid again in full when you come back a month later for another two hundred pieces. Arriving at the right number the first time is worth ten minutes of arithmetic.",
    sections: [
      {
        heading: "Start from the headcount, then add the overage",
        paragraphs: [
          "Take the actual number of people who will receive one, then add for the things that always happen: pens that go missing in transit, a handful kept back at each location, the colleague who asks for one for a client, and the samples that stay in the office.",
          "For most corporate runs, ten per cent over the headcount is the point where you stop worrying. For a public event where anyone can take one, plan on considerably more than the number of registrations — visitors take a second for a colleague.",
        ],
        list: [
          "Employee gifting: headcount plus 10%",
          "Conference or exhibition: expected footfall, not registrations",
          "Dealer or branch despatch: per-location quantity plus a reserve at head office",
          "Client gifting: the list, plus a box kept for the year's new accounts",
        ],
      },
      {
        heading: "Where the price actually moves",
        paragraphs: [
          "Unit price falls in steps, not smoothly. The setup is spread across the run, so the drop between one hundred and five hundred pieces is far steeper than between five hundred and a thousand.",
          "It is often worth asking for the price at two or three quantities before deciding. A quantity slightly above your headcount is sometimes cheaper in total than the exact number, because it crosses a step.",
        ],
      },
      {
        heading: "Minimums, and why they exist",
        paragraphs: [
          "Some ranges start at a hundred pieces and others at a thousand. The difference is how the pen is made: a moulded plastic body printed at volume has a much larger economic run than a metal pen finished individually.",
          "Each product page on this site states its own minimum. If your quantity is below it, say so anyway — there is often a comparable model with a lower one.",
        ],
      },
    ],
  },
  {
    slug: "artwork-for-pen-branding",
    title: "What Artwork to Send for Pen Branding",
    summary:
      "A logo that looks fine on a letterhead can be unusable at 12mm on a barrel. What to send, what to avoid, and what we fix at our end.",
    published: "2026-09-09",
    readingMinutes: 4,
    intro:
      "A pen gives you a print area a little wider than a fingertip. Almost every artwork problem comes from a file that was made for something much bigger, and almost all of them can be sorted before production if they are spotted early.",
    sections: [
      {
        heading: "Send the original, not the one from the website",
        paragraphs: [
          "A vector file — .ai, .eps, .pdf or .svg — can be scaled to any size without softening, which is exactly what a small print area needs. A logo lifted from a website is usually a few hundred pixels wide and will look furred at print size, however good it looks on screen.",
          "If the vector file is with your agency and hard to retrieve, send the largest image you have. Redrawing a simple mark is quick work and we would rather do that than print a soft one.",
        ],
        list: [
          "Ideal: .ai, .eps, .pdf or .svg",
          "Workable: a PNG at least 1500px across, on a transparent background",
          "Difficult: a screenshot, a photograph of a business card, a logo inside a Word file",
        ],
      },
      {
        heading: "What tends to disappear at pen size",
        paragraphs: [
          "Hairline rules, tag lines set very small, and fine detail inside a symbol are the first casualties. So are white gaps narrower than the stroke around them — at 12mm they fill in and the mark turns solid.",
          "This is normally solved by using a simplified version of the logo, which most brand guidelines already provide for small applications. If yours does not, we will suggest what to drop and show you before anything is printed.",
        ],
      },
      {
        heading: "Colours",
        paragraphs: [
          "Send the Pantone references if you have them. Screen and UV inks are mixed to those, and a brand red matched by eye is a brand red your marketing team will notice.",
          "For engraving, colour does not apply — the mark takes the tone of the metal underneath, and it is worth seeing that on a sample before the run.",
        ],
      },
    ],
  },
  {
    slug: "metal-or-plastic-corporate-pen",
    title: "Metal or Plastic: Choosing a Corporate Pen by Occasion",
    summary:
      "The same budget buys a few hundred metal pens or a few thousand plastic ones. Which of those is the right answer depends entirely on who receives it.",
    published: "2026-09-23",
    readingMinutes: 5,
    range: "executive-pens",
    intro:
      "There is no better material, only a better fit. A metal pen handed to two thousand exhibition visitors is money spent on people who will never call, and a plastic pen handed to a client closing a large account says something you did not mean to say.",
    sections: [
      {
        heading: "Metal — when the pen is the gift",
        paragraphs: [
          "A weighted barrel is noticed in the hand before anything is written with it, and that weight is most of what makes a pen read as a gift rather than a giveaway. It stays on a desk instead of in a drawer, which is where the brand value actually comes from.",
          "Use it where the recipient is specific and the relationship matters: clients, senior employees, long-service recognition, a boxed gift for a milestone.",
        ],
      },
      {
        heading: "Plastic — when reach is the point",
        paragraphs: [
          "A moulded body costs a fraction of a metal one and takes a far bigger, brighter print. Across a conference floor or a dealer network, that print area is doing more work than any amount of heft.",
          "Use it where the number matters more than the individual: exhibitions, campaigns, branch stationery, anything where you would rather be in a thousand hands than in fifty.",
        ],
      },
      {
        heading: "Splitting the order",
        paragraphs: [
          "Most companies of any size need both, and buying them together usually costs less than buying them separately because the artwork is prepared once.",
          "A common split is a small metal run for a named list and a large plastic run for everyone else. Tell us both numbers at the same time and the quote will reflect it.",
        ],
      },
    ],
  },
];

export const guideBySlug = (slug: string): Guide | undefined =>
  guides.find((g) => g.slug === slug);

/** Newest first — the list page and the home page both read in this order. */
export const guidesByDate = (): Guide[] =>
  [...guides].sort((a, b) => b.published.localeCompare(a.published));
