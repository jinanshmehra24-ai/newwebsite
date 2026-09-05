import { siteConfig } from "../config/site";

export type Enquiry = {
  name: string;
  company: string;
  phone: string;
  email: string;
  product: string;
  quantity: string;
  message: string;
};

export type SubmitResult =
  | { ok: true; via: "form-service" | "api" | "mail-client" }
  | { ok: false; error: string };

/**
 * Single integration point for enquiry delivery.
 *
 * By default enquiries go to FormSubmit, which forwards them to the address in
 * siteConfig without any server of our own. `VITE_ENQUIRY_ENDPOINT` overrides
 * that with a real backend when one exists; if neither is available the enquiry
 * is handed to the visitor's mail client, so the form never claims to have sent
 * something it did not.
 */
export async function submitEnquiry(
  data: Enquiry,
  honeypot = "",
): Promise<SubmitResult> {
  // A bot filled the hidden field. Report success so it stops retrying, and
  // send nothing.
  if (honeypot.trim() !== "") return { ok: true, via: "form-service" };

  const custom = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined;
  if (custom) {
    try {
      const res = await fetch(custom, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) return { ok: false, error: `Server responded with ${res.status}.` };
      return { ok: true, via: "api" };
    } catch {
      return {
        ok: false,
        error: "We could not reach the server. Please try again, or contact us directly.",
      };
    }
  }

  const target = siteConfig.forms.enquiryTarget;
  if (target) {
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(target)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Name: data.name,
          Company: data.company,
          Phone: data.phone,
          Email: data.email,
          "Product interested in": data.product,
          "Quantity required": data.quantity,
          Message: data.message,
          _subject: `Enquiry from ${data.name}${data.company ? ` — ${data.company}` : ""}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const body = (await res.json().catch(() => null)) as
        | { success?: string | boolean; message?: string }
        | null;

      if (!res.ok || (body && String(body.success) === "false")) {
        return {
          ok: false,
          error:
            body?.message ??
            "We could not send the enquiry just now. Please try again, or reach us on WhatsApp.",
        };
      }
      return { ok: true, via: "form-service" };
    } catch {
      return {
        ok: false,
        error:
          "We could not reach the server. Please check your connection, or reach us on WhatsApp.",
      };
    }
  }

  const subject = `Enquiry from ${data.name}${data.company ? ` — ${data.company}` : ""}`;
  const body = [
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Product interested in: ${data.product}`,
    `Quantity required: ${data.quantity}`,
    "",
    data.message,
  ].join("\n");

  window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  return { ok: true, via: "mail-client" };
}
