import { Link } from "react-router-dom";

export type Crumb = { label: string; to?: string };

/**
 * Every page opens with this, so the way back to the home page is always in
 * the same place — the main navigation is hidden behind a menu button on
 * phones, and a logo alone is not an obvious way home for everyone.
 */
export default function Breadcrumb({
  trail,
  tone = "dark",
}: {
  trail: Crumb[];
  tone?: "dark" | "light";
}) {
  const muted = tone === "light" ? "text-white/55" : "text-muted";
  const hover = tone === "light" ? "hover:text-white" : "hover:text-ink";
  const current = tone === "light" ? "text-white" : "text-ink";

  return (
    <nav aria-label="Breadcrumb" className={`text-[0.8125rem] ${muted}`}>
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className={`transition-colors ${hover}`}>
            Home
          </Link>
        </li>
        {trail.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {c.to && i < trail.length - 1 ? (
              <Link to={c.to} className={`transition-colors ${hover}`}>
                {c.label}
              </Link>
            ) : (
              <span className={current} aria-current="page">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
