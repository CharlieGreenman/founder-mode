import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function createVideoWithAudio() {
  const audioPath = path.join(__dirname, 'founder-mode-audio-book.mp3');
  const imagePath = path.join(__dirname, 'founder-mode.png');
  const outputPath = path.join(__dirname, 'founder-mode-video.mp4');

  try {
    // Use FFmpeg to combine audio and image into a video
    await execAsync(`ffmpeg -loop 1 -i "${imagePath}" -i "${audioPath}" -c:v libx264 -tune stillimage -c:a aac -b:a 192k -pix_fmt yuv420p -shortest "${outputPath}"`);
    console.log('Video created successfully:', outputPath);
  } catch (error) {
    console.error('Error creating video:', error);
  }
}

createVideoWithAudio().catch(console.error);
