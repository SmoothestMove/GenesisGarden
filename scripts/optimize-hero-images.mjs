import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

const IMAGES_DIR = 'public/images';
const WIDTHS = [640, 960, 1280, 1920, 2560];

const heroFiles = [
  'Couple_Hero.jpg',
  'Couple_Hero2.jpg',
  'Couple_Hero_3.jpg',
  'Elderly_Man_Hero.jpg',
  'Family_Hero_2.jpg'
];

for (const file of heroFiles) {
  const inputPath = path.join(IMAGES_DIR, file);
  const baseName = path.parse(file).name;
  const webpMainPath = path.join(IMAGES_DIR, `${baseName}.webp`);

  console.log(`Processing ${file}...`);
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  // Create full-size WebP
  await sharp(inputPath).webp({ quality: 80 }).toFile(webpMainPath);
  const mainSize = (fs.statSync(webpMainPath).size / 1024).toFixed(0);
  console.log(`  Created ${baseName}.webp (${mainSize} KB)`);

  // Create responsive widths
  for (const width of WIDTHS) {
    if (width >= metadata.width) continue;
    const outPath = path.join(IMAGES_DIR, `${baseName}-${width}w.webp`);
    await sharp(inputPath).resize({ width }).webp({ quality: 78 }).toFile(outPath);
    const size = (fs.statSync(outPath).size / 1024).toFixed(0);
    console.log(`  Created ${path.basename(outPath)} (${size} KB)`);
  }
}

console.log('All hero images optimized to WebP successfully!');
