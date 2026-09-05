import { siteConfig, mailLink, telLink, whatsappLink } from "../config/site";
import { ArrowRight } from "./ui";

const options = [
  {
    label: "WhatsApp",
    value: siteConfig.contact.phoneDisplay,
    href: whatsappLink(
      "Hello Chandra & Co., I'd like to discuss a corporate gifting requirement.",
    ),
    external: true,
    note: "Fastest for sharing requirements and artwork",
  },
  {
    label: "Call Us",
    value: siteConfig.contact.phoneDisplay,
    href: telLink,
    external: false,
    note: "Mon–Sat, 10:00 – 19:00 IST",
  },
  {
    label: "Email Us",
    value: siteConfig.contact.email,
    href: mailLink,
    external: false,
    note: "Detailed briefs and tender documents",
  },
];

export default function ContactOptions() {
  return (
    <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
      {options.map((o) => (
        <a
          key={o.label}
          href={o.href}
          {...(o.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="group flex flex-col bg-white p-7 transition-colors duration-300 hover:bg-paper"
        >
          <span className="eyebrow">{o.label}</span>
          <span className="mt-3 break-all text-[0.9375rem] text-ink">
            {o.value}
          </span>
          <span className="mt-2 text-[0.8125rem] text-muted">{o.note}</span>
          <ArrowRight className="mt-6 text-muted transition-transform duration-300 group-hover:translate-x-1.5" />
        </a>
      ))}
    </div>
  );
}
