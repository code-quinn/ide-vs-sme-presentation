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
    args: [
      ...chromium.args,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--font-render-hinting=none'
    ],
    defaultViewport: null,
    executablePath: executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  
  // Set viewport for consistent rendering - A4 at 96 DPI with 2x scale
  await page.setViewport({
    width: 1200,
    height: 1697,
    deviceScaleFactor: 2
  });

  // CRITICAL: Emulate screen media type to keep gradients (not print!)
  await page.emulateMediaType('screen');
  console.log('🖥️  Media type set to SCREEN (keeps gradients)');

  console.log('📄 Loading HTML...');
  console.log('   File:', htmlPath);
  
  await page.goto(`file://${htmlPath}`, {
    waitUntil: ['networkidle0', 'domcontentloaded', 'load'],
    timeout: 60000
  });

  // Wait for fonts to load
  console.log('⏳ Waiting for fonts...');
  await page.evaluateHandle('document.fonts.ready');
  
  // Wait for QR codes to load from external service
  console.log('⏳ Waiting for images (QR codes)...');
  await page.evaluate(() => {
    return Promise.all(
      Array.from(document.images)
        .filter(img => !img.complete)
        .map(img => new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = resolve; // Don't fail on broken images
        }))
    );
  });
  
  // Extra wait for CSS animations and rendering
  console.log('⏳ Extra wait for rendering...');
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('📑 Generating PDF with full background support...');
  
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: false,
    scale: 0.75, // Scale down slightly to fit content nicely
    margin: {
      top: '10mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm'
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
