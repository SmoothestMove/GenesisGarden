#!/usr/bin/env node
// Regenerates responsive WebP variants for a hero/background image.
// Usage: node scripts/generate-responsive-image.mjs <path-under-public> [widths...]
// Example: node scripts/generate-responsive-image.mjs public/images/Enhanced-Family_Hero.webp

import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

const DEFAULT_WIDTHS = [640, 960, 1280, 1920, 2560];

const [, , inputArg, ...widthArgs] = process.argv;

if (!inputArg) {
  console.error('Usage: node scripts/generate-responsive-image.mjs <path-under-public> [widths...]');
  process.exit(1);
}

const widths = widthArgs.length ? widthArgs.map(Number) : DEFAULT_WIDTHS;
const inputPath = path.resolve(inputArg);
const { dir, name } = path.parse(inputPath);

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const image = sharp(inputPath);
const metadata = await image.metadata();
console.log(`Source: ${metadata.width}x${metadata.height}, ${(fs.statSync(inputPath).size / 1024).toFixed(0)}KB`);

for (const width of widths.sort((a, b) => a - b)) {
  if (width >= metadata.width) continue;
  const outPath = path.join(dir, `${name}-${width}w.webp`);
  await sharp(inputPath).resize({ width }).webp({ quality: 78 }).toFile(outPath);
  const size = fs.statSync(outPath).size;
  console.log(`  ${path.basename(outPath)} -> ${(size / 1024).toFixed(0)}KB`);
}

console.log('Done. Re-run this script whenever the source image is replaced (e.g. via the CMS).');
