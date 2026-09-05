/**
 * What a buyer actually has to ask about, answered before they ask.
 *
 * A purchase manager pricing a thousand branded pens is not reading prose — she
 * is checking a list in her head: can they print my logo the way I need it, do
 * they box it, will they fix my artwork, will it reach my branches. Set as
 * pills rather than sentences, the whole list is taken in at a glance, and the
 * slight stagger keeps it from reading as a form.
 */
const CAPABILITIES = [
  "Screen Printing",
  "Laser Engraving",
  "UV Printing",
  "Full-Colour Barrel Wrap",
  "Pad Printing",
  "Artwork Assistance",
  "Custom Gift Boxes",
  "Individual Sleeve Packing",
  "Bulk Campaign Runs",
  "Dealer & Branch Despatch",
  "Pan-India Delivery",
  "Samples Before Production",
];

export default function Capabilities() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
      <div className="reveal">
        <span aria-hidden className="mx-auto block h-px w-9 bg-gold-500" />
        <p className="eyebrow mt-4 text-center">What We Handle</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center text-[clamp(1.2rem,2.1vw,1.75rem)] tracking-[0.05em] text-ink">
          One Supplier, Start to Finish
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-[0.9375rem] leading-[1.8] text-muted">
          From choosing the branding method that suits the barrel to getting the
          boxes onto your branches — it is all handled here.
        </p>
      </div>

      <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
        {CAPABILITIES.map((c, i) => (
          <li
            key={c}
            className="reveal"
            style={{ transitionDelay: `${(i % 6) * 45}ms` }}
          >
            <span className="chip">
              <span aria-hidden className="chip-dot" />
              {c}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
