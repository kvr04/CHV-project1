import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');

// Recursively find all PNG files
function findPngFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findPngFiles(filePath, fileList);
    } else if (filePath.toLowerCase().endsWith('.png')) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

async function optimizeImages() {
  const pngFiles = findPngFiles(publicDir);
  console.log(`Found ${pngFiles.length} PNG files. Starting compression...`);

  let processed = 0;
  for (const filePath of pngFiles) {
    const webpPath = filePath.replace(/\.png$/i, '.webp');
    
    try {
      // For frames/sequences, we just convert. For large singular images, we can also resize down to 1920 max.
      await sharp(filePath)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 })
        .toFile(webpPath);
      
      // Delete original
      fs.unlinkSync(filePath);
      processed++;
      
      if (processed % 10 === 0 || processed === pngFiles.length) {
        console.log(`Processed ${processed}/${pngFiles.length} files...`);
      }
    } catch (err) {
      console.error(`Failed to process ${filePath}:`, err);
    }
  }
  
  console.log('Finished optimizing images!');
}

optimizeImages();
