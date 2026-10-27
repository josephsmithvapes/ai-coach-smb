// Perfect-score gate: every page in the sitemap must score 100 in Performance, Accessibility,
// Best Practices and SEO (Lighthouse mobile — the same engine as PageSpeed Insights).
// Runs before every `npm run deploy`; a page below 100 stops the publish.
//
//   npm run check            test the freshly built site locally (dist/)
//   npm run check -- --live  test the live site at www.aii.coach
//
// Each page gets up to 3 runs, because a single run can dip a point from machine noise; the best run counts.
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const live = process.argv.includes('--live');
const PORT = 4321;
const base = live ? 'https://www.aii.coach' : `http://localhost:${PORT}`;
const CATS = ['performance', 'accessibility', 'best-practices', 'seo'];

const sitemap = fs.readFileSync(path.join(root, live ? 'public/sitemap.xml' : 'dist/sitemap.xml'), 'utf8');
const pages = [...sitemap.matchAll(/<loc>https:\/\/www\.aii\.coach([^<]*)<\/loc>/g)].map((m) => m[1] || '/');

function lighthouse(url) {
  const out = path.join(os.tmpdir(), `lh-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
  try {
    execFileSync('npx', ['-y', 'lighthouse@12', url, '--quiet', '--output=json', `--output-path=${out}`,
      '--only-categories=' + CATS.join(','), '--chrome-flags=--headless=new --no-sandbox'], { stdio: 'ignore', timeout: 180_000 });
    const r = JSON.parse(fs.readFileSync(out, 'utf8'));
    const scores = Object.fromEntries(CATS.map((c) => [c, Math.round((r.categories[c]?.score ?? 0) * 100)]));
    const failing = Object.values(r.audits)
      .filter((a) => a.score !== null && a.score < 0.9 && ['binary', 'numeric', 'metricSavings'].includes(a.scoreDisplayMode))
      .map((a) => a.title).slice(0, 6);
    return { scores, failing };
  } finally { fs.rmSync(out, { force: true }); }
}

let server;
if (!live) {
  server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { cwd: root, stdio: 'ignore' });
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(base + '/'); if (r.ok) break; } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
}

let ok = true;
console.log(`Checking ${pages.length} pages on ${base} (mobile, needs 100 in all four)…`);
try {
  for (const p of pages) {
    let best = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      const r = lighthouse(base + p);
      if (!best || Math.min(...Object.values(r.scores)) > Math.min(...Object.values(best.scores))) best = r;
      if (CATS.every((c) => r.scores[c] === 100)) break;
    }
    const perfect = CATS.every((c) => best.scores[c] === 100);
    ok &&= perfect;
    console.log(`${perfect ? '✓' : '✗'} ${p.padEnd(40)} ${CATS.map((c) => `${c.split('-')[0].slice(0, 4)} ${best.scores[c]}`).join('  ')}`);
    if (!perfect) for (const f of best.failing) console.log(`     – ${f}`);
  }
} finally {
  server?.kill();
}

if (!ok) {
  console.error('\nNot published: every page must score 100 in all four categories. Fix the items above and run again.');
  process.exit(1);
}
console.log('\nAll pages score 100.');
