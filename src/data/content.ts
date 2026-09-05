/**
 * The practical answers, not the adjectives.
 *
 * This strip and the "Why Chandra & Co." block below it used to say the same
 * four things — "Premium Quality" and "Custom Branding" appeared in both, in
 * almost the same words. Claims of quality are what every supplier writes and
 * no buyer believes. What a buyer cannot find out for herself is how small a
 * run can be, whether she gets to hold one before committing, what happens to
 * her badly-drawn logo file, and whether it reaches all eleven branches. So
 * that is what this strip now answers.
 */
export const assurances = [
  {
    title: "Every range states its minimum",
    body: "Some ranges start at a hundred pieces, others at a thousand. Each product page states its own minimum.",
  },
  {
    title: "A sample before the run",
    body: "See your branding on the actual product and approve it before the full quantity is made.",
  },
  {
    title: "Artwork sorted here",
    body: "Send whatever file you have. We prepare it for the print method and show you the placement first.",
  },
  {
    title: "Delivered across India",
    body: "To one address, or split across branches, dealers and event venues.",
  },
] as const;

/**
 * Written about the buyer's job, not about our products.
 *
 * These read "Premium Quality", "Professional Finish", "Reliable Service" — the
 * six things every supplier claims and none of them can prove on a web page. A
 * buyer arrives with problems instead: her logo file is the wrong format, she
 * needs eleven branches supplied on one purchase order, and she cannot sign off
 * a thousand pieces she has never held. Answering those is worth more than any
 * adjective, and the answer is always the same one — her brand, done properly.
 */
export const whyPoints = [
  {
    title: "Your logo, handled properly",
    body: "Send whatever file you have. We prepare it for the print method, tell you if anything will close up at that size, and show you the placement before it is made.",
  },
  {
    title: "See it before you commit",
    body: "A sample with your branding on the actual product, approved by you, before the full run is produced.",
  },
  {
    title: "One order, every location",
    body: "Split across branches, dealers and event venues on a single purchase order, or delivered to one address — whichever suits your accounts team.",
  },
  {
    title: "The right method for the piece",
    body: "Engraving on metal, screen or UV on moulded bodies. We pick what your artwork will survive rather than what is quickest to run.",
  },
  {
    title: "Nothing of ours on it",
    body: "No Chandra & Co. marking, no manufacturer's name. The only name your client reads is yours.",
  },
  {
    title: "Answers, not quotes alone",
    body: "Tell us the occasion, the headcount and the budget. You get options that fit all three, with the reasoning, so the decision is easy to defend.",
  },
] as const;

export const useCases = [
  "Corporate Gifting",
  "Employee Gifting",
  "Conferences",
  "Events",
  "Client Gifts",
  "Dealer Gifts",
  "Promotional Campaigns",
  "Brand Launches",
  "Office Merchandise",
] as const;

export const brandingMethods = [
  {
    title: "Laser Engraving",
    body: "A permanent, tonal mark cut into metal. The finish of choice for executive pens and metal gift pieces.",
  },
  {
    title: "Screen Printing",
    body: "Dense, durable colour laid directly onto barrels and moulded bodies at campaign volumes.",
  },
  {
    title: "Full-Colour UV Printing",
    body: "Photographic detail and gradients held cleanly across moulded barrels and clips.",
  },
  {
    title: "Custom Colour Matching",
    body: "Barrel, grip and trim matched to your brand palette so the pen reads as yours on sight.",
  },
] as const;
