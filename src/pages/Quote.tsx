import { useSearchParams } from "react-router-dom";
import EnquiryForm from "../components/EnquiryForm";
import ContactOptions from "../components/ContactOptions";
import { categories } from "../data/categories";
import { useReveal } from "../lib/useReveal";
import PageHeader from "../components/PageHeader";
import { useSeo } from "../lib/useSeo";

const STEPS = [
  {
    title: "Share the requirement",
    body: "Product, approximate quantity, branding and the date you need it by.",
  },
  {
    title: "We come back with options",
    body: "Suitable products across price points, with the branding method for each.",
  },
  {
    title: "Approve artwork",
    body: "We confirm placement and print size against your logo files before production.",
  },
  {
    title: "Production & delivery",
    body: "Manufacturing, branding and dispatch, tracked through to your address.",
  },
];

export default function Quote() {
  const [params] = useSearchParams();
  const root = useReveal<HTMLDivElement>();
  const requested = params.get("product") ?? "";

  // Pre-select the category when the visitor arrived from a product page.
  const preset =
    categories.find((c) =>
      requested.toLowerCase().includes(c.name.toLowerCase().split(" ")[0]),
    )?.name ?? "";

  useSeo({
    title: "Request a Quote",
    description:
      "Request a quote from Chandra & Co. for corporate gifting and promotional products — share your product, quantity and branding requirement.",
    path: "/quote",
  });

  return (
    <div ref={root}>
      <PageHeader
        trail={[{ label: "Request a Quote" }]}
        eyebrow="Request a Quote"
        title="Tell Us What You Need."
        intro="No pricing is published online — every quote is built against your quantity, product selection and branding method."
      />

      {requested && (
        <div className="border-b border-line bg-paper">
          <div className="mx-auto max-w-[1400px] px-5 pb-10 sm:px-8">
            <p className="inline-block border border-line bg-white px-4 py-2.5 text-[0.875rem] text-ink">
              Enquiring about: <span className="font-medium">{requested}</span>
            </p>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="reveal">
            <EnquiryForm defaultProduct={preset} />
          </div>

          <aside className="reveal">
            <h2 className="eyebrow">How It Works</h2>
            <ol className="mt-6 space-y-7">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="text-2xl text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[0.9375rem] text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12">
              <h2 className="eyebrow">Prefer to talk?</h2>
              <div className="mt-5">
                <ContactOptions />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
