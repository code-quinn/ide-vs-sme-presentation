const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Create PDF
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 40, right: 40 },
  info: {
    Title: 'IDE vs SME Framework - One Pager',
    Author: 'WorldClass',
    Subject: 'Innovation Driven Environment vs Small/Medium Enterprise',
  }
});

const outputPath = path.join(__dirname, '..', 'public', 'ide-vs-sme-one-pager.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// Colors
const purple = '#8B5CF6';
const pink = '#EC4899';
const cyan = '#06B6D4';
const blue = '#3B82F6';
const dark = '#1a1a2e';
const gray = '#6B7280';

// Header with gradient-like effect
doc.rect(0, 0, 595, 120).fill(dark);
doc.rect(0, 115, 595, 5).fill(purple);

// Title
doc.fontSize(32)
   .font('Helvetica-Bold')
   .fillColor('white')
   .text('IDE vs SME', 40, 35);

doc.fontSize(14)
   .font('Helvetica')
   .fillColor('#9CA3AF')
   .text('Innovation Driven Environment vs Small/Medium Enterprise', 40, 75);

doc.fontSize(10)
   .fillColor('#6B7280')
   .text('Admiralty University of Nigeria Excursion 2026 | WorldClass', 40, 95);

// Main content area
let y = 140;

// Two-column comparison
doc.fontSize(16)
   .font('Helvetica-Bold')
   .fillColor(purple)
   .text('🚀 IDE', 40, y);

doc.fillColor(blue)
   .text('🏢 SME', 310, y);

y += 30;

// IDE characteristics
const idePoints = [
  'Innovation-first mindset',
  'Exponential growth (10x)',
  'Fail fast, learn faster',
  'Autonomous teams',
  'AI-powered workflows',
  'Ship daily, iterate constantly'
];

const smePoints = [
  'Stability-first approach',
  'Linear growth (10%)',
  'Risk minimization',
  'Hierarchical structure',
  'Traditional processes',
  'Careful, planned releases'
];

doc.fontSize(10).font('Helvetica');

idePoints.forEach((point, i) => {
  doc.fillColor(dark)
     .text(`✓ ${point}`, 50, y + i * 18, { width: 220 });
});

smePoints.forEach((point, i) => {
  doc.fillColor(dark)
     .text(`• ${point}`, 320, y + i * 18, { width: 220 });
});

y += 130;

// Comparison Table Header
doc.rect(40, y, 515, 25).fill(dark);
doc.fontSize(10)
   .font('Helvetica-Bold')
   .fillColor('white')
   .text('Metric', 50, y + 7)
   .text('IDE Approach', 200, y + 7)
   .text('SME Approach', 400, y + 7);

y += 25;

// Table rows
const tableData = [
  ['Primary Goal', 'Disrupt & Create Markets', 'Capture Market Share'],
  ['Growth Model', 'Exponential (10x thinking)', 'Linear (10% improvements)'],
  ['Risk Tolerance', 'High - Fail fast, learn faster', 'Low - Calculated moves'],
  ['Decision Speed', 'Hours', 'Weeks/Months'],
  ['Team Structure', 'Autonomous squads', 'Departmental silos'],
  ['Failure View', 'Data points for learning', 'Costs to minimize'],
];

tableData.forEach((row, i) => {
  const bgColor = i % 2 === 0 ? '#F9FAFB' : 'white';
  doc.rect(40, y, 515, 22).fill(bgColor);
  
  doc.fontSize(9)
     .font('Helvetica')
     .fillColor(dark)
     .text(row[0], 50, y + 6, { width: 140 });
  
  doc.fillColor(purple)
     .text(row[1], 200, y + 6, { width: 180 });
  
  doc.fillColor(blue)
     .text(row[2], 400, y + 6, { width: 150 });
  
  y += 22;
});

y += 20;

// Key Insight Box
doc.roundedRect(40, y, 515, 60, 8).fill('#FEF3C7');
doc.fontSize(11)
   .font('Helvetica-Bold')
   .fillColor('#92400E')
   .text('💡 Key Insight', 55, y + 12);

doc.fontSize(10)
   .font('Helvetica')
   .fillColor('#78350F')
   .text('IDEs embrace failure as learning fuel. Each crash is data. Each iteration brings you closer to product-market fit. SMEs optimize for zero failures, which can mean zero breakthroughs.', 55, y + 30, { width: 485 });

y += 80;

// WorldClass Portfolio Section
doc.fontSize(14)
   .font('Helvetica-Bold')
   .fillColor(dark)
   .text('WorldClass Portfolio', 40, y);

y += 25;

const ventures = [
  { name: 'Vent.Africa', desc: 'Crypto-to-cash platform revolutionizing African finance', color: purple },
  { name: 'Quinn AI', desc: '24/7 AI assistant powering innovation workflows', color: pink },
  { name: 'AI Dev Platform', desc: 'Tools that build tools - meta-innovation', color: cyan },
];

ventures.forEach((v, i) => {
  doc.roundedRect(40 + i * 175, y, 165, 50, 5)
     .fillAndStroke('#F9FAFB', v.color);
  
  doc.fontSize(11)
     .font('Helvetica-Bold')
     .fillColor(v.color)
     .text(v.name, 50 + i * 175, y + 10, { width: 145 });
  
  doc.fontSize(8)
     .font('Helvetica')
     .fillColor(gray)
     .text(v.desc, 50 + i * 175, y + 26, { width: 145 });
});

y += 70;

// Links section
doc.fontSize(12)
   .font('Helvetica-Bold')
   .fillColor(dark)
   .text('Connect & Learn More', 40, y);

y += 20;

doc.fontSize(10)
   .font('Helvetica')
   .fillColor(blue);

doc.text('🌐 chuksabanum.com', 50, y);
doc.text('🐦 x.com/beyondkodes', 200, y);
doc.text('📧 ceo@vent.africa', 380, y);

y += 20;
doc.text('🚀 vent.africa', 50, y);
doc.text('🎯 This presentation: code-quinn.github.io/ide-vs-sme-presentation', 200, y, { width: 350 });

// Footer
doc.rect(0, 800, 595, 42).fill(dark);
doc.fontSize(9)
   .font('Helvetica')
   .fillColor('#9CA3AF')
   .text('Built with ❤️ by WorldClass & Quinn AI at 2am | Admiralty University of Nigeria Excursion 2026', 40, 815, { align: 'center', width: 515 });

// Finalize
doc.end();

console.log('PDF generated:', outputPath);
