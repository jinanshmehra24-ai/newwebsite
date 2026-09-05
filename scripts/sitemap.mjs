/**
 * Regenerate public/sitemap.xml from the catalogue data.
 *
 * The file was previously written by hand, and by the time anyone looked at it
 * again it listed twenty-five products that had been withdrawn, none of the
 * Prime range, and none of the guides — so Google was being pointed at dead
 * URLs and away from the new ones. Running it from the data on every build is
 * the only way it stays true.
 *
 * The source files are TypeScript, so rather than compile them this reads the
 * literal rows and slugs directly. That is fragile in principle, so it fails
 * loudly on an unexpected shape instead of quietly writing a short sitemap.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

const SITE = "https://www.chandraandco.in";
const today = new Date().toISOString().slice(0, 10);

/** Product rows look like: ["Name", "slug", "category", "sku", …] */
function products() {
  const src = read("src/data/products.ts");
  const rows = [...src.matchAll(/^\s*\["[^"]+", "([^"]+)", "([^"]+)-pens"/gm)];
  if (rows.length < 20) throw new Error(`products.ts: found only ${rows.length} rows`);
  return rows.map((m) => m[1]);
}

/** Only the ranges the site actually shows. */
function categories() {
  const src = read("src/data/categories.ts");
  const active = src.match(/const ACTIVE_CATEGORIES: CategorySlug\[\] = \[([\s\S]*?)\];/);
  if (!active) throw new Error("categories.ts: ACTIVE_CATEGORIES not found");
  return [...active[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
}

function guides() {
  const src = read("src/data/guides.ts");
  const rows = [...src.matchAll(/^\s*slug: "([^"]+)",$/gm)];
  if (rows.length === 0) throw new Error("guides.ts: no guide slugs found");
  return rows.map((m) => m[1]);
}

const urls = [
  ["/", "1.0"],
  ["/products", "0.9"],
  ["/categories", "0.9"],
  ["/guides", "0.8"],
  ["/contact", "0.8"],
  ["/quote", "0.8"],
  ["/about", "0.7"],
  ...categories().map((c) => [`/categories/${c}`, "0.8"]),
  ...guides().map((g) => [`/guides/${g}`, "0.7"]),
  ...products().map((p) => [`/products/${p}`, "0.7"]),
];

const seen = new Set();
for (const [loc] of urls) {
  if (seen.has(loc)) throw new Error(`duplicate url: ${loc}`);
  seen.add(loc);
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(
    ([loc, priority]) =>
      `  <url><loc>${SITE}${loc}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`,
  ),
  "</urlset>",
  "",
].join("\n");

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(`sitemap: ${urls.length} urls`);
