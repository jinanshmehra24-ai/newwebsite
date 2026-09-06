import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig, whatsappLink } from "../config/site";

const MARK = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.19-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
  </svg>
);

const HELLO = `Hello ${siteConfig.name}, I have a corporate gifting requirement I would like to discuss.`;
const ASK_MORE = `Hello ${siteConfig.name}, I could not find what I am looking for on the site. Could you send photographs of what else you have?`;

/* Twice a visit, and no more. A note that says the same thing a third time is
   not a note any more, it is a pop-up. */
const CAP = 2;
const FIRST_AT = 14000;
const AGAIN_AFTER = 85000;
const DWELL = 9000;

/* Held in the module as well as in sessionStorage: storage throws outright in
   a locked-down browser, and the cap has to hold there too. */
let shownThisLoad = 0;

const readShown = () => {
  try {
    return Math.max(shownThisLoad, Number(sessionStorage.getItem("wa-note") || 0));
  } catch {
    return shownThisLoad;
  }
};

const recordShown = (n: number) => {
  shownThisLoad = n;
  try {
    sessionStorage.setItem("wa-note", String(n));
  } catch {
    /* private window, or site data blocked — the module counter still holds */
  }
};

/**
 * The WhatsApp button, and the small note that comes out of it.
 *
 * The catalogue on this site is a part of what the business actually stocks,
 * and a visitor has no way of knowing that from looking at a grid. Rather than
 * say so in a banner nobody reads, the note slides out of the WhatsApp button
 * itself, twice a visit, and puts the offer where the reply would go anyway.
 *
 * It is deliberately easy to be rid of: it leaves on its own after nine
 * seconds, it has a close button, and closing it ends it for the session. It
 * never covers the button it came from.
 */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [note, setNote] = useState(false);
  const timers = useRef<number[]>([]);

  /*
   * The button used to wait for 600px of scrolling before appearing, which
   * meant it was missing from every short page — the quote form, the contact
   * page, a category with four products, the 404. A way to reach someone is
   * not a reward for scrolling.
   */
  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = useCallback((forGood: boolean) => {
    setNote(false);
    if (forGood) recordShown(CAP);
  }, []);

  useEffect(() => {
    /* No early return for prefers-reduced-motion. That setting asks for less
       movement, not less information, and withholding the note entirely would
       keep a whole message from the people who set it. The site-wide
       reduced-motion rule already collapses every transition to nothing, so
       there the note simply appears and disappears without the travel. */

    const schedule = (delay: number) => {
      const t = window.setTimeout(() => {
        if (readShown() >= CAP) return;
        recordShown(readShown() + 1);
        setNote(true);
        timers.current.push(
          window.setTimeout(() => {
            setNote(false);
            if (readShown() < CAP) schedule(AGAIN_AFTER);
          }, DWELL),
        );
      }, delay);
      timers.current.push(t);
    };

    schedule(FIRST_AT);
    const list = timers.current;
    return () => list.forEach(window.clearTimeout);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {/* Grows out of the button below it — the transform origin sits at the
          bottom right corner, so it reads as coming from the button rather
          than appearing beside it. */}
      <div
        role="status"
        aria-live="polite"
        className={`relative max-w-[17rem] origin-bottom-right rounded-2xl rounded-br-md bg-deep p-4 pr-9 text-left shadow-xl shadow-ink/25 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          note && visible
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-90 opacity-0"
        }`}
      >
        <a
          href={whatsappLink(ASK_MORE)}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          tabIndex={note ? 0 : -1}
        >
          <p className="text-[0.8125rem] leading-[1.6] text-white">
            What is on the site is a part of what we hold, not all of it.
          </p>
          <p className="mt-2 text-[0.8125rem] leading-[1.6] text-dim">
            Tell us what you are looking for and we will send photographs of it.
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-whatsapp">
            Ask on WhatsApp
          </span>
        </a>

        <button
          type="button"
          onClick={() => dismiss(true)}
          aria-label="Dismiss this message"
          tabIndex={note ? 0 : -1}
          className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full text-dim transition-colors hover:text-white"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <a
        href={whatsappLink(HELLO)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Chandra & Co. on WhatsApp"
        className={`flex items-center gap-2.5 rounded-full bg-whatsapp px-4 py-3 text-deep shadow-lg shadow-ink/15 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-whatsapp-dark ${
          visible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {MARK}
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em]">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
