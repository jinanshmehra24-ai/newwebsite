/**
 * What clients have actually said.
 *
 * Deliberately empty. Invented praise is the fastest way to lose a corporate
 * buyer's trust — the reader has seen the same three fabricated quotes on a
 * hundred supplier sites and discounts the whole page for it. The section that
 * renders these does not appear at all while the list is empty, so nothing is
 * claimed until there is something true to claim.
 *
 * To publish one, add an entry below and it appears on the home page. Ask the
 * client for permission to use their name and company; if they would rather
 * not be named, leave `company` out and use a role — "Purchase Manager,
 * automotive dealership" is still worth far more than an anonymous quote.
 */

export type Testimonial = {
  /** The client's own words, unedited beyond obvious typos. */
  quote: string;
  name: string;
  /** Their role, and the company if they are happy to be named. */
  role: string;
  company?: string;
  /** Optional: slug of the product they ordered, if it is on the site. */
  product?: string;
};

export const testimonials: Testimonial[] = [
  // Example of the shape — delete this comment and add real entries:
  // {
  //   quote: "The samples arrived in four days and the engraving on the final
  //           run matched them exactly. We have since ordered twice more.",
  //   name: "…",
  //   role: "Purchase Manager",
  //   company: "…",
  //   product: "metal-pen-26088",
  // },
];
