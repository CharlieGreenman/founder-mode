import fs from 'fs';
import path from 'path';
import { marked } from "marked";
import puppeteer from 'puppeteer';

async function convertMarkdownToPDF() {
  // Read all markdown files in the current directory
  const files = fs.readdirSync('.').filter(file => file.endsWith('.md'));

  // Sort files numerically by chapter number
  files.sort((a, b) => {
    const aNum = parseInt(a.split('-')[0]);
    const bNum = parseInt(b.split('-')[0]);
    return aNum - bNum;
  });

  // Combine all markdown content
  let combinedMarkdown = '';
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    combinedMarkdown += content + '\n\n';
  }

  // Convert markdown to HTML
  const html = marked(combinedMarkdown);

  // Create a temporary HTML file
  const tempHtmlPath = path.join(__dirname, 'temp.html');
  fs.writeFileSync(tempHtmlPath, `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        h1 { page-break-before: always; }
        h1:first-of-type { page-break-before: avoid; }
      </style>
    </head>
    <body>${html}</body>
    </html>
  `);

  // Use Puppeteer to convert HTML to PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'networkidle0' });
  await page.pdf({ path: 'book.pdf', format: 'A4' });
  await browser.close();

  // Clean up temporary HTML file
  fs.unlinkSync(tempHtmlPath);

  console.log('PDF generated successfully: book.pdf');
}

convertMarkdownToPDF().catch(console.error);
