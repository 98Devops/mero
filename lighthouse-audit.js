const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const pages = [
  { name: 'Home', url: 'http://localhost:3000/' },
  { name: 'What We Do', url: 'http://localhost:3000/what-we-do' },
  { name: 'Services', url: 'http://localhost:3000/services' },
  { name: 'Portfolio', url: 'http://localhost:3000/portfolio' },
  { name: 'Contact', url: 'http://localhost:3000/contact' }
];

const resultsDir = 'lighthouse-results';
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir);
}

console.log('Starting Lighthouse audits...\n');

const results = [];

pages.forEach((page, index) => {
  console.log(`[${index + 1}/${pages.length}] Auditing ${page.name}...`);
  
  const outputPath = path.join(resultsDir, `${page.name.toLowerCase().replace(/\s+/g, '-')}.json`);
  
  try {
    execSync(
      `lighthouse "${page.url}" --output=json --output-path="${outputPath}" --chrome-flags="--headless" --quiet`,
      { stdio: 'inherit' }
    );
    
    const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    
    const scores = {
      performance: Math.round(report.categories.performance.score * 100),
      accessibility: Math.round(report.categories.accessibility.score * 100),
      bestPractices: Math.round(report.categories['best-practices'].score * 100),
      seo: Math.round(report.categories.seo.score * 100)
    };
    
    const metrics = {
      fcp: report.audits['first-contentful-paint'].numericValue,
      lcp: report.audits['largest-contentful-paint'].numericValue,
      tbt: report.audits['total-blocking-time'].numericValue,
      cls: report.audits['cumulative-layout-shift'].numericValue,
      si: report.audits['speed-index'].numericValue
    };
    
    results.push({
      page: page.name,
      url: page.url,
      scores,
      metrics
    });
    
    console.log(`  ✓ Performance: ${scores.performance}`);
    console.log(`  ✓ LCP: ${(metrics.lcp / 1000).toFixed(2)}s`);
    console.log(`  ✓ CLS: ${metrics.cls.toFixed(3)}\n`);
    
  } catch (error) {
    console.error(`  ✗ Error auditing ${page.name}:`, error.message);
  }
});

// Generate summary report
console.log('\n=== LIGHTHOUSE AUDIT SUMMARY ===\n');

results.forEach(result => {
  console.log(`${result.page}:`);
  console.log(`  Performance Score: ${result.scores.performance}/100`);
  console.log(`  First Contentful Paint: ${(result.metrics.fcp / 1000).toFixed(2)}s`);
  console.log(`  Largest Contentful Paint: ${(result.metrics.lcp / 1000).toFixed(2)}s`);
  console.log(`  Total Blocking Time: ${result.metrics.tbt.toFixed(0)}ms`);
  console.log(`  Cumulative Layout Shift: ${result.metrics.cls.toFixed(3)}`);
  console.log(`  Speed Index: ${(result.metrics.si / 1000).toFixed(2)}s`);
  console.log('');
});

// Check if all pages meet requirements
const allPagesPass = results.every(r => 
  r.scores.performance >= 90 && 
  r.metrics.lcp <= 2000 &&
  r.metrics.cls <= 0.1
);

console.log('=== REQUIREMENTS CHECK ===\n');
console.log(`Performance Score ≥ 90: ${results.every(r => r.scores.performance >= 90) ? '✓ PASS' : '✗ FAIL'}`);
console.log(`LCP < 2 seconds: ${results.every(r => r.metrics.lcp <= 2000) ? '✓ PASS' : '✗ FAIL'}`);
console.log(`CLS < 0.1: ${results.every(r => r.metrics.cls <= 0.1) ? '✓ PASS' : '✗ FAIL'}`);
console.log(`\nOverall: ${allPagesPass ? '✓ ALL REQUIREMENTS MET' : '✗ SOME REQUIREMENTS NOT MET'}`);

// Save summary
fs.writeFileSync(
  path.join(resultsDir, 'summary.json'),
  JSON.stringify({ results, allPagesPass }, null, 2)
);

process.exit(allPagesPass ? 0 : 1);
