import { chromium } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
import fs from 'fs';
import path from 'path';

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

console.log('Starting Lighthouse audits with Playwright...\n');

const results = [];

async function runAudits() {
  const browser = await chromium.launch({
    args: ['--remote-debugging-port=9222']
  });

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    console.log(`[${i + 1}/${pages.length}] Auditing ${page.name}...`);

    try {
      const context = await browser.newContext();
      const browserPage = await context.newPage();
      await browserPage.goto(page.url);

      const audit = await playAudit({
        page: browserPage,
        port: 9222,
        thresholds: {
          performance: 90,
          accessibility: 80,
          'best-practices': 80,
          seo: 80
        },
        reports: {
          formats: {
            json: true
          },
          name: page.name.toLowerCase().replace(/\s+/g, '-'),
          directory: resultsDir
        }
      });

      const report = audit.lhr;

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
        si: report.audits['speed-index'].numericValue,
        tti: report.audits['interactive'].numericValue
      };

      results.push({
        page: page.name,
        url: page.url,
        scores,
        metrics
      });

      console.log(`  ✓ Performance: ${scores.performance}/100`);
      console.log(`  ✓ LCP: ${(metrics.lcp / 1000).toFixed(2)}s`);
      console.log(`  ✓ CLS: ${metrics.cls.toFixed(3)}`);
      console.log(`  ✓ TTI: ${(metrics.tti / 1000).toFixed(2)}s\n`);

      await context.close();
    } catch (error) {
      console.error(`  ✗ Error auditing ${page.name}:`, error.message);
    }
  }

  await browser.close();

  // Generate summary report
  console.log('\n=== LIGHTHOUSE AUDIT SUMMARY ===\n');

  results.forEach(result => {
    console.log(`${result.page}:`);
    console.log(`  Performance Score: ${result.scores.performance}/100`);
    console.log(`  First Contentful Paint: ${(result.metrics.fcp / 1000).toFixed(2)}s`);
    console.log(`  Largest Contentful Paint: ${(result.metrics.lcp / 1000).toFixed(2)}s`);
    console.log(`  Time to Interactive: ${(result.metrics.tti / 1000).toFixed(2)}s`);
    console.log(`  Total Blocking Time: ${result.metrics.tbt.toFixed(0)}ms`);
    console.log(`  Cumulative Layout Shift: ${result.metrics.cls.toFixed(3)}`);
    console.log(`  Speed Index: ${(result.metrics.si / 1000).toFixed(2)}s`);
    console.log('');
  });

  // Check if all pages meet requirements
  const performancePass = results.every(r => r.scores.performance >= 90);
  const lcpPass = results.every(r => r.metrics.lcp <= 2000);
  const clsPass = results.every(r => r.metrics.cls <= 0.1);
  const allPagesPass = performancePass && lcpPass && clsPass;

  console.log('=== REQUIREMENTS CHECK ===\n');
  console.log(`Requirement 6.1 - Performance Score ≥ 90: ${performancePass ? '✓ PASS' : '✗ FAIL'}`);
  
  results.forEach(r => {
    if (r.scores.performance < 90) {
      console.log(`  ✗ ${r.page}: ${r.scores.performance}/100`);
    } else {
      console.log(`  ✓ ${r.page}: ${r.scores.performance}/100`);
    }
  });
  
  console.log(`\nRequirement 6.2 - Load Time (LCP) < 2 seconds: ${lcpPass ? '✓ PASS' : '✗ FAIL'}`);
  
  results.forEach(r => {
    const lcpSeconds = (r.metrics.lcp / 1000).toFixed(2);
    if (r.metrics.lcp > 2000) {
      console.log(`  ✗ ${r.page}: ${lcpSeconds}s`);
    } else {
      console.log(`  ✓ ${r.page}: ${lcpSeconds}s`);
    }
  });
  
  console.log(`\nCore Web Vitals - CLS < 0.1: ${clsPass ? '✓ PASS' : '✗ FAIL'}`);
  
  results.forEach(r => {
    if (r.metrics.cls > 0.1) {
      console.log(`  ✗ ${r.page}: ${r.metrics.cls.toFixed(3)}`);
    } else {
      console.log(`  ✓ ${r.page}: ${r.metrics.cls.toFixed(3)}`);
    }
  });

  console.log(`\n=== OVERALL RESULT ===`);
  console.log(allPagesPass ? '✓ ALL REQUIREMENTS MET' : '✗ SOME REQUIREMENTS NOT MET');

  // Save summary
  fs.writeFileSync(
    path.join(resultsDir, 'summary.json'),
    JSON.stringify({ results, allPagesPass, checks: { performancePass, lcpPass, clsPass } }, null, 2)
  );

  process.exit(allPagesPass ? 0 : 1);
}

runAudits().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
