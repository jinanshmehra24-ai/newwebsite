import { ButtonLink } from "./ui";

/**
 * The question a first-time buyer is quietly asking.
 *
 * Anyone commissioning branded merchandise wants to know whose name ends up on
 * it — a supplier's mark on a client gift would defeat the whole point of
 * ordering it. Saying so plainly, before it is asked, settles the doubt and
 * doubles as the reason to buy: the gift carries their brand and nothing else.
 */
const POINTS = [
  {
    title: "Your logo, and nothing beside it",
    body: "No Chandra & Co. marking, no manufacturer's name, no third-party branding. The only name on the product is yours.",
  },
  {
    title: "We stay behind the work",
    body: "We are the supplier, not a co-brand. Your client sees your gift; how it was made stays between us.",
  },
  {
    title: "The range is the widest part",
    body: "Pens are where most people start, but the catalogue runs well past them — one requirement, one supplier, one conversation.",
  },
];

export default function BrandPromise() {
  return (
    <section className="bg-deep" aria-labelledby="promise-heading">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 sm:py-28">
        <div className="reveal max-w-2xl">
          <span aria-hidden className="block h-px w-9 bg-lime-400" />
          <p className="eyebrow mt-4 text-white/60">Whose Name Goes On It</p>
          <h2
            id="promise-heading"
            className="mt-3 text-[clamp(1.75rem,3.1vw,2.6rem)] text-white"
          >
            Your Brand. Only Your Brand.
          </h2>
          <p className="mt-5 text-[0.9375rem] leading-[1.8] text-white/70">
            You are in the right place. We exist to put your name in your
            client's hand — our job finishes the moment the box is opened, and
            nothing on the product says otherwise.
          </p>
        </div>

        {/* Laid out beside the statement rather than in a numbered row: the
            "Why Chandra & Co." band further down this page is already a dark
            ground carrying 01, 02, 03 across three columns, and a second one
            would read as the same section twice. */}
        <div className="mt-14 grid gap-x-16 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal hidden lg:block">
            <img
              src="/editorial/editorial-custom-900.webp"
              alt="A set of pens branded in a client's own corporate colours"
              width={420}
              height={280}
              loading="lazy"
              decoding="async"
              className="w-full object-cover"
            />
          </div>

          <ul className="space-y-8">
            {POINTS.map((p, i) => (
              <li
                key={p.title}
                className="reveal flex gap-5"
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <span
                  aria-hidden
                  className="mt-2.5 h-px w-7 shrink-0 bg-lime-400"
                />
                <div>
                  <h3 className="text-[0.9375rem] text-white">{p.title}</h3>
                  <p className="mt-2.5 max-w-lg text-[0.9375rem] leading-relaxed text-white/60">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal mt-14">
          <ButtonLink to="/quote" variant="accent">
            Tell Us What You Need
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
