import { useEffect, useRef } from "react";

/**
 * Reveals elements carrying `.reveal` once they enter the viewport.
 *
 * Elements are shown immediately when IntersectionObserver is unavailable or
 * the visitor prefers reduced motion, so content is never hidden.
 *
 * The list is re-scanned as the subtree changes. It used to be collected once
 * on mount, which was fine while every `.reveal` was present from the start —
 * but the catalogue grid rebuilds itself whenever a filter or a search term
 * changes, and any card arriving after mount would have been left hidden for
 * good. That is the kind of fault that only shows up on the second click.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const show = (n: Element) => n.setAttribute("data-visible", "true");
    const pending = () =>
      Array.from(root.querySelectorAll<HTMLElement>(".reveal:not([data-visible])"));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      pending().forEach(show);
      const mo = new MutationObserver(() => pending().forEach(show));
      mo.observe(root, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const watch = () => pending().forEach((n) => observer.observe(n));
    watch();

    const mo = new MutationObserver(watch);
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      observer.disconnect();
    };
  }, []);

  return ref;
}
