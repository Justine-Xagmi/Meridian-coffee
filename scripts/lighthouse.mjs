// Simple Lighthouse runner for local performance testing.
//
// Usage:
//   npm run build && npm run start   (in one terminal, serves the production build)
//   npm run lighthouse               (in another terminal)
//
// Writes an HTML report to ./reports/lighthouse-<route>.html for each route
// and prints Performance / Accessibility / Best Practices / SEO scores plus
// Core Web Vitals (LCP, CLS, TBT as an INP proxy in lab conditions) to the console.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.LIGHTHOUSE_BASE_URL ?? 'http://localhost:3000';
const ROUTES = ['/', '/products', '/category/kettles', '/products/cascade-gooseneck-kettle', '/cart'];

async function runForRoute(route) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new'] });
  const options = { logLevel: 'error', output: 'html', port: chrome.port };
  const url = `${BASE_URL}${route}`;

  try {
    const runnerResult = await lighthouse(url, options);
    const reportDir = path.join(__dirname, '..', 'reports');
    fs.mkdirSync(reportDir, { recursive: true });
    const fileName = `lighthouse-${route === '/' ? 'home' : route.replace(/\//g, '_')}.html`;
    fs.writeFileSync(path.join(reportDir, fileName), runnerResult.report);

    const { categories, audits } = runnerResult.lhr;
    console.log(`\n${url}`);
    console.log(`  Performance:     ${Math.round(categories.performance.score * 100)}`);
    console.log(`  Accessibility:   ${Math.round(categories.accessibility.score * 100)}`);
    console.log(`  Best Practices:  ${Math.round(categories['best-practices'].score * 100)}`);
    console.log(`  SEO:             ${Math.round(categories.seo.score * 100)}`);
    console.log(`  LCP: ${audits['largest-contentful-paint'].displayValue}`);
    console.log(`  CLS: ${audits['cumulative-layout-shift'].displayValue}`);
    console.log(`  TBT: ${audits['total-blocking-time'].displayValue} (lab proxy for INP)`);
    console.log(`  Report saved: reports/${fileName}`);
  } finally {
    await chrome.kill();
  }
}

for (const route of ROUTES) {
  // eslint-disable-next-line no-await-in-loop
  await runForRoute(route);
}
