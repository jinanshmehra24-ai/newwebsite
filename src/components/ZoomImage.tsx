import { useRef, useState } from "react";

/**
 * The product photograph, magnified under the pointer.
 *
 * A buyer's real question on this page is how their logo will sit on the piece
 * — how wide the branding panel is, how the finish takes a mark. At card size
 * none of that is visible, and asking them to squint is what a catalogue should
 * never do. Holding the pointer over the photograph enlarges it around that
 * point, so the detail is inspected where the question is asked.
 *
 * The magnifier is pointer-only. On a touch screen there is no hover to enter
 * or leave, so it would either never appear or never dismiss; there the picture
 * simply stays as it is.
 */
export default function ZoomImage({
  src,
  srcSet,
  alt,
  width,
  height,
  scale = 2.1,
}: {
  src: string;
  srcSet?: string;
  alt: string;
  width: number;
  height: number;
  /** How far in. Past about 2.5 the 1200px file starts to show its own pixels. */
  scale?: number;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState("50% 50%");
  const [zoomed, setZoomed] = useState(false);

  const canHover =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    const x = ((e.clientX - box.left) / box.width) * 100;
    const y = ((e.clientY - box.top) / box.height) * 100;
    setOrigin(
      `${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`,
    );
  };

  return (
    <div
      ref={frame}
      onPointerMove={canHover ? track : undefined}
      onPointerEnter={canHover ? () => setZoomed(true) : undefined}
      onPointerLeave={canHover ? () => setZoomed(false) : undefined}
      className="relative overflow-hidden border border-line bg-paper"
    >
      <img
        src={src}
        srcSet={srcSet}
        sizes="(max-width: 1024px) 92vw, 46vw"
        alt={alt}
        width={width}
        height={height}
        fetchPriority="high"
        decoding="async"
        style={{
          transformOrigin: origin,
          transform: zoomed ? `scale(${scale})` : "scale(1)",
        }}
        className="zoom-photo block h-auto w-full"
      />
    </div>
  );
}
