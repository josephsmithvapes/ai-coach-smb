import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, Clock, Zap, CheckCircle,
  Code, Cpu, Database, GraduationCap, Award, Users
} from 'lucide-react';

const SERVICES = [
  {
    title: "AI Team Training",
    desc: "Hands-on workshops covering AI ethics, 'Golden Prompting', and how your team uses it safely every day.",
    icon: <GraduationCap size={24} color="var(--cobalt)" />,
    useCase: {
      scenario: "Retail — Regional Clothing Boutique, 12-person team",
      detail: "After a structured AI prompt training program, staff were independently drafting product descriptions, responding to reviews, and generating weekly reports — without a template in sight. Average time reclaimed: 6 hours per employee, per week, within 30 days.",
      result: "6 hrs/week reclaimed per employee",
    },
  },
  {
    title: "Agent Design + Support",
    desc: "Custom autonomous agents that handle support, scheduling, and repetitive tasks — without human input.",
    icon: <Cpu size={24} color="var(--cobalt)" />,
    useCase: {
      scenario: "F&B — Multi-location restaurant group, 3 locations",
      detail: "A 24/7 AI agent was deployed to handle inbound reservations, dietary questions, and hours inquiries across all locations. It resolved 78% of contacts without staff involvement — front-of-house shifted entirely to in-person guests.",
      result: "78% of inbound handled automatically",
    },
  },
  {
    title: "App Dev + Integration",
    desc: "Custom AI applications built to plug into the tools your business already uses.",
    icon: <Code size={24} color="var(--cobalt)" />,
    useCase: {
      scenario: "DTC — Skincare brand, 4-warehouse operation",
      detail: "A custom AI dashboard was built to monitor stock across all warehouses, predict stockouts 14 days in advance, and auto-generate draft purchase orders. The team shifted from reactive firefighting to proactive planning.",
      result: "91% drop in stockout incidents",
    },
  },
  {
    title: "Data Insights",
    desc: "We dig into your business data to find where money is being lost — and show you how to get it back.",
    icon: <Database size={24} color="var(--cobalt)" />,
    useCase: {
      scenario: "F&B — Mid-size restaurant group, peak-hour audit",
      detail: "The operator suspected revenue was leaking but couldn't identify where. A data audit revealed that 31% of peak-hour table turns were delayed by a single POS workflow bottleneck. One targeted fix produced measurable results overnight.",
      result: "$8K/month in recovered revenue",
    },
  },
];

const SERVICE_MESSAGES = {
  "General Inquiry":              "Hi, I'd like to learn more about how AI Integration+ can help my business. Please reach out so we can set up a quick call.",
  "Team Training (Golden Prompt)":"I'm interested in AI training for my team. We currently handle a lot of manual tasks and I'd like to explore responsible AI adoption, prompting best practices, and how to get our staff up to speed.",
  "Agent Design":                 "I'd like to explore a custom AI agent for my business. We have repetitive workflows — like scheduling, customer follow-ups, or support — that I believe could be automated. I'd love to discuss what's possible.",
  "App Development":              "I'm interested in a custom AI application that integrates with my existing tools. I'd like to talk through the scope of the build, timeline, and what a working prototype might look like.",
  "Data Analysis":                "I'd like help uncovering insights from my business data. I'm not sure where all the friction or lost revenue is hiding, and I'd love a data audit to find out.",
  "Full Integration + Training":  "I'm looking for end-to-end support — agent design, app development, and team training. My goal is to fully modernize how we operate. Let's talk about a full integration plan.",
};

const TICKER_FACTS = [
  "65% of customer support queries are now resolved by AI without human intervention — Freshworks 2025",
  "76% of SMBs use AI for marketing functions, up from 52% in 2023 — Salesforce 2025",
  "AI-assisted employees handle 13.8% more customer inquiries per hour — Freshworks 2025",
  "58% of employees using AI tools save an average of 52 minutes every day — AutoFaceless 2026",
  "Organizations with mature AI deployment spend 56% more time on revenue-generating work — McKinsey 2025",
  "SMBs adopting AI report 91% revenue lift and 86% improved profit margins — Salesforce 2025",
  "3.7x average ROI from AI adoption — McKinsey Global AI Survey 2025",
  "First response times in customer service drop from 6+ hours to under 4 minutes with AI — Freshworks 2025",
];

const BREAKDOWN = [
  { label: 'Customer Support & Scheduling', pct: 0.35, why: '65% of queries resolved without human input. First response drops from 6+ hrs to 4 min. (Freshworks 2025)' },
  { label: 'Marketing & Content Ops',       pct: 0.28, why: '76% of SMBs use AI for marketing. Lead qualification, campaigns, and copy run without manual input. (Salesforce 2025)' },
  { label: 'Data Entry & Reporting',        pct: 0.22, why: 'CRM updates, post-call logging, and reporting automated end-to-end — eliminating the #1 admin drag. (McKinsey 2025)' },
  { label: 'Operations & Inventory',        pct: 0.15, why: '68% of SMBs use AI for operations. Reorder triggers and status updates run on autopilot. (Salesforce 2025)' },
];

const SOURCES = [
  { label: 'McKinsey Global AI Survey 2025',             note: 'ROI benchmarks (3.7x avg.), automation potential by business function, productivity impact.' },
  { label: 'Salesforce SMB AI Trends 2025',              note: '77% of SMBs have adopted AI in at least one function; marketing (76%) and operations (68%) adoption rates.' },
  { label: 'AutoFaceless AI Productivity Stats 2026',    note: '70–90% reduction in busywork time across 500+ automated workflows.' },
  { label: 'Freshworks AI ROI in Customer Service 2025', note: '65% of queries resolved without human input; first response time reduced from 6+ hrs to 4 min.' },
  { label: 'NextPhone AI Customer Service Stats 2026',   note: 'Customer support labor costs reduced by up to 90%; 87% improvement in resolution times.' },
];

const HRS_PER_SECOND = 22;
const secondsToday = () => {
  const n = new Date();
  return n.getUTCHours() * 3600 + n.getUTCMinutes() * 60 + n.getUTCSeconds();
};

export default function App() {
  const [activeCard,   setActiveCard]   = useState(null);
  const [counter,      setCounter]      = useState(secondsToday() * HRS_PER_SECOND);
  const [tickerIndex,  setTickerIndex]  = useState(0);
  const [hours,        setHours]        = useState(20);
  const [status,       setStatus]       = useState("");
  const [service,      setService]      = useState("General Inquiry");
  const [message,      setMessage]      = useState(SERVICE_MESSAGES["General Inquiry"]);

  useEffect(() => {
    const t1 = setInterval(() => setCounter(c => c + HRS_PER_SECOND), 1000);
    const t2 = setInterval(() => setTickerIndex(i => (i + 1) % TICKER_FACTS.length), 5000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const handleServiceChange = (e) => {
    const v = e.target.value;
    setService(v);
    setMessage(SERVICE_MESSAGES[v]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const res = await fetch("https://formspree.io/f/meepbpzn", {
      method: "POST", body: new FormData(form), headers: { Accept: 'application/json' },
    });
    if (res.ok) { setStatus("SUCCESS"); form.reset(); } else { setStatus("ERROR"); }
  };

  const reclaimed = Math.round(hours * 0.70);

  return (
    <div className="app">

      {/* ── NAV ── */}
      <nav style={{ borderBottom: '1px solid var(--slate-100)', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <div className="container nav-wrapper">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '1.75rem', height: '1.75rem', background: 'var(--midnight)', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '0.625rem', height: '0.625rem', border: '2px solid var(--sage)', borderRadius: '50%' }} />
            </div>
            <span className="logo-text" style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>AI Integration+</span>
          </div>
          <a href="#book" className="btn-primary">Book Free Audit</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header style={{ padding: '2rem 0 4rem' }}>
        <div className="container">
          <div style={{ maxWidth: '52rem' }}>
            <span className="eyebrow">AI Integrations | Coaching | Consulting</span>
            <h1>Afraid of AI?<br />Your competitors aren't.</h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '42rem' }}>
              We automate the tasks eating your hours, train your team to work smarter, and turn your business data into decisions — so you can stop running your business and start growing it.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="#book" className="btn-primary btn-lg">Book Free Audit</a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--slate-600)', fontSize: '0.875rem' }}>
                <ShieldCheck size={16} color="var(--cobalt)" />
                <span>Google-Certified AI Professionals</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── PROOF BAR ── */}
      <section className="proof-bar">
        <div className="container proof-grid">
          <div className="proof-item"><Award size={18} color="var(--cobalt)" /><span>$3.70 back per $1 invested</span></div>
          <div className="proof-item"><Users size={18} color="var(--cobalt)" /><span>77% SMB Adoption</span></div>
          <div className="proof-item"><Clock size={18} color="var(--cobalt)" /><span>30-Day Deployment</span></div>
          <div className="proof-item"><Zap   size={18} color="var(--cobalt)" /><span>70% Hours Reclaimed</span></div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section>
        <div className="container">
          <div className="card" style={{ backgroundColor: 'var(--midnight)', color: 'white' }}>
            <div className="grid grid-2" style={{ alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>How Much Is Manual Work Costing You?</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 0 }}>
                  How many hours a week does your team lose to repetitive, manual tasks?
                </p>
                <input
                  type="range" min="5" max="60" value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--midnight)', marginTop: '1.5rem', marginBottom: '0.375rem' }}
                />
                <div className="label-xs" style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.4)' }}>
                  <span>5 hrs/wk</span>
                  <span style={{ color: 'var(--sage)', fontWeight: 700 }}>{hours} hrs/wk</span>
                  <span>60 hrs/wk</span>
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--sage)', lineHeight: 1, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>
                  {reclaimed}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'white', marginTop: '0.5rem' }}>hours given back every week</div>
                <div className="label-xs" style={{ color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>
                  ≈ {Math.round(reclaimed * 52).toLocaleString()} hours freed per year
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
              <p className="label-xs" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>
                Where the time comes back — and why
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
                {BREAKDOWN.map(({ label, pct, why }) => (
                  <div key={label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.3 }}>{label}</span>
                      <span style={{ color: 'var(--sage)', fontWeight: 700, fontSize: '1.125rem', whiteSpace: 'nowrap' }}>{Math.round(reclaimed * pct)} hrs</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>{why}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE TICKER ── */}
      <section className="ticker-bar">
        <div className="container ticker-inner">
          <div className="ticker-counter">
            <span className="label-xs" style={{ color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>Hours given back by AI — worldwide, today</span>
            <span style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--sage)', fontVariantNumeric: 'tabular-nums' }}>
              {counter.toLocaleString()}
            </span>
          </div>
          <div className="ticker-fact">
            <span className="label-xs" style={{ color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>Latest</span>
            <span className="ticker-fact-text" style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.75)' }}>
              {TICKER_FACTS[tickerIndex]}
            </span>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ background: 'var(--slate-100)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Four Ways We Transform Your Operations</h2>
          <div className="grid grid-2 grid-4">
            {SERVICES.map((s, i) => {
              const open = activeCard === i;
              return (
                <div key={i} className="card service-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  {s.icon}
                  <h3 style={{ marginTop: '1rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.9rem', flexGrow: 1 }}>{s.desc}</p>

                  <button
                    onClick={() => setActiveCard(open ? null : i)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.375rem',
                      color: 'var(--cobalt)', fontSize: '0.8rem', fontWeight: 700,
                      fontFamily: 'Roboto, sans-serif', padding: '0.5rem 0 0',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ display: 'inline-block', transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>↗</span>
                    {open ? 'Close' : 'See a real example'}
                  </button>

                  <div style={{
                    overflow: 'hidden',
                    maxHeight: open ? '20rem' : '0',
                    transition: 'max-height 0.35s ease',
                  }}>
                    <div style={{ borderTop: '1px solid var(--slate-100)', marginTop: '0.75rem', paddingTop: '0.875rem' }}>
                      <p className="label-xs" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--cobalt)', marginBottom: '0.375rem' }}>
                        {s.useCase.scenario}
                      </p>
                      <p style={{ fontSize: '0.8rem', lineHeight: 1.65, marginBottom: '0.75rem' }}>{s.useCase.detail}</p>
                      <div style={{ display: 'inline-block', background: 'var(--midnight)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: '2rem' }}>
                        {s.useCase.result}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="#book" className="btn-primary">Book Free Audit →</a>
          </div>
        </div>
      </section>

      {/* ── FORM / CTA ── */}
      <section id="book">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
            <div>
              <span className="eyebrow">Your competitors already made the move.</span>
              <h2>We Handle the Tech.<br />You Handle Growth.</h2>
              <p>
                In Retail, DTC, and F&B, the businesses pulling ahead aren't working harder — they've automated the work that used to eat their day. We build custom AI agents that manage everything from stock levels to personalized customer interactions, without adding headcount.
              </p>
              <p>
                We also make sure your team knows how to use AI right — so you get the productivity gains without the risk. Google-certified training that actually sticks.
              </p>
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <CheckCircle color="var(--cobalt)" size={18} />
                  <span style={{ fontSize: '0.9375rem', fontWeight: 500 }}><strong>Integration:</strong> Agents built to grow with your business</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <CheckCircle color="var(--cobalt)" size={18} />
                  <span style={{ fontSize: '0.9375rem', fontWeight: 500 }}><strong>Training:</strong> Google-certified responsible AI for your team</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <CheckCircle color="var(--cobalt)" size={18} />
                  <span style={{ fontSize: '0.9375rem', fontWeight: 500 }}><strong>Insights:</strong> Data audits that surface hidden revenue</span>
                </div>
              </div>
            </div>

            <div className="card">
              {status === "SUCCESS" ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <CheckCircle color="var(--cobalt)" size={40} />
                  <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Request received.</h3>
                  <p>We'll reach out within one business day.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ marginBottom: '1.5rem' }}>Request Your Free Audit</h3>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="text"  name="name"    placeholder="Full Name"       required />
                    <input type="email" name="email"   placeholder="Business Email"  required />
                    <select name="service" value={service} onChange={handleServiceChange}>
                      <option>General Inquiry</option>
                      <option>Team Training (Golden Prompt)</option>
                      <option>Agent Design</option>
                      <option>App Development</option>
                      <option>Data Analysis</option>
                      <option>Full Integration + Training</option>
                    </select>
                    <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} style={{ height: '8rem' }} required />
                    <button type="submit" className="btn-primary btn-lg" style={{ width: '100%' }}>
                      Request Free Audit
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOURCES ── */}
      <section style={{ background: 'var(--slate-100)', padding: '2.5rem 0' }}>
        <div className="container">
          <p className="label-xs" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--slate-600)', marginBottom: '1rem' }}>
            Data Sources
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {SOURCES.map(({ label, note }) => (
              <p key={label} style={{ fontSize: '0.75rem', color: 'var(--slate-600)', margin: 0, lineHeight: 1.65 }}>
                <strong>{label}</strong> — {note}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="container" style={{ padding: '2rem 0', textAlign: 'center', opacity: 0.5, fontSize: '0.8125rem', borderTop: '1px solid var(--slate-100)' }}>
        © 2026 AI Integration+ · Google Certified AI Professionals
      </footer>

    </div>
  );
}
