const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Load the HTML file
  const htmlPath = path.join(__dirname, '..', 'public', 'one-pager.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  
  // Generate PDF
  await page.pdf({
    path: path.join(__dirname, '..', 'public', 'ide-vs-sme-one-pager.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });
  
  await browser.close();
  console.log('PDF generated successfully!');
})();
