import React, { useState } from 'react';
import { 
  TrendingUp, Users, ShieldCheck, Clock, ArrowRight, 
  Zap, Info, CheckCircle, Code, Cpu, Database, GraduationCap, Award 
} from 'lucide-react';

const SERVICES = [
  { title: "AI Team Training", desc: "Workshops on responsible use, ethics, and 'Golden Prompting' for your staff.", icon: <GraduationCap size={24} color="var(--cobalt)" /> },
  { title: "Agent Design + Support", desc: "Custom autonomous agents that handle support, scheduling, and repetitive logic.", icon: <Cpu size={24} color="var(--cobalt)" /> },
  { title: "App Dev + Integration", desc: "Custom AI applications built to live within your existing tech stack.", icon: <Code size={24} color="var(--cobalt)" /> },
  { title: "Data Insights", desc: "Gathering and analyzing business data to uncover hidden revenue and friction.", icon: <Database size={24} color="var(--cobalt)" /> }
];

export default function App() {
  const [hours, setHours] = useState(20);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const response = await fetch("https://formspree.io/f/https://formspree.io/f/meepbpzn", {
      method: "POST", body: data, headers: { 'Accept': 'application/json' }
    });
    if (response.ok) { setStatus("SUCCESS"); form.reset(); } else { setStatus("ERROR"); }
  };
  
  return (
    <div className="app">
      <nav style={{ borderBottom: '1px solid var(--slate-100)', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <div className="container nav-wrapper">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <div style={{ width: '1.75rem', height: '1.75rem', background: 'var(--midnight)', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '0.625rem', height: '0.625rem', border: '2px solid var(--sage)', borderRadius: '50%' }}></div>
             </div>
             <span className="logo-text" style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>AI Integration+</span>
          </div>
          <a href="#book" className="btn-primary">Audit Now</a>
        </div>
      </nav>

      <header style={{ padding: '6rem 0 4rem' }}>
        <div className="container">
          <div style={{ maxWidth: '56rem' }}>
            <span style={{ color: 'var(--cobalt)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.125rem', fontSize: '0.75rem' }}> AI Integrations | Coaching | Consulting</span>
            <h1>AI Phobia?<br />We got you covered.</h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
              We build AI agents, train your team for responsible use, and unlock data insights. Whether you're a home-based creator or a mid-sized operation, we integrate the future.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="#book" className="btn-primary" style={{padding: '1.1rem 2.2rem', fontSize: '1rem'}}>Get Started</a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--slate-600)', fontSize: '0.875rem' }}>
                <ShieldCheck size={18} color="var(--sage)" /> 
                <span>Certified Google AI Professional</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section style={{ padding: '2rem 0', borderTop: '1px solid var(--slate-100)', borderBottom: '1px solid var(--slate-100)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2.5rem', opacity: 0.8, flexWrap: 'wrap' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}><Award size={20} color="var(--cobalt)" />$3:1 ROI</div>
           <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>89% SMB Adoption Rate</div>
           <div style={{ fontSize: '0.9rem', fontWeight: 500 }}></div>
        </div>
      </section>

      <section style={{ background: 'var(--slate-100)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>End-to-End AI Integration</h2>
          <div className="grid grid-2 grid-4">
            {SERVICES.map((s, i) => (
              <div key={i} className="card" style={{ padding: '1.5rem' }}>
                {s.icon}<h3 style={{ fontSize: '1.1rem', marginTop: '0.75rem' }}>{s.title}</h3><p style={{ fontSize: '0.9rem', marginBottom: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="card grid grid-2" style={{ alignItems: 'center', backgroundColor: 'var(--midnight)', color: 'white' }}>
            <div>
              <h2 style={{ color: 'white' }}>Reclaim Capacity</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Quantify the impact of automating your manual load:</p>
              <input type="range" min="5" max="60" value={hours} onChange={(e) => setHours(e.target.value)} style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--sage)', marginTop: '1.25rem' }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--sage)' }}>{Math.round(hours * 0.72)} hrs</div>
              <p>Weekly Capacity Reclaimed</p>
            </div>
          </div>
        </div>
      </section>

      <section id="book">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'flex-start' }}>
            <div>
              <h2>Professional Strategy.</h2>
              <p>We build the agents. We train the humans. We unlock the data.
In the fast-paced world of Retail, DTC, and F&B, staying competitive means moving beyond manual workflows. We build custom AI agents designed to handle the heavy lifting—from optimizing inventory logic to personalizing customer journeys.
 But tools are only half the battle. We bridge the gap between innovation and integrity by training your team in Responsible AI. Our dual-track training ensures your staff masters high-level prompting and technical execution while staying firmly within legal and ethical guardrails. Whether you are a solo creator or a mid-sized operation, we integrate the future of your business—safely, smartly, and at scale.</p>
              <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1rem' }}><CheckCircle color="var(--sage)" size={20}/> <strong>Integration:</strong> Scalable agent architecture</div>
                <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1rem' }}><CheckCircle color="var(--sage)" size={20}/> <strong>Governance:</strong> Google-certified training</div>
              </div>
            </div>
            <div className="card">
              {status === "SUCCESS" ? (
                <div style={{ textAlign: 'center' }}><h3>Success!</h3><p>We'll talk soon.</p></div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input type="text" name="name" placeholder="Full Name" required style={{ marginBottom: '1rem' }} />
                  <input type="email" name="email" placeholder="Business Email" required style={{ marginBottom: '1rem' }} />
                  <select name="service" style={{ marginBottom: '1rem', width: '100%', padding: '0.75rem' }}>
                    <option>Team Training (Golden Prompt)</option><option>Agent Design</option><option>App Development</option><option>Data Analysis</option><option>Full Integration + Training</option>
                  </select>
                  <textarea name="message" placeholder="Describe your current friction..." style={{ height: '5rem', marginBottom: '1rem' }} required />
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>Request Consultation</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="container" style={{ padding: '2.5rem 0', textAlign: 'center', opacity: 0.6, fontSize: '0.875rem', borderTop: '1px solid var(--slate-100)' }}>
        © 2026 AI Integration+ | Google Certified AI Professional
      </footer>
    </div>
  );
}
