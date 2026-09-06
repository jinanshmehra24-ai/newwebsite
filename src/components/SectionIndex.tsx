import type { ReactNode } from "react";

/**
 * A numbered section marker: a filled numeral, a label in small caps, and a
 * hairline that runs out to the edge of the measure.
 *
 * This is the device the reference design leans on hardest — its page is read
 * as "1 Capabilities, 2 Projects, 3 Clients Say" rather than as a stack of
 * unrelated blocks. It costs nothing and it does something genuinely useful
 * for a catalogue: a visitor who lands halfway down knows where they are and
 * how much is left.
 *
 * The numeral takes the lime on dark sections and the violet on light ones.
 * That is not decoration — the violet measures 3.1:1 on the deep indigo, which
 * is under the 3:1 a filled shape needs to be seen, while the lime reads 13.7.
 */
export default function SectionIndex({
  n,
  label,
  tone = "dark",
}: {
  /** Position in the page, from 1. Rendered with a leading zero. */
  n: number;
  label: ReactNode;
  /** "dark" means dark type on a light ground; "light" is the inverse. */
  tone?: "dark" | "light";
}) {
  const onLight = tone === "dark";

  return (
    <div className="flex items-center gap-4">
      <span
        aria-hidden
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.6875rem] font-semibold ${
          onLight ? "bg-violet-500 text-white" : "bg-lime-400 text-deep"
        }`}
      >
        {n}
      </span>

      <span
        className={`shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] ${
          onLight ? "text-violet-500" : "text-lime-400"
        }`}
      >
        {label}
      </span>

      {/* The rule finishes the line rather than decorating it, so it takes
          whatever width is left. */}
      <span
        aria-hidden
        className={`h-px w-full ${onLight ? "bg-line" : "bg-white/15"}`}
      />
    </div>
  );
}
