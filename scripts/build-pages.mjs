// Generates the service pages, the FAQ page, the sitemap and the search-engine business details
// from content/site.mjs, reusing the home page's styles and logo so every page matches.
// Runs automatically before `npm run build` / `npm run dev`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, SERVICES, FAQ } from '../content/site.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p) => SITE.url + p;

// ---------- pieces taken from the home page ----------
const style = home.slice(home.indexOf('<style>') + 7, home.indexOf('</style>'));
const headerLogo = home.match(/<a class="brand"[\s\S]*?<\/a>/)[0].replace('href="#top"', 'href="/"');
const footer = home.match(/<footer class="footer">[\s\S]*?<\/footer>/)[0];

const extraStyle = `
      .crumbs { font-family: var(--mono); font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-3); padding-top: 28px; }
      .crumbs a { text-decoration: none; color: var(--ink-3); }
      .crumbs a:hover { color: var(--accent); }
      .page-hero { padding-top: 40px; padding-bottom: 56px; }
      .page-hero > *, .faq > * { max-width: 900px; }
      .page-hero h1 { margin: 0; font-size: clamp(36px, 5vw, 64px); line-height: 1.02; letter-spacing: -.035em; }
      .page-hero .lede { margin: 22px 0 0; font-size: 20px; line-height: 1.5; color: var(--ink-2); max-width: 34em; }
      .two { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr)); gap: 0; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); }
      .two > div { padding: 40px 24px 44px 0; }
      .two > div + div { border-top: 1px solid var(--ink); padding-left: 0; }
      @media (min-width: 820px) { .two > div + div { border-top: 0; border-left: 1px solid var(--ink); padding-left: 32px; } }
      .two h2, .faq h2 { margin: 0 0 18px; font-size: 26px; letter-spacing: -.02em; }
      .ticks { margin: 0; padding: 0; list-style: none; display: grid; gap: 12px; }
      .ticks li { display: grid; grid-template-columns: 22px 1fr; gap: 8px; font-size: 17px; line-height: 1.5; color: var(--ink-2); }
      .ticks li::before { content: "—"; color: var(--accent); font-family: var(--mono); }
      .faq { padding-top: 72px; padding-bottom: 24px; }
      .faq details { border-top: 1px solid var(--ink); padding: 18px 0; }
      .faq details:last-of-type { border-bottom: 1px solid var(--ink); }
      .faq summary { cursor: pointer; font-size: 19px; font-weight: 600; list-style: none; display: flex; justify-content: space-between; gap: 16px; }
      .faq summary::-webkit-details-marker { display: none; }
      .faq summary::after { content: "+"; font-family: var(--mono); color: var(--accent); }
      .faq details[open] summary::after { content: "–"; }
      .faq details p { margin: 12px 0 0; font-size: 17px; line-height: 1.6; color: var(--ink-2); max-width: 44em; }
      .cta { background: var(--ink); color: var(--paper); margin-top: 72px; }
      .cta .wrap { padding-top: 64px; padding-bottom: 64px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 24px; }
      .cta h2 { margin: 0; font-size: clamp(28px, 3.4vw, 44px); letter-spacing: -.03em; max-width: 16em; }
      .cta .btn-dark { background: var(--accent); border-color: var(--accent); }
      .more { padding-top: 56px; padding-bottom: 72px; }
      .more ul { margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); gap: 12px; }
      .more a { display: block; border: 1px solid var(--ink); padding: 16px 18px; text-decoration: none; font-weight: 600; min-height: 48px; }
      .more a:hover { background: var(--ink); color: var(--paper); }
`;

// ---------- business details for search engines and AI tools (JSON-LD) ----------
const ORG_ID = abs('/#org');
const PERSON_ID = abs('/#sky');
export function orgGraph() {
  return [
    {
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      name: SITE.name,
      url: abs('/'),
      email: SITE.email,
      logo: abs('/og-logo.png'),
      image: abs('/og-image.png'),
      description: `${SITE.tagline}: technical advising, implementation, operational root-causing, systems and administrative support.`,
      slogan: 'Find the real problem. Fix it properly. Leave it running.',
      founder: { '@id': PERSON_ID },
      address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressRegion: SITE.region, addressCountry: 'US' },
      areaServed: SITE.areas.map((a) => (a === 'United States' ? { '@type': 'Country', name: a } : { '@type': 'City', name: a })),
      knowsAbout: ['IT for small businesses', 'website performance on mobile', 'business systems', 'process improvement', 'software implementation', 'IT administration'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: abs(`/services/${s.slug}/`) } })),
      },
      ...(SITE.profiles.length ? { sameAs: SITE.profiles } : {}),
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: SITE.founder,
      jobTitle: SITE.role,
      worksFor: { '@id': ORG_ID },
      email: SITE.email,
      url: abs('/'),
    },
  ];
}
const ld = (graph) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
const faqLd = (items, id) => ({ '@type': 'FAQPage', '@id': id, mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const crumbsLd = (trail) => ({ '@type': 'BreadcrumbList', itemListElement: trail.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(url) })) });

// ---------- page shell ----------
function head({ title, description, url }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${abs(url)}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta name="theme-color" content="#F4F3EF" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE.name}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${abs(url)}" />
    <meta property="og:image" content="${abs('/og-image.png')}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="aii.coach — Find the real problem. Fix it properly. Leave it running." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${abs('/og-image.png')}" />
    <link rel="preload" href="/fonts/inter-tight.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/plex-mono.woff2" as="font" type="font/woff2" crossorigin />
    <style>${style}${extraStyle}    </style>`;
}
const header = `
    <header class="header">
      <div class="wrap">
        ${headerLogo}
        <nav class="nav" aria-label="Main">
          <a href="/#services">Services</a>
          <a href="/faq/">FAQ</a>
          <a href="/#founding">Founding</a>
          <a href="/#contact">Contact</a>
        </nav>
      </div>
    </header>`;
const cta = (line) => `
      <section class="cta" aria-label="Get in touch">
        <div class="wrap">
          <h2>${esc(line)}</h2>
          <div class="actions">
            <a class="btn btn-dark" href="/#contact">Book a free 30-minute call</a>
            <a class="btn btn-line" style="color:var(--paper);border-color:var(--paper)" href="mailto:${SITE.email}">${SITE.email}</a>
          </div>
        </div>
      </section>`;
const faqBlock = (items, heading) => `
      <section class="wrap faq" aria-labelledby="faq-h">
        <h2 id="faq-h">${esc(heading)}</h2>
        ${items.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n        ')}
      </section>`;
const shell = (meta, graph, body) => `${head(meta)}
    ${ld(graph)}
  </head>
  <body>${header}
    <main>${body}
    </main>

    ${footer}

    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`;

function write(rel, html) {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// ---------- service pages ----------
for (const [i, s] of SERVICES.entries()) {
  const url = `/services/${s.slug}/`;
  const others = SERVICES.filter((o) => o.slug !== s.slug);
  const description = `${s.lede} ${s.name} from aii.coach — fixed scope, plain English.`.slice(0, 300);
  const body = `
      <div class="wrap crumbs"><a href="/">aii.coach</a> / <a href="/#services">Services</a> / ${esc(s.name)}</div>
      <section class="wrap page-hero">
        <p class="eyebrow">§ Service ${String(i + 1).padStart(2, '0')} — ${esc(s.name)}</p>
        <h1>${esc(s.title)}</h1>
        <p class="lede">${esc(s.lede)}</p>
        <div class="actions" style="margin-top:28px"><a class="btn btn-dark" href="/#contact">Book a free 30-minute call</a></div>
      </section>
      <section class="wrap" aria-label="Who it's for and what it fixes">
        <div class="two">
          <div><h2>Who it’s for</h2><ul class="ticks">${s.who.map((w) => `<li>${esc(w)}</li>`).join('')}</ul></div>
          <div><h2>Problems it fixes</h2><ul class="ticks">${s.problems.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>
        </div>
      </section>
      <section class="wrap section" aria-labelledby="how-h">
        <p class="eyebrow">How it works</p>
        <h2 id="how-h">What happens, step by step.</h2>
        <ol class="steps">
          ${s.steps.map(([t, d], j) => `<li class="step${j === s.steps.length - 1 ? ' last' : ''}"><div class="k">${'ABCD'[j]}.</div><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('\n          ')}
        </ol>
      </section>${faqBlock(s.faq, `${s.name}: questions`)}${cta('Not sure this is the right fit? Tell me what’s going on.')}
      <section class="wrap more" aria-labelledby="more-h">
        <p class="eyebrow" id="more-h">Other services</p>
        <ul>${others.map((o) => `<li><a href="/services/${o.slug}/">${esc(o.name)} →</a></li>`).join('')}<li><a href="/faq/">Common questions →</a></li></ul>
      </section>`;
  const graph = [
    ...orgGraph(),
    { '@type': 'Service', '@id': abs(url + '#service'), name: s.name, serviceType: s.name, description: s.lede, url: abs(url), provider: { '@id': ORG_ID },
      areaServed: SITE.areas.map((a) => ({ '@type': a === 'United States' ? 'Country' : 'City', name: a })), audience: { '@type': 'BusinessAudience', name: 'Small businesses' } },
    faqLd(s.faq, abs(url + '#faq')),
    crumbsLd([['aii.coach', '/'], ['Services', '/#services'], [s.name, url]]),
  ];
  write(`services/${s.slug}/index.html`, shell({ title: `${s.title} | aii.coach`, description, url }, graph, body));
}

// ---------- FAQ page ----------
{
  const url = '/faq/';
  const body = `
      <div class="wrap crumbs"><a href="/">aii.coach</a> / FAQ</div>
      <section class="wrap page-hero">
        <p class="eyebrow">§ FAQ</p>
        <h1>Questions small businesses ask about their tech, answered plainly.</h1>
        <p class="lede">Short, direct answers. If yours isn’t here, email ${SITE.email} — a person replies within one business day.</p>
      </section>${faqBlock(FAQ, 'Common questions')}${cta('Have a question that isn’t here?')}
      <section class="wrap more" aria-labelledby="more-h">
        <p class="eyebrow" id="more-h">Services</p>
        <ul>${SERVICES.map((o) => `<li><a href="/services/${o.slug}/">${esc(o.name)} →</a></li>`).join('')}</ul>
      </section>`;
  const graph = [...orgGraph(), faqLd(FAQ, abs(url + '#faq')), crumbsLd([['aii.coach', '/'], ['FAQ', url]])];
  write('faq/index.html', shell({ title: 'Small business tech questions, answered | aii.coach', description: 'Plain-English answers: how much a slow website costs, whether you need an IT person, what a fractional IT lead is, and how projects with aii.coach work.', url }, graph, body));
}

// ---------- home page: refresh its business details and preview tags in place ----------
{
  let h = home;
  const graph = [...orgGraph(), { '@type': 'WebSite', '@id': abs('/#site'), url: abs('/'), name: SITE.name, publisher: { '@id': ORG_ID } }];
  h = h.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, ld(graph));
  h = h.replace(/\s*<meta name="twitter:card"[^>]*>/, '');
  h = h.replace(/\s*<meta property="og:image[^>]*>/g, '').replace(/\s*<meta name="twitter:image"[^>]*>/, '').replace(/\s*<link rel="apple-touch-icon"[^>]*>/, '');
  h = h.replace(/(<meta property="og:url"[^>]*>)/, `$1
    <meta property="og:image" content="${abs('/og-image.png')}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="aii.coach — Find the real problem. Fix it properly. Leave it running." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${abs('/og-image.png')}" />`);
  h = h.replace(/(<link rel="icon"[^>]*>)/, '$1\n    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />');
  fs.writeFileSync(path.join(root, 'index.html'), h);
}

// ---------- sitemap ----------
{
  const today = new Date().toISOString().slice(0, 10);
  const urls = ['/', '/faq/', ...SERVICES.map((s) => `/services/${s.slug}/`)];
  fs.writeFileSync(path.join(root, 'public/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${abs(u)}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
}

console.log(`[pages] ${SERVICES.length} service pages, FAQ, sitemap and home details written`);
