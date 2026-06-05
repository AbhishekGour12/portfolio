const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

const imagesToConvert = [
  { name: 'about.png', target: 200, quality: 80 },
  { name: 'saas.png', target: 120, quality: 80 },
  { name: 'e-learning.png', target: 120, quality: 80 },
  { name: 'e-commerce.png', target: 120, quality: 80 },
  { name: 'foodwebsite.png', target: 100, quality: 80 },
  { name: 'buynest.png', target: 80, quality: 80 },
  { name: 'homeease.png', target: 80, quality: 80 },
  { name: 'ssttrader.png', target: 50, quality: 80 },
  { name: 'urbantandoor.png', target: 50, quality: 80 },
  { name: 'byteforge.png', target: 40, quality: 80 },
  { name: 'urbanproperty.png', target: 30, quality: 80 },
  { name: 'smilecare.png', target: 30, quality: 80 },
  { name: 'feastify.png', target: 30, quality: 80 },
];

async function convert() {
  for (const img of imagesToConvert) {
    const inputPath = path.join(publicDir, img.name);
    const outputPath = path.join(publicDir, img.name.replace('.png', '.webp'));

    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found: ${img.name}`);
      continue;
    }

    const originalSizeKb = fs.statSync(inputPath).size / 1024;
    console.log(`Optimizing ${img.name} (${originalSizeKb.toFixed(1)} KB)...`);

    try {
      await sharp(inputPath)
        .webp({ quality: img.quality })
        .toFile(outputPath);

      const optimizedSizeKb = fs.statSync(outputPath).size / 1024;
      console.log(`-> Saved as ${path.basename(outputPath)}: ${optimizedSizeKb.toFixed(1)} KB (Target: <${img.target} KB)`);
    } catch (err) {
      console.error(`Error optimizing ${img.name}:`, err);
    }
  }
}

convert();
