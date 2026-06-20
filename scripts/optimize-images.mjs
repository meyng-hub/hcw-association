// Recompress oversized source photos in public/images (top level only — the
// drive/ archive is gitignored and bound for Sanity). Caps dimensions and
// re-encodes in place, preserving filename + format so no references change.
//
//   node scripts/optimize-images.mjs           # optimize
//   node scripts/optimize-images.mjs --dry      # report only
//
// next/image still optimizes at request time on Vercel; this just keeps the
// repo lean and deploy uploads fast.

import { readdir, stat, rename } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const DIR = "public/images";
const MAX_WIDTH = 2000; // plenty for full-bleed heroes at 1x/2x
const MIN_BYTES = 400 * 1024; // only touch files above ~400KB
const dry = process.argv.includes("--dry");

const entries = await readdir(DIR, { withFileTypes: true });
let before = 0;
let after = 0;

for (const e of entries) {
  if (!e.isFile()) continue; // skip drive/ and other dirs
  const ext = extname(e.name).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const path = join(DIR, e.name);
  const { size } = await stat(path);
  if (size < MIN_BYTES) continue;
  before += size;

  if (dry) {
    console.log(
      `would optimize ${e.name} (${(size / 1024 / 1024).toFixed(1)}MB)`,
    );
    after += size;
    continue;
  }

  const img = sharp(path).rotate().resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });
  const out =
    ext === ".png"
      ? img.png({ compressionLevel: 9, quality: 82, effort: 8 })
      : img.jpeg({ quality: 78, mozjpeg: true });

  const tmp = `${path}.tmp`;
  await out.toFile(tmp);
  await rename(tmp, path);
  const { size: newSize } = await stat(path);
  after += newSize;
  console.log(
    `${e.name}: ${(size / 1024 / 1024).toFixed(1)}MB -> ${(newSize / 1024 / 1024).toFixed(1)}MB`,
  );
}

console.log(
  `\nTotal: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB`,
);
