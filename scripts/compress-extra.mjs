import sharp from 'sharp';
import { join, parse } from 'path';

const rootAssets = 'src/assets';

const extraImages = [
  'logo.png',
  'summer-26-schedule.jpg',
  'winter-schedule.jpg',
];

async function compressImage(inputPath) {
  const outName = parse(inputPath).name + '.webp';
  const outputPath = join(parse(inputPath).dir, outName);
  try {
    const result = await sharp(inputPath).metadata();
    const pipeline = sharp(inputPath).resize({ width: 1920, withoutEnlargement: true });
    await pipeline.webp({ quality: 85 }).toFile(outputPath);
    const resultOut = await sharp(outputPath).metadata();
    console.log(`${parse(inputPath).base} → ${outName}  (${(result.size / 1024 / 1024).toFixed(1)}MB → ${(resultOut.size / 1024 / 1024).toFixed(1)}MB)`);
  } catch (err) {
    console.error(`✗ ${inputPath}: ${err.message}`);
  }
}

async function main() {
  for (const file of extraImages) {
    const inputPath = join(rootAssets, file);
    await compressImage(inputPath);
  }
}

main();
