import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { categoryBySlug } from "../data/categories";

/**
 * The home page opens on a rotating set of photographs rather than one.
 *
 * Each slide carries its own crop position, because the frame is wider than the
 * photographs and something has to be given up: the pen row runs to the very
 * bottom edge of its shot, so that one is held to its foot while the rest sit
 * centred. Getting this wrong is what cut the tips off the last hero.
 */
type Slide = {
  name: string;
  alt: string;
  /** object-position, chosen per photograph — see the note above. */
  position: string;
  /** The range this photograph is showing; the picture links straight to it. */
  category: string;
  /** Intrinsic size, so the browser reserves the right box before it loads. */
  width: number;
  height: number;
};

const SLIDES: Slide[] = [
  {
    name: "hero-gift-set",
    width: 1536,
    height: 1024,
    category: "gift-sets",
    alt: "A boxed corporate gift set — a two-tone diary and a rose gold pen in a fitted presentation tray",
    position: "50% 50%",
  },
  {
    name: "hero-laptop-bag",
    width: 1536,
    height: 1024,
    category: "bags",
    alt: "A brown leather laptop bag with a detachable shoulder strap, on a marble surface",
    position: "50% 50%",
  },
  {
    name: "hero-acrylic-tray",
    width: 1536,
    height: 1024,
    category: "desk-accessories",
    alt: "A custom-cut clear acrylic gifting piece holding honey, seeds and fresh amla",
    position: "50% 50%",
  },
  {
    name: "hero-pen-range",
    width: 1536,
    height: 878,
    category: "prime-pens",
    alt: "Six corporate ball pens in burgundy, black, green, blue, white and tan, each with a gold clip",
    // Widened to 7:4 in the file itself, so the frame crops nothing off it.
    position: "50% 50%",
  },
];

const DWELL_MS = 6500;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const go = useCallback(
    (step: number) =>
      setIndex((i) => (i + step + SLIDES.length) % SLIDES.length),
    [],
  );
  const advance = useCallback(() => go(1), [go]);

  const current = SLIDES[index];
  const range = categoryBySlug(current.category);

  /**
   * The photograph drifts a few pixels against the pointer.
   *
   * Written straight to a CSS variable rather than through state: a mousemove
   * fires dozens of times a second and re-rendering the whole carousel that
   * often would stutter. The images are held at 1.04 so there is margin to
   * drift into — without it the edge of the frame would show as they move.
   */
  const stage = useRef<HTMLDivElement>(null);
  const drift = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = stage.current?.getBoundingClientRect();
    if (
      !box ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    stage.current!.style.setProperty("--drift-x", `${(-x * 14).toFixed(1)}px`);
    stage.current!.style.setProperty("--drift-y", `${(-y * 10).toFixed(1)}px`);
  };
  const settle = () => {
    stage.current?.style.setProperty("--drift-x", "0px");
    stage.current?.style.setProperty("--drift-y", "0px");
  };

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (still.matches || paused) return;

    // A tab nobody is looking at should not be cycling photographs.
    const tick = () => {
      if (!document.hidden) advance();
    };
    timer.current = window.setInterval(tick, DWELL_MS);
    return () => window.clearInterval(timer.current);
  }, [advance, paused]);

  return (
    <div
      ref={stage}
      className="hero-stage relative overflow-hidden"
      onPointerMove={drift}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        settle();
      }}
    >
      {/* The first slide sets the height; the rest are laid over it, so the
          section never jumps as the photographs change. */}
      {SLIDES.map((slide, i) => (
        <img
          key={slide.name}
          src={`/editorial/${slide.name}-1536.webp`}
          srcSet={`/editorial/${slide.name}-900.webp 900w, /editorial/${slide.name}-1536.webp 1536w`}
          sizes="100vw"
          alt={i === index ? slide.alt : ""}
          aria-hidden={i !== index}
          width={slide.width}
          height={slide.height}
          fetchPriority={i === 0 ? "high" : "low"}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          style={{ objectPosition: slide.position }}
          /* Sized by width, never by viewport height: with cover, a short wide
             window crops more, which is what cut the previous hero. */
          className={`hero-photo aspect-[5/4] w-full object-cover transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:mx-auto sm:aspect-[7/4] sm:max-w-[1600px] ${
            i === index ? "opacity-100" : "opacity-0"
          } ${i === 0 ? "" : "absolute inset-0 h-full"}`}
        />
      ))}

      {/* The photograph is the advertisement, so it should also be the way in:
          whichever range is on screen, the picture leads to it. It sits under
          the controls and under the type block, both of which have their own
          links, so nothing is nested inside anything else. */}
      {range && (
        <Link
          to={`/categories/${range.slug}`}
          aria-label={`See the ${range.name}`}
          className="absolute inset-0 z-[1]"
        />
      )}

      {/* One arrow to each side, at the mid-height of the frame. The block of
          calls to action is set in far enough to clear the back arrow — see the
          padding on it in Home — because at 640px and up the two share that
          left edge and the arrow was sitting on the first letter of "Explore
          Products". They keep a pale ground of their own, since the photographs
          behind them run from near-white marble to dark leather and a bare
          arrow would vanish into one or the other. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 sm:px-6">
        {[
          { step: -1, label: "Previous photograph", d: "M15 5l-7 7 7 7" },
          { step: 1, label: "Next photograph", d: "M9 5l7 7-7 7" },
        ].map(({ step, label, d }) => (
          <button
            key={label}
            type="button"
            onClick={() => go(step)}
            aria-label={label}
            className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-white/85 text-ink backdrop-blur-[2px] transition-colors duration-300 hover:bg-white sm:h-11 sm:w-11"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d={d}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 pb-16 sm:pb-7">
        <span className="pointer-events-none rounded-full bg-white/85 px-4 py-1.5 text-[0.625rem] uppercase tracking-[0.16em] text-ink backdrop-blur-[2px]">
          {range ? range.name : ""}
        </span>

        <div className="pointer-events-auto flex items-center gap-2.5 rounded-full bg-white/85 px-4 py-2.5 backdrop-blur-[2px]">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photograph ${i + 1} of ${SLIDES.length}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-6 bg-ink" : "w-1.5 bg-ink/30 hover:bg-ink/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
