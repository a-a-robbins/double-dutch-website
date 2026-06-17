import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { join, extname, parse } from 'path';

const srcDir = 'src/assets/DoubleDutch-Images';
const outDir = 'src/assets/DoubleDutch-Images';
const maxWidth = 1920;
const quality = 85;

const usedImages = [
  'team-bars-cropped.png',
  '4I6A3005.jpg',
  'toddler-bar.jpg',
  'recreational.jpg',
  '4I6A2769.jpg',
  'kid-handstand.jpg',
  'attie-profile.jpg',
  'gena-profile.jpeg',
  'gib-profile.jpeg',
  'ruth-profile.jpeg',
];

async function compressImage(inputPath, outputPath) {
  const ext = extname(inputPath).toLowerCase();
  const isPng = ext === '.png';

  try {
    const pipeline = sharp(inputPath).resize({ width: maxWidth, withoutEnlargement: true });
    await pipeline.webp({ quality }).toFile(outputPath);
    const result = await sharp(inputPath).metadata();
    const resultWebp = await sharp(outputPath).metadata();
    console.log(`✓ ${parse(inputPath).base} → ${parse(outputPath).base}.webp  (${(result.size / 1024 / 1024).toFixed(1)}MB → ${(resultWebp.size / 1024 / 1024).toFixed(1)}MB)`);
  } catch (err) {
    console.error(`✗ ${inputPath}: ${err.message}`);
  }
}

async function main() {
  console.log('Compressing used images...\n');
  for (const file of usedImages) {
    const inputPath = join(srcDir, file);
    const outName = parse(file).name + '.webp';
    const outputPath = join(outDir, outName);
    await compressImage(inputPath, outputPath);
  }

  console.log('\nDone! Update your data service paths to use .webp files.');
}

main();
