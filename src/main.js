// The only script on the page: sends the contact form to sky@aii.coach.
const form = document.getElementById('contact-form');
const ok = document.getElementById('form-ok');
const err = document.getElementById('form-err');
const ENDPOINT = 'https://formsubmit.co/ajax/sky@aii.coach';

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const button = form.querySelector('button[type=submit]');
  err.hidden = true;
  if (data.get('_honey')) { form.hidden = true; ok.hidden = false; return; } // a bot filled the hidden field
  button.disabled = true;
  button.textContent = 'Sending…';
  try {
    const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    const j = await res.json().catch(() => ({}));
    if (!res.ok || String(j.success) === 'false') throw new Error(j.message || 'failed');
    form.hidden = true;
    ok.hidden = false;
  } catch {
    err.hidden = false;
    button.disabled = false;
    button.textContent = 'Send';
  }
});

// Decorative glow motion starts after the page has settled, so it never competes with loading.
const live = () => document.documentElement.classList.add('live');
['pointermove', 'touchstart', 'scroll', 'keydown'].forEach((ev) => addEventListener(ev, live, { once: true, passive: true }));
addEventListener('load', () => setTimeout(live, 6000));

// Chat assistant: the terminal is plain HTML; the chat code downloads only when someone uses it
// (or already has a conversation going this session).
const term = document.getElementById('terminal');
if (term) {
  let mod;
  const ready = () => (mod ||= import('./chat.js').then((m) => { m.init(term); return m; }));
  term.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = term.querySelector('input');
    const v = input.value.trim();
    if (v) ready().then((m) => m.send(v));
  });
  term.addEventListener('click', (e) => {
    const b = e.target.closest('.term-sugg button');
    if (b) ready().then((m) => m.send(b.textContent));
  });
  term.addEventListener('focusin', () => ready(), { once: true });
  try { if (sessionStorage.getItem('aii-chat')) addEventListener('load', () => setTimeout(ready, 1500)); } catch {}

  // The floating button just takes people to the terminal, and steps aside while it's on screen.
  const btn = document.querySelector('.chat-launch');
  btn?.addEventListener('click', () => {
    term.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => term.querySelector('input').focus({ preventScroll: true }), 400);
  });
  if (btn && 'IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => { btn.hidden = en.isIntersecting; }, { threshold: 0.3 }).observe(term);
  }
}
