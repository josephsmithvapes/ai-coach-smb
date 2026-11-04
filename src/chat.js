// The chat assistant, rendered inside the fake terminal on the page. This file downloads only when someone
// uses the terminal (or already has a conversation going), so it never slows the page down.
const API = 'https://watch.aii.coach/chat';
const KEY = 'aii-chat';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// Plain text in, with bare links and emails made clickable.
const linkify = (s) => esc(s)
  .replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
  .replace(/\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/gi, '<a href="mailto:$1">$1</a>');

const load = () => { try { return JSON.parse(sessionStorage.getItem(KEY) || 'null') || { id: null, turns: [] }; } catch { return { id: null, turns: [] }; } };
const save = (s) => { try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch {} };

let term, log, sugg, input, state, busy = false;

function line(role, text) {
  const p = document.createElement('p');
  p.className = role === 'visitor' ? 't-v' : 't-a';
  p.innerHTML = `<b>${role === 'visitor' ? 'you' : 'aii'} ›</b> ${linkify(text)}`;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
  return p;
}

function booking(url) {
  const d = document.createElement('div');
  d.className = 'term-book';
  d.innerHTML = `<p>Pick a time for your free call <a href="${esc(url.replace('embed=true', 'embed=false'))}" target="_blank" rel="noopener">Open full page</a></p><iframe title="Book a call with Sky" src="${esc(url)}" loading="lazy"></iframe>`;
  log.appendChild(d);
  log.scrollTop = log.scrollHeight;
}

function suggestions(list) {
  sugg.innerHTML = '';
  for (const s of list || []) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = s;
    sugg.appendChild(b);
  }
}

async function post(path, body) {
  const r = await fetch(API + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'Something went wrong');
  return j;
}

export async function send(text) {
  text = String(text || '').trim();
  if (!text || busy) return;
  busy = true; suggestions([]);
  line('visitor', text);
  state.turns.push({ role: 'visitor', text }); save(state);
  input.value = '';
  input.disabled = true;
  const typing = document.createElement('p');
  typing.className = 't-a t-dim'; typing.textContent = 'aii › …';
  log.appendChild(typing); log.scrollTop = log.scrollHeight;
  try {
    const r = await post('/message', { sessionId: state.id, message: text, page: location.pathname });
    state.id = r.sessionId;
    typing.remove();
    line('assistant', r.reply);
    state.turns.push({ role: 'assistant', text: r.reply });
    if (r.booking?.url) { booking(r.booking.url); state.booking = r.booking.url; }
    save(state);
    suggestions(r.suggestions);
  } catch (e) {
    typing.remove();
    line('assistant', `${e.message}. You can always email Sky at sky@aii.coach.`);
  } finally {
    busy = false; input.disabled = false; input.focus({ preventScroll: true });
  }
}

export function init(el) {
  if (term) return;
  term = el;
  log = term.querySelector('.term-log');
  sugg = term.querySelector('.term-sugg');
  input = term.querySelector('input');
  state = load();
  if (state.turns.length) {
    log.querySelectorAll('p').forEach((p) => p.remove());
    for (const t of state.turns) line(t.role, t.text);
    sugg.innerHTML = '';
    if (state.booking && !state.booked) booking(state.booking);
  }
  // Cal.com tells the page when a booking is made.
  addEventListener('message', (e) => {
    let host = '';
    try { host = new URL(e.origin).hostname; } catch { return; }
    if (!/(^|\.)cal\.com$/.test(host)) return;
    const t = String(e.data?.type || e.data?.method || '');
    if (/bookingSuccessful/i.test(t) && state.id && !state.booked) {
      state.booked = true; save(state);
      post('/booked', { sessionId: state.id }).catch(() => {});
      line('assistant', "You're booked. Sky will see you then. A calendar invite is on its way to your inbox.");
    }
  });
}
