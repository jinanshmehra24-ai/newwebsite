import { useId, useRef, useState } from "react";
import { Button } from "./ui";
import { submitEnquiry, type Enquiry } from "../lib/submitEnquiry";
import { MIN_FILL_MS, checkRate, recordSent, signature } from "../lib/spamGuard";
import { categories } from "../data/categories";
import { siteConfig } from "../config/site";

const EMPTY: Enquiry = {
  name: "",
  company: "",
  phone: "",
  email: "",
  product: "",
  quantity: "",
  message: "",
};

type Errors = Partial<Record<keyof Enquiry, string>>;

const FIELD =
  "w-full rounded-sm border bg-white px-4 py-3.5 text-[0.9375rem] text-ink transition-colors placeholder:text-muted/55 focus:border-line focus:outline-none";

const LABEL =
  "mb-2 block text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink";

function TextField({
  uid,
  name,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
}: {
  uid: string;
  name: keyof Enquiry;
  label: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={`${uid}-${name}`} className={LABEL}>
        {label}
      </label>
      <input
        id={`${uid}-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${uid}-${name}-error` : undefined}
        className={`${FIELD} ${error ? "border-red-500" : "border-line"}`}
      />
      {error && (
        <p id={`${uid}-${name}-error`} className="mt-1.5 text-[0.8125rem] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function validate(v: Enquiry): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (v.company.trim().length < 2) e.company = "Please enter your company name.";
  if (!/^[\d\s+()-]{8,18}$/.test(v.phone.trim()))
    e.phone = "Please enter a valid phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Please enter a valid email address.";
  if (!v.product.trim()) e.product = "Please choose a product category.";
  if (!v.quantity.trim()) e.quantity = "Please enter an approximate quantity.";
  return e;
}

export default function EnquiryForm({
  defaultProduct = "",
  compact = false,
}: {
  defaultProduct?: string;
  compact?: boolean;
}) {
  const uid = useId();
  const [values, setValues] = useState<Enquiry>({ ...EMPTY, product: defaultProduct });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [note, setNote] = useState("");

  /** Left empty by people; scripts fill every field they find. */
  const [honeypot, setHoneypot] = useState("");
  const openedAt = useRef(Date.now());

  const set = (key: keyof Enquiry) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((x) => ({ ...x, [key]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.getElementById(`${uid}-${Object.keys(found)[0]}`);
      first?.focus();
      return;
    }

    // Silently accept a bot submission — no request, no error to learn from.
    const looksAutomated =
      honeypot.trim() !== "" || Date.now() - openedAt.current < MIN_FILL_MS;

    const sig = signature(values);
    if (!looksAutomated) {
      const verdict = checkRate(sig);
      if (!verdict.ok) {
        setState("error");
        setNote(verdict.reason);
        return;
      }
    }

    setState("sending");
    const result = looksAutomated
      ? ({ ok: true, via: "form-service" } as const)
      : await submitEnquiry(values, honeypot);

    if (result.ok) {
      if (!looksAutomated) recordSent(sig);
      setState("sent");
      setNote(
        result.via === "mail-client"
          ? "Your email application has been opened with the enquiry ready to send. If nothing opened, please write to us directly."
          : "Thank you — your enquiry has reached our team. We usually respond within one working day.",
      );
      setValues({ ...EMPTY, product: defaultProduct });
    } else {
      setState("error");
      setNote(result.error);
    }
  }

  if (state === "sent") {
    return (
      <div
        role="status"
        className="border border-white/50 bg-white p-8 text-center sm:p-12"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink/12">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 12.5 9.5 18 20 7"
              stroke="var(--color-muted)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-6 text-3xl text-ink">Enquiry Received</h3>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted">
          {note}
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-7 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={compact ? "" : "space-y-5"}>
      {/* Honeypot: off-screen rather than display:none, since some bots skip
          hidden fields. Kept out of the tab order and from screen readers. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          name="_honey"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          uid={uid}
          name="name"
          label="Name"
          autoComplete="name"
          placeholder="Your full name"
          value={values.name}
          error={errors.name}
          onChange={set("name")}
        />
        <TextField
          uid={uid}
          name="company"
          label="Company Name"
          autoComplete="organization"
          placeholder="Your company"
          value={values.company}
          error={errors.company}
          onChange={set("company")}
        />
        <TextField
          uid={uid}
          name="phone"
          label="Phone Number"
          type="tel"
          autoComplete="tel"
          placeholder="+91 00000 00000"
          value={values.phone}
          error={errors.phone}
          onChange={set("phone")}
        />
        <TextField
          uid={uid}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={values.email}
          error={errors.email}
          onChange={set("email")}
        />

        <div>
          <label
            htmlFor={`${uid}-product`}
            className={LABEL}
          >
            Product Interested In
          </label>
          <select
            id={`${uid}-product`}
            name="product"
            value={values.product}
            onChange={set("product")}
            aria-invalid={errors.product ? true : undefined}
            aria-describedby={errors.product ? `${uid}-product-error` : undefined}
            className={`${FIELD} ${errors.product ? "border-red-500" : "border-line"}`}
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
            <option value="Mixed / Not sure yet">Mixed / Not sure yet</option>
          </select>
          {errors.product && (
            <p id={`${uid}-product-error`} className="mt-1.5 text-[0.8125rem] text-red-600">
              {errors.product}
            </p>
          )}
        </div>

        <TextField
          uid={uid}
          name="quantity"
          label="Quantity Required"
          placeholder="e.g. 500 pieces"
          value={values.quantity}
          error={errors.quantity}
          onChange={set("quantity")}
        />
      </div>

      <div>
        <label
          htmlFor={`${uid}-message`}
          className={LABEL}
        >
          Message <span className="font-normal normal-case tracking-normal text-muted">(optional)</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          value={values.message}
          onChange={set("message")}
          placeholder="Tell us about your branding requirement, timelines or budget."
          className={`${FIELD} resize-y border-line`}
        />
      </div>

      {state === "error" && (
        <p role="alert" className="text-[0.875rem] text-red-600">
          {note}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5 pt-1">
        <Button type="submit" disabled={state === "sending"} className="disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Send Enquiry"}
        </Button>
        <p className="text-[0.8125rem] text-muted">
          Or call us on{" "}
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="font-medium text-ink underline underline-offset-2"
          >
            {siteConfig.contact.phoneDisplay}
          </a>
        </p>
      </div>
    </form>
  );
}
