import { useMemo, useState } from "react";
import { ButtonLink, ArrowRight } from "./ui";
import { whatsappLink, siteConfig } from "../config/site";
import type { Product } from "../data/products";

/**
 * Quantity is the only thing worth asking for on the page.
 *
 * Everything else a buyer needs settled — which branding method suits the
 * barrel, artwork, delivery dates, payment — is a conversation, and one that
 * goes faster on WhatsApp than through a form. So the page collects the single
 * figure that determines price, writes it into a message along with the SKU so
 * nobody has to describe which pen they meant, and hands the thread over.
 */

/**
 * The quick figures start at the product's own minimum, not at a fixed 100.
 * Offering 100 pieces of a pen that ships in thousands invites an enquiry we
 * would only have to correct, and reads as though nobody checked.
 */
const STEPS = [1, 2.5, 5, 10];

function presetsFor(moq?: string) {
  const base = moq ? parseInt(moq.replace(/[^\d]/g, ""), 10) : NaN;
  const floor = Number.isFinite(base) && base > 0 ? base : 100;
  return STEPS.map((s) => Math.round((floor * s) / 50) * 50 || floor);
}

export default function ProductEnquiry({ product }: { product: Product }) {
  const [qty, setQty] = useState("");
  const presets = useMemo(() => presetsFor(product.moq), [product.moq]);
  const minimum = presets[0];

  const message = useMemo(() => {
    const n = parseInt(qty, 10);
    const lines = [
      `Hello ${siteConfig.name},`,
      "",
      `I would like to enquire about this product:`,
      `• Product: ${product.name}`,
      `• SKU: ${product.sku ?? "—"}`,
      `• Quantity: ${Number.isFinite(n) && n > 0 ? `${n} pieces` : "to be confirmed"}`,
      "",
      "Please share pricing and branding options.",
    ];
    return lines.join("\n");
  }, [qty, product]);

  return (
    <section
      aria-labelledby="enquire-heading"
      className="mt-10 border-t border-line pt-8"
    >
      <h2 id="enquire-heading" className="eyebrow">
        Enquire
      </h2>
      <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted">
        We would love to help with this one. Tell us how many pieces you need
        and we will take it from there — branding method, artwork, pricing and
        delivery are all worked out with you personally over WhatsApp.
      </p>

      <div className="mt-7">
        <label
          htmlFor="qty"
          className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted"
        >
          Quantity
        </label>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            id="qty"
            name="quantity"
            type="number"
            inputMode="numeric"
            min={minimum}
            step={1}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder={String(minimum)}
            aria-describedby={product.moq ? "qty-moq" : undefined}
            className="w-32 border border-line bg-white px-4 py-2.5 text-[0.9375rem] text-ink outline-none transition-colors focus:border-ink"
          />
          <span className="text-[0.8125rem] text-muted">pieces</span>

          {/* The field stays open — these only save typing the common figures. */}
          <div className="flex flex-wrap gap-2">
            {presets.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setQty(String(n))}
                aria-pressed={qty === String(n)}
                className={`border px-3.5 py-2 text-[0.75rem] tracking-[0.08em] transition-colors ${
                  qty === String(n)
                    ? "border-ink bg-ink text-white"
                    : "border-line text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {product.moq && (
          <p id="qty-moq" className="mt-3 text-[0.8125rem] text-muted">
            Minimum order {product.moq}.
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <ButtonLink
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Continue on WhatsApp
          <ArrowRight />
        </ButtonLink>

        <ButtonLink
          to={`/quote?product=${encodeURIComponent(product.name)}`}
          variant="link"
        >
          Or send an enquiry form
        </ButtonLink>
      </div>

      <p className="mt-6 text-[0.8125rem] leading-relaxed text-muted">
        Your message opens ready to send, with{" "}
        {product.sku ? (
          <>
            SKU <span className="font-mono text-ink">{product.sku}</span>
          </>
        ) : (
          "the product"
        )}{" "}
        already filled in.
      </p>
    </section>
  );
}
