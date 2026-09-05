/**
 * Client-side guards against the two things that actually fill an enquiry
 * inbox: bots posting the form, and a real visitor sending the same enquiry
 * several times because they were not sure it went through.
 *
 * None of this can stop a determined attacker — anything running in the browser
 * can be bypassed. It stops naive bots and accidental duplicates, which is what
 * a quote form realistically faces. The honeypot below is the strongest part.
 */

const KEY = "cc-enquiry-log";
const MIN_GAP_MS = 60_000; // one enquiry a minute
const WINDOW_MS = 60 * 60_000; // at most a handful an hour
const MAX_IN_WINDOW = 5;
/** A person cannot read and fill seven fields this fast; a script can. */
export const MIN_FILL_MS = 4_000;

type Entry = { at: number; sig: string };

function read(): Entry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is Entry =>
        typeof e === "object" && e !== null &&
        typeof (e as Entry).at === "number" && typeof (e as Entry).sig === "string",
    );
  } catch {
    return []; // private mode, cleared storage, corrupt value — treat as first visit
  }
}

function write(entries: Entry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries.slice(-MAX_IN_WINDOW * 2)));
  } catch {
    /* storage unavailable — the guard simply does not persist */
  }
}

/** Small stable signature of an enquiry, so an identical resend is recognised. */
export function signature(v: Record<string, string>): string {
  const s = Object.keys(v)
    .sort()
    .map((k) => `${k}=${(v[k] ?? "").trim().toLowerCase()}`)
    .join("|");
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return String(h);
}

export type GuardVerdict = { ok: true } | { ok: false; reason: string };

export function checkRate(sig: string, now = Date.now()): GuardVerdict {
  const recent = read().filter((e) => now - e.at < WINDOW_MS);

  if (recent.some((e) => e.sig === sig)) {
    return {
      ok: false,
      reason:
        "We have already received this enquiry — our team will be in touch shortly.",
    };
  }
  const last = recent[recent.length - 1];
  if (last && now - last.at < MIN_GAP_MS) {
    const wait = Math.ceil((MIN_GAP_MS - (now - last.at)) / 1000);
    return {
      ok: false,
      reason: `Your previous enquiry has just been sent. Please wait ${wait} seconds before sending another.`,
    };
  }
  if (recent.length >= MAX_IN_WINDOW) {
    return {
      ok: false,
      reason:
        "That is several enquiries in a short time. Please call or message us on WhatsApp instead.",
    };
  }
  return { ok: true };
}

export function recordSent(sig: string, now = Date.now()) {
  const recent = read().filter((e) => now - e.at < WINDOW_MS);
  write([...recent, { at: now, sig }]);
}
