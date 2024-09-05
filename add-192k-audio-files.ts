import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function convertTo192kbps() {
  const srcDir = path.join(__dirname, 'src');
  const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.mp3'));

  for (const file of files) {
    const inputPath = path.join(srcDir, file);
    const outputPath = path.join(srcDir, `192k-${file}`);
    await execAsync(`ffmpeg -i "${inputPath}" -b:a 192k "${outputPath}"`);

    try {
      await execAsync(`ffmpeg -i "${inputPath}" -b:a 192k "${outputPath}"`);
      console.log(`Successfully converted ${file} to 192kbps`);
    } catch (error) {
      console.error(`Error converting ${file}:`, error);
    }
  }
}

convertTo192kbps().catch(console.error);
