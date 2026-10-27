// All words for the service pages, the FAQ page and the business details search engines read.
// Edit here, then `npm run build` (or `npm run deploy`). Keep answers plain: the first sentence answers the question.

export const SITE = {
  url: 'https://www.aii.coach',
  name: 'aii.coach',
  email: 'sky@aii.coach',
  founder: 'Sky Madsen',
  role: 'Fractional IT & systems lead',
  tagline: 'Hands-on tech advisor for small teams',
  city: 'Los Angeles',
  region: 'CA',
  // Where you take clients. Add cities as you start serving them (e.g. 'Seattle', 'Portland').
  areas: ['Los Angeles', 'United States'],
  // Public profile links (LinkedIn company page, your LinkedIn, Google Business Profile…). Leave empty until they exist.
  profiles: ['https://www.linkedin.com/company/aii-coach/'],
};

export const SERVICES = [
  {
    slug: 'technical-advising',
    name: 'Technical advising',
    short: 'A straight answer on what to build, buy, keep or switch off — before you spend on it.',
    title: 'Technical advising for small businesses',
    lede: 'An independent, plain-English answer on what to build, buy, keep or switch off — before you spend money on it.',
    who: [
      'Owners and managers about to pick new software, a new website platform, or a new tool for the team.',
      'Teams paying for subscriptions nobody is sure they still need.',
      'Businesses getting quotes from developers or agencies and wanting a second opinion they can trust.',
    ],
    problems: [
      'Too many tools that overlap, and monthly bills that keep growing.',
      'Big decisions made on a sales demo instead of how your team actually works.',
      'Quotes that are hard to compare because nobody explains the trade-offs.',
      'Projects that start without a clear goal, so they never quite finish.',
    ],
    steps: [
      ['Talk', 'A free 30-minute call about the decision in front of you and what is driving it.'],
      ['Look', 'I review what you use today, what it costs, and how the work really flows.'],
      ['Recommend', 'A short written recommendation: options, trade-offs and what I would do, in plain English.'],
      ['Decide', 'You decide. If you want help putting it in place, that becomes a fixed-scope project.'],
    ],
    faq: [
      ['Do you sell software or take commissions?', 'No. I don’t resell tools or take referral fees, so the recommendation is based only on what fits your business.'],
      ['Can you review a quote we already have?', 'Yes. Reviewing a developer’s or agency’s quote is one of the most common requests, and it usually takes a few days.'],
      ['What if the answer is “don’t buy anything”?', 'Then that is the recommendation. Keeping what you have and using it properly is often the cheapest fix.'],
    ],
  },
  {
    slug: 'implementation',
    name: 'Implementation',
    short: 'We set it up, connect it to what you already run, and make sure your team can use it.',
    title: 'Software and systems implementation for small teams',
    lede: 'The decision is made — now it needs to be set up properly, connected to what you already run, and actually used by your team.',
    who: [
      'Businesses that bought a tool and never fully set it up.',
      'Teams switching platforms: website, booking, point of sale, email, accounting or customer records.',
      'Owners who don’t have time to project-manage a rollout themselves.',
    ],
    problems: [
      'A new system sitting half-configured while the team keeps using the old workaround.',
      'Data copied between tools by hand because they don’t talk to each other.',
      'A website or booking flow that works on a laptop but is painful on a phone.',
      'Nobody on the team knows how the new setup is supposed to work.',
    ],
    steps: [
      ['Scope', 'We agree in writing what will be set up, connected and handed over — and the fixed price.'],
      ['Build', 'I configure the tool, move the data, and connect it to the systems you already use.'],
      ['Test', 'We test it with real tasks from your week, on the devices your team and customers use.'],
      ['Hand over', 'Short written instructions and a walkthrough, so it keeps working without me.'],
    ],
    faq: [
      ['How long does an implementation take?', 'Most small-business projects take one to three weeks, and the timeline is agreed before work starts.'],
      ['Will my business be disrupted?', 'Changes are tested first and switched over at a quiet time you choose, so day-to-day work keeps running.'],
      ['Do you work with the tools we already have?', 'Yes. Most of the work is making the tools you already pay for fit together and work properly.'],
    ],
  },
  {
    slug: 'operational-root-causing',
    name: 'Operational root-causing',
    short: 'When the same thing keeps breaking, we trace it to the cause instead of patching today’s fire.',
    title: 'Operational root-cause analysis for small businesses',
    lede: 'When the same problem keeps coming back, it has a cause. I find it, fix it there, and make sure it stays fixed.',
    who: [
      'Teams fixing the same issue every week: late invoices, missed bookings, wrong orders, lost messages.',
      'Owners who sense something is leaking money but can’t point to where.',
      'Businesses that have grown faster than their processes.',
    ],
    problems: [
      'Work that depends on one person remembering a manual step.',
      'Numbers that never quite match between systems.',
      'Customers falling through the gaps between phone, email, website and in person.',
      'Fixes that work for a week, then the problem returns.',
    ],
    steps: [
      ['Map', 'We trace how the work actually flows today — every hand-off, tool and workaround.'],
      ['Find', 'I pinpoint where it breaks and why, and write it down in plain English.'],
      ['Fix', 'We fix it at the source: a process change, an automation, or a tool set up properly.'],
      ['Check', 'We confirm it stays fixed, and leave a simple way to spot it early if it slips.'],
    ],
    faq: [
      ['What does “root-causing” mean?', 'It means finding the real reason a problem keeps happening, instead of fixing the same symptom every time it shows up.'],
      ['Is this about technology or about process?', 'Both. Most recurring problems are a process gap that technology makes worse — or that technology can close.'],
      ['How do you work with my team?', 'I talk to the people doing the work, watch how it happens, and keep changes small enough to stick.'],
    ],
  },
  {
    slug: 'systems',
    name: 'Systems',
    short: 'Tools, data and workflows shaped around how your people actually work.',
    title: 'Business systems and workflow design for small teams',
    lede: 'Your tools, data and daily routines designed as one system — shaped around how your people actually work.',
    who: [
      'Businesses running on spreadsheets, sticky notes and memory.',
      'Teams using five tools that each hold part of the picture.',
      'Owners who want to step back without things falling apart.',
    ],
    problems: [
      'No single place to see what’s booked, sold, owed or overdue.',
      'The same information typed into several systems.',
      'New staff taking weeks to learn “how we do things here.”',
      'Reports that take hours to pull together by hand.',
    ],
    steps: [
      ['Understand', 'We map the jobs your business does every day and the information each one needs.'],
      ['Design', 'I design a simple setup: which tool owns what, and how information moves between them.'],
      ['Build', 'We set it up, connect it, and automate the repetitive steps.'],
      ['Document', 'A short guide your team can follow, so the system outlasts any one person.'],
    ],
    faq: [
      ['Do we need to replace our current software?', 'Usually not. Most of the gain comes from connecting and simplifying what you already have.'],
      ['Can you automate repetitive tasks?', 'Yes. Copying data between tools, reminders, follow-ups and routine reports are the most common things automated.'],
      ['Will it be too complicated for my team?', 'No — if it’s too complicated for your team, it isn’t finished. Simple to use is part of the brief.'],
    ],
  },
  {
    slug: 'administrative-support',
    name: 'Administrative support',
    short: 'Accounts, access, vendors, renewals — the IT chores nobody on your team owns.',
    title: 'IT administrative support for small businesses',
    lede: 'Accounts, access, vendors, renewals and devices — the IT chores nobody on your team owns, handled and written down.',
    who: [
      'Businesses without an IT person, where “whoever is good with computers” handles it.',
      'Owners who don’t know who has the login to the website, domain or email.',
      'Teams onboarding and offboarding staff without a checklist.',
    ],
    problems: [
      'Logins shared over text, and former staff who still have access.',
      'Domains, website hosting or subscriptions that lapse because a renewal email went to the wrong inbox.',
      'Vendors you pay but can’t remember why.',
      'No record of what you own, what it costs, or who to call when it breaks.',
    ],
    steps: [
      ['Inventory', 'I list every account, subscription, device and vendor, with who owns it and what it costs.'],
      ['Secure', 'Shared passwords move into a password manager, and old access is removed.'],
      ['Organise', 'Renewals, billing contacts and admin access go to the right people, on a calendar.'],
      ['Maintain', 'Ongoing help as needed: new hires, departures, vendor issues and renewals.'],
    ],
    faq: [
      ['Is this a monthly service?', 'It can be: a one-time cleanup, or light ongoing support for new hires, departures and renewals.'],
      ['Do you need our passwords?', 'Only the access a task requires, set up through a password manager — never sent by text or email.'],
      ['What happens if you’re unavailable?', 'Everything is documented in a shared record you own, so nothing depends on me.'],
    ],
  },
];

// The FAQ page. First sentence = the direct answer; then a short explanation.
export const FAQ = [
  ['How much does a slow website cost a small business?',
   'A slow website costs you the customers who give up before it loads — and on phones, that’s a lot of them. Google’s research found that as a mobile page’s load time goes from one second to five, the chance a visitor leaves rises by about 90%. If your phone visitors wait several seconds for a blank screen, many of them tap back and choose a competitor.'],
  ['Do I need an IT person?',
   'Most small businesses don’t need a full-time IT person; they need someone to set things up properly and be on call when something changes. A part-time or project-based advisor covers the setup, the clean-up and the occasional problem for far less than a hire.'],
  ['What is a fractional IT lead?',
   'A fractional IT lead is a senior technology person who works with your business part-time instead of as a full-time employee. You get experienced judgement on decisions and setup, without the salary of a full-time role.'],
  ['How do I know if my website is losing customers on phones?',
   'Load it on your own phone over cellular data, not Wi-Fi, and time how long it takes before you can see and tap what a customer needs. If it takes more than a few seconds, slides sideways, or pops something over the page, customers are likely leaving.'],
  ['How much do your services cost?',
   'Every project is fixed-scope and quoted in writing before any work starts, so you know the cost up front. Prices depend on the size of the job; the first call is free.'],
  ['How long does a typical project take?',
   'Most projects take one to three weeks from agreement to handover. Advising work is often done within a week.'],
  ['Do you work remotely?',
   'Yes, most work is done remotely, and I meet in person locally when it helps.'],
  ['Will I be locked into you after the project?',
   'No. Everything is documented and handed over, and all accounts stay in your name, so your team or anyone else can take it from there.'],
  ['What’s the first step?',
   'Book a free 30-minute call or email sky@aii.coach with what’s going on. You’ll get a reply from a person within one business day.'],
  ['What does “aii.coach” mean?',
   'It’s a coach for your business’s technology: practical help, in plain English, that leaves your team more capable than before.'],
];
