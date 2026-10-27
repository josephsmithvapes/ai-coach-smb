import React, { useState } from 'react';

const EMAIL = 'sky@aii.coach';
const FORM_ENDPOINT = 'https://formspree.io/f/meepbpzn';

const SERVICES = [
  { title: 'Technical advising', desc: 'A straight answer on what to build, buy, keep or switch off — before you spend on it.' },
  { title: 'Implementation', desc: 'We set it up, connect it to what you already run, and make sure your team can use it.' },
  { title: 'Operational root-causing', desc: "When the same thing keeps breaking, we trace it to the cause instead of patching today's fire." },
  { title: 'Systems', desc: 'Tools, data and workflows shaped around how your people actually work.' },
  { title: 'Administrative support', desc: 'Accounts, access, vendors, renewals — the IT chores nobody on your team owns.' },
];

const STEPS = [
  { k: 'A.', title: 'Talk', desc: "A free 30-minute call. You describe what's slowing you down." },
  { k: 'B.', title: 'Diagnose', desc: 'We look at the real setup and name the cause in plain English.' },
  { k: 'C.', title: 'Fix', desc: 'A fixed-scope piece of work, agreed in writing before we start.' },
  { k: 'D.', title: 'Hand off', desc: 'Documentation and a walkthrough, so it keeps working without us.' },
];

function Mark({ size = 28, stroke = '#141414' }) {
  const w = size <= 18 ? 5 : 3.5;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="11" fill="none" stroke={stroke} strokeWidth={w} />
      <path d="M20 1v8M20 31v8M1 20h8M31 20h8" stroke={stroke} strokeWidth={w} />
      <circle cx="20" cy="20" r={size <= 18 ? 5.5 : 4.6} fill="var(--accent)" />
    </svg>
  );
}

function ContactForm() {
  const [status, setStatus] = useState('idle');
  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(e.target), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error();
      setStatus('sent');
      e.target.reset();
    } catch {
      setStatus('error');
    }
  };
  if (status === 'sent') {
    return (
      <div className="form" role="status">
        <h3>Thanks — message received.</h3>
        <p className="ok">You'll get a reply from Sky within one business day.</p>
      </div>
    );
  }
  return (
    <form className="form" onSubmit={submit}>
      <h3>Tell us what's going on</h3>
      <div className="field"><label htmlFor="c-name">Name</label><input id="c-name" name="name" autoComplete="name" required /></div>
      <div className="field"><label htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" autoComplete="email" required /></div>
      <div className="field">
        <label htmlFor="c-topic">What do you need help with?</label>
        <select id="c-topic" name="service" defaultValue="Not sure yet">
          <option>Not sure yet</option>
          {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
        </select>
      </div>
      <div className="field"><label htmlFor="c-msg">What's happening?</label><textarea id="c-msg" name="message" required placeholder="The problem, what you've tried, and what it's costing you." /></div>
      <input type="hidden" name="_subject" value="aii.coach — new enquiry" />
      <button className="btn btn-dark" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send'}</button>
      {status === 'error' && <p className="err" role="alert">That didn't send. Please email {EMAIL} directly.</p>}
    </form>
  );
}

export default function App() {
  return (
    <>
      <header className="header rule-b">
        <div className="wrap">
          <a className="brand" href="#top" aria-label="aii.coach home"><Mark /><span>aii<span className="dot">.</span>coach</span></a>
          <nav className="nav" aria-label="Main">
            <a href="#services">Services</a>
            <a href="#method">Method</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="wrap hero">
          <div>
            <p className="eyebrow">§ 01 — Technology consultancy</p>
            <h1>Find the real problem.<br />Fix it properly.<br />Leave it running.</h1>
          </div>
          <div className="side">
            <p>Technical advising, hands-on implementation, operational root-causing, systems and admin support — for small teams that don't have an IT department and shouldn't need one.</p>
            <div className="actions">
              <a className="btn btn-dark" href="#contact">Book a 30-minute call</a>
              <a className="btn btn-line" href="#services">See what we do</a>
            </div>
          </div>
        </section>

        <section id="services" className="services" aria-label="Services">
          <div className="wrap">
            <div className="svc-grid">
              {SERVICES.map((s, i) => (
                <div className="svc" key={s.title}>
                  <div className="num">{String(i + 1).padStart(2, '0')}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="wrap section">
          <p className="eyebrow">§ 02 — Method</p>
          <h2>Four steps. Written down. No surprises.</h2>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div className={`step${i === STEPS.length - 1 ? ' last' : ''}`} key={s.k}>
                <div className="k">{s.k}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="band">
          <div className="wrap">
            <p>Built by an operator. Twenty years running teams and budgets before running systems — so we start with how the work actually flows.</p>
            <div className="who">Sky Madsen<br />Founder, aii.coach</div>
          </div>
        </section>

        <section id="contact" className="wrap contact">
          <div>
            <p className="eyebrow">§ 03 — Contact</p>
            <a className="big-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p className="note">Tell us what's broken or what you're planning. You'll get a reply from a person within one business day.</p>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="footer rule-t">
        <div className="wrap">
          <span className="left"><Mark size={16} stroke="#4a4a4a" />© {new Date().getFullYear()} aii.coach</span>
          <span>Los Angeles, CA · Remote</span>
        </div>
      </footer>
    </>
  );
}
