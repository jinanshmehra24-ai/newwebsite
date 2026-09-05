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
    <div>
      {/* The photograph, and nothing else on it.
          It used to carry four floating panels — two arrow buttons, a range
          chip and a dot row, each on its own frosted white ground, because the
          pictures run from near-white marble to black leather and anything
          bare would vanish into one or the other. The answer was not a better
          veil: it was to stop putting controls on the photograph. They sit on
          the paper underneath now, where they have contrast for free and the
          picture is left to be a picture. */}
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
            /* Sized by width, never by viewport height: with cover, a short
               wide window crops more, which is what cut the previous hero. */
            className={`hero-photo aspect-[5/4] w-full object-cover transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:mx-auto sm:aspect-[7/4] sm:max-w-[1600px] ${
              i === index ? "opacity-100" : "opacity-0"
            } ${i === 0 ? "" : "absolute inset-0 h-full"}`}
          />
        ))}

        {/* The photograph is the advertisement, so it should also be the way
            in: whichever range is on screen, the picture leads to it. */}
        {range && (
          <Link
            to={`/categories/${range.slug}`}
            aria-label={`See the ${range.name}`}
            className="absolute inset-0 z-[1]"
          />
        )}
      </div>

      {/* The control rail. A hairline, the range currently shown, the dots and
          the two arrows — all in ink on paper, no chrome anywhere. */}
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex items-center justify-between gap-6 border-b border-line py-4">
          <div className="flex min-w-0 items-center gap-5">
            {range && (
              <Link
                to={`/categories/${range.slug}`}
                className="truncate py-2 text-[0.6875rem] uppercase tracking-[0.16em] text-muted transition-colors duration-300 hover:text-ink"
              >
                {range.name}
              </Link>
            )}

            <div className="flex items-center gap-2">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show photograph ${i + 1} of ${SLIDES.length}`}
                  aria-current={i === index}
                  /* The mark is a hairline; the button is not. Without the
                     padding the target would be one pixel tall, which is a
                     thing to look at rather than a thing to press. */
                  className="group/dot flex h-9 min-w-6 items-center justify-center px-1"
                >
                  <span
                    aria-hidden
                    className={`block h-px transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      i === index
                        ? "w-9 bg-ink"
                        : "w-4 bg-line group-hover/dot:bg-muted"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            {[
              { step: -1, label: "Previous photograph", d: "M15 5l-7 7 7 7" },
              { step: 1, label: "Next photograph", d: "M9 5l7 7-7 7" },
            ].map(({ step, label, d }) => (
              <button
                key={label}
                type="button"
                onClick={() => go(step)}
                aria-label={label}
                className="grid h-9 w-9 place-items-center text-muted transition-colors duration-300 hover:text-ink"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d={d}
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
