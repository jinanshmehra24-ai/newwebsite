import { useCallback } from "react";

/**
 * A photograph that fades up once it has actually decoded.
 *
 * The obvious way to do this — start hidden, reveal in an onLoad handler —
 * loses to the browser cache: a picture already in memory finishes loading
 * before React attaches the handler, the event never fires, and the card stays
 * blank. So the element is marked on the ref callback too, where `complete`
 * can be read directly, and the handler only catches the ones still in flight.
 */
export default function Photo({
  className = "",
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const mark = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) node.dataset.loaded = "true";
  }, []);

  return (
    <img
      ref={mark}
      onLoad={(e) => {
        e.currentTarget.dataset.loaded = "true";
      }}
      /* A picture that fails to load must not stay invisible — better a broken
         image than a hole where a product should be. */
      onError={(e) => {
        e.currentTarget.dataset.loaded = "true";
      }}
      className={`img-fade ${className}`}
      {...rest}
    />
  );
}
