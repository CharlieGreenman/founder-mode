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
        @page {
          margin: 2.54cm; /* 1 inch margin on all sides */
        }
        body {
          font-family: 'Times New Roman', serif;
          font-size: 12pt;
          line-height: 1.5;
          max-width: 6.5in; /* Standard book width */
          margin: 0 auto;
        }
        h1 {
          page-break-before: always;
          font-size: 18pt;
          margin-top: 2em;
          margin-bottom: 1em;
        }
        h1:first-of-type { page-break-before: avoid; }
        p { text-indent: 0.25in; }
      </style>
    </head>
    <body>${html}</body>
    </html>
  `);

  // Use Puppeteer to convert HTML to PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: 'book.pdf',
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="font-size: 10pt; text-align: center; width: 100%;"><span class="pageNumber"></span></div>',
    margin: {
      top: '1in',
      right: '1in',
      bottom: '1in',
      left: '1in'
    }
  });
  await browser.close();

  // Clean up temporary HTML file
  fs.unlinkSync(tempHtmlPath);

  console.log('PDF generated successfully: book.pdf');
}

convertMarkdownToPDF().catch(console.error);
