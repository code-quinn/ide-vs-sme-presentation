import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  const htmlPath = path.join(__dirname, '..', 'public', 'one-pager.html');
  const outputPath = path.join(__dirname, '..', 'public', 'ide-vs-sme-one-pager.pdf');

  console.log('🚀 Launching Chromium via @sparticuz/chromium...');
  
  // Get the chromium executable path
  const executablePath = await chromium.executablePath();
  console.log('   Executable:', executablePath);
  
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  
  // Set viewport for consistent rendering
  await page.setViewport({
    width: 794,
    height: 1123,
    deviceScaleFactor: 2
  });

  console.log('📄 Loading HTML...');
  console.log('   File:', htmlPath);
  
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');
  
  // Wait for rendering
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log('📑 Generating PDF with printBackground: true...');
  
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    }
  });

  await browser.close();
  
  console.log('✅ PDF generated successfully!');
  console.log('   Output:', outputPath);
}

generatePDF().catch(err => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
