import { Link } from "react-router-dom";
import type { ReactNode } from "react";

const BASE =
  "inline-flex items-center justify-center gap-2 text-[0.75rem] font-normal uppercase tracking-[0.12em] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * Buttons are deliberately quiet: a thin rule or a hairline box, never a
 * filled slab. Emphasis comes from placement and space, not weight.
 */
const VARIANTS = {
  primary:
    "rounded-[2px] border border-ink px-9 py-3.5 text-ink hover:bg-ink hover:text-white",
  /* The one filled button, and the only place the brand gold carries a whole
     surface. It sits on the dark band, where the previous styling — ink border,
     muted text — was a light-ground button dropped onto a dark one and came out
     at 2.9:1 with an invisible edge. */
  gold: "rounded-[2px] bg-gold-300 px-9 py-3.5 text-navy-950 hover:bg-gold-200",
  outline:
    "rounded-[2px] border border-ink/25 px-9 py-3.5 text-ink hover:border-gold-500",
  /* The rule under a quiet link is always there in ink; a gold one is drawn
     over it from the left on hover, so the change reads as a stroke being made
     rather than a colour being swapped. */
  link:
    "relative border-b border-ink/40 pb-1 text-ink " +
    "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 " +
    "after:bg-gold-500 after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] " +
    "hover:after:scale-x-100 focus-visible:after:scale-x-100",
  ghostLight:
    "border border-white/45 px-9 py-3.5 text-white hover:bg-white hover:text-ink",
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
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-xl text-center" : "max-w-xl"}`}>
      {eyebrow && (
        <>
          <span
            aria-hidden
            className={`block h-px w-9 ${centered ? "mx-auto" : ""} ${
              tone === "light" ? "bg-white/40" : "bg-gold-500"
            }`}
          />
          <p className={`eyebrow mt-4 ${tone === "light" ? "text-white/60" : ""}`}>
            {eyebrow}
          </p>
        </>
      )}
      <Tag
        className={`mt-3 text-[clamp(1.2rem,2.1vw,1.75rem)] tracking-[0.05em] ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
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
