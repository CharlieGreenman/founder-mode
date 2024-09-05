import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function convertAudioToAudioBook() {
  // Read all mp3 files in the src directory
  const srcDir = path.join(__dirname, 'src');
  const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.mp3'));

  // Sort files numerically by chapter number
  files.sort((a, b) => {
    const aNum = parseInt(a.split('-')[0]);
    const bNum = parseInt(b.split('-')[0]);
    return aNum - bNum;
  });

  // Create a temporary file list
  const tempListPath = path.join(__dirname, 'temp_file_list.txt');
  const fileList = files.map(file => `file '${path.join(srcDir, file)}'`).join('\n');
  fs.writeFileSync(tempListPath, fileList);

  // Use FFmpeg to concatenate audio files
  const outputPath = path.join(__dirname, 'audiobook.mp3');
  try {
    await execAsync(`ffmpeg -f concat -safe 0 -i ${tempListPath} -c copy ${outputPath}`);
    console.log('Audio book generated successfully: audiobook.mp3');
  } catch (error) {
    console.error('Error generating audio book:', error);
  } finally {
    // Clean up temporary file list
    fs.unlinkSync(tempListPath);
  }
}

convertAudioToAudioBook().catch(console.error);
