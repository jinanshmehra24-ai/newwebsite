/**
 * Renders the app icons from public/logo-mark.svg.
 *
 * The mark is gold on transparent and wider than it is tall, so every icon
 * here centres it on the deep indigo the dark sections use — a transparent
 * icon shows as a black square on some Android launchers, and the gold needs
 * a ground to read against anyway.
 *
 * Run with `npm run icons` after changing the logo. Nothing calls it during a
 * build; the PNGs are committed.
 */
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "public/logo-mark.svg"));
const GROUND = { r: 0x1e, g: 0x1b, b: 0x2e, alpha: 1 };

/** `fraction` is how much of the square the mark may occupy. */
async function icon(name, size, fraction) {
  // Rendered at the target width first so the vector is rasterised sharp
  // rather than scaled up from a smaller bitmap.
  const markWidth = Math.round(size * fraction);
  const mark = await sharp(svg, { density: 384 })
    .resize({ width: markWidth })
    .png()
    .toBuffer();

  const { height } = await sharp(mark).metadata();
  await sharp({
    create: { width: size, height: size, channels: 4, background: GROUND },
  })
    .composite([{ input: mark, top: Math.round((size - height) / 2), left: Math.round((size - markWidth) / 2) }])
    .png()
    .toFile(join(root, "public", name));

  console.log(`${name}  ${size}x${size}  mark ${markWidth}px`);
}

// 192 and 512 are what a manifest needs; the maskable one keeps the mark well
// inside the 80% safe circle Android crops to; 180 is what iOS asks for.
await icon("icon-192.png", 192, 0.72);
await icon("icon-512.png", 512, 0.72);
await icon("icon-maskable-512.png", 512, 0.52);
await icon("apple-touch-icon.png", 180, 0.7);
