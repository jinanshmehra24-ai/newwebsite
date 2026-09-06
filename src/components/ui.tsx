import { Link } from "react-router-dom";
import SectionIndex from "./SectionIndex";
import type { ReactNode } from "react";

/* Buttons keep their small caps — a button is a label, and that is the one
   job uppercase still has here. What goes is the 2px corner: a radius that
   small is neither a square nor a curve, it just looks like nobody decided.
   Square, with more air inside it. */
const BASE =
  "inline-flex items-center justify-center gap-2 text-[0.75rem] font-normal uppercase tracking-[0.1em] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * Buttons are deliberately quiet: a thin rule or a hairline box, never a
 * filled slab. Emphasis comes from placement and space, not weight.
 */
const VARIANTS = {
  primary:
    "rounded-lg bg-ink px-8 py-3.5 text-paper hover:bg-deep",
  /* The one filled button on the site, and the only place the lime carries a
     whole surface. It belongs on the dark sections, where it reads at 13.7:1
     and does the job the reference design gives it: one thing on the page
     that raises its voice. */
  accent: "rounded-lg bg-lime-400 px-8 py-3.5 text-deep hover:bg-lime-300",
  /* Reads as WhatsApp at a glance, which is the whole point of it. Deep
     indigo on the green rather than white — see the note on the token. */
  whatsapp:
    "rounded-lg bg-whatsapp px-8 py-3.5 text-deep hover:bg-whatsapp-dark",
  outline:
    "rounded-lg border border-ink/20 px-8 py-3.5 text-ink hover:border-ink/50",
  /* The rule under a quiet link is always there in ink; a violet one is drawn
     over it from the left on hover, so the change reads as a stroke being made
     rather than a colour being swapped. */
  link:
    "relative border-b border-ink/40 pb-1 text-ink " +
    "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 " +
    "after:bg-violet-500 after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] " +
    "hover:after:scale-x-100 focus-visible:after:scale-x-100",
  ghostLight:
    "rounded-lg border border-white/35 px-8 py-3.5 text-white hover:bg-white hover:text-deep",
  linkLight:
    "relative border-b border-white/50 pb-1 text-white " +
    "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 " +
    "after:bg-white after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] " +
    "hover:after:scale-x-100 focus-visible:after:scale-x-100",
} as const;

type Variant = keyof typeof VARIANTS;

export function ButtonLink({
  to,
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: {
  to?: string;
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a className={cls} href={href} {...rest}>
      {children}
    </a>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: {
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  index,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  /** Position in the page. Given one, the heading wears a numbered marker
      instead of the short rule, and the block runs the full measure. */
  index?: number;
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  const numbered = typeof index === "number";

  return (
    <div
      className={
        numbered
          ? ""
          : centered
            ? "mx-auto max-w-xl text-center"
            : "max-w-xl"
      }
    >
      {numbered && eyebrow && (
        <SectionIndex n={index} label={eyebrow} tone={tone} />
      )}

      {!numbered && eyebrow && (
        <>
          <span
            aria-hidden
            className={`block h-px w-9 ${centered ? "mx-auto" : ""} ${
              tone === "light" ? "bg-white/40" : "bg-violet-500"
            }`}
          />
          <p className={`eyebrow mt-4 ${tone === "light" ? "text-white/60" : ""}`}>
            {eyebrow}
          </p>
        </>
      )}
      <Tag
        className={`text-[clamp(1.5rem,3.4vw,2.9rem)] ${
          numbered ? "mt-7 max-w-2xl" : "mt-3"
        } ${tone === "light" ? "text-white" : "text-ink"}`}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={`mt-4 text-[0.9375rem] leading-[1.8] ${
            tone === "light" ? "text-white/70" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
