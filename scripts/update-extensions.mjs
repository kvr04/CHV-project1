import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findTsxFiles(filePath, fileList);
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

const files = findTsxFiles(srcDir);
for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.includes('.png')) {
    content = content.replace(/\.png/g, '.webp');
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
}
