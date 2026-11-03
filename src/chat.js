// The chat assistant. Loaded only when someone taps the chat button, so it never slows the page down.
const API = 'https://watch.aii.coach/chat';
const KEY = 'aii-chat';

const css = `
.chat{position:fixed;z-index:60;right:16px;bottom:16px;width:min(390px,calc(100vw - 32px));height:min(600px,calc(100dvh - 32px));display:flex;flex-direction:column;background:var(--paper);color:var(--ink);border:1px solid var(--ink);box-shadow:0 18px 60px rgba(0,0,0,.22);font-family:var(--sans)}
@media (max-width:520px){.chat{inset:0;width:100%;height:100dvh;border:0}}
.chat-head{display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:1px solid var(--ink);background:var(--ink);color:var(--paper)}
.chat-head img{width:34px;height:34px;border-radius:50%;object-fit:cover;flex:none}
.chat-head b{display:block;font-size:15px}
.chat-head small{display:block;font:12px var(--mono);color:#cfcdc6}
.chat-x{margin-left:auto;background:none;border:0;color:var(--paper);font-size:24px;line-height:1;width:40px;height:40px;cursor:pointer}
.chat-log{flex:1;overflow-y:auto;padding:14px 12px;display:flex;flex-direction:column;gap:10px;overscroll-behavior:contain}
.msg-a,.msg-v{max-width:86%;padding:9px 12px;font-size:15px;line-height:1.45;white-space:pre-wrap;word-wrap:break-word}
.msg-a{align-self:flex-start;background:#fff;border:1px solid #d9d7d0}
.msg-v{align-self:flex-end;background:var(--ink);color:var(--paper)}
.msg-a a{color:var(--accent)}
.chat-typing{align-self:flex-start;font:13px var(--mono);color:var(--ink-3)}
.chat-sugg{display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 8px}
.chat-sugg button{min-height:36px;padding:6px 12px;border:1px solid var(--ink);background:transparent;color:var(--ink);font:500 14px var(--sans);cursor:pointer}
.chat-sugg button:hover{background:var(--ink);color:var(--paper)}
.chat-form{display:flex;gap:8px;padding:10px 12px;border-top:1px solid var(--ink)}
.chat-form textarea{flex:1;resize:none;min-height:44px;max-height:120px;padding:10px;border:1px solid var(--ink);background:#fff;color:var(--ink);font:16px/1.35 var(--sans)}
.chat-form button{min-width:64px;border:0;background:var(--accent);color:#fff;font:600 15px var(--sans);cursor:pointer}
.chat-form button:disabled{opacity:.5;cursor:default}
.chat-note{margin:0;padding:0 12px 10px;font:11px/1.4 var(--mono);color:var(--ink-3)}
.chat-book{align-self:stretch;border:1px solid var(--ink);background:#fff}
.chat-book p{margin:0;padding:8px 10px;font:600 14px var(--sans);border-bottom:1px solid #d9d7d0;display:flex;justify-content:space-between;gap:8px}
.chat-book p a{font:500 13px var(--sans);color:var(--accent)}
.chat-book iframe{display:block;width:100%;height:520px;border:0}
`;

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// Plain text in, with bare links and emails made clickable.
const linkify = (s) => esc(s)
  .replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
  .replace(/\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/gi, '<a href="mailto:$1">$1</a>');

const load = () => { try { return JSON.parse(sessionStorage.getItem(KEY) || 'null') || { id: null, turns: [] }; } catch { return { id: null, turns: [] }; } };
const save = (s) => { try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch {} };

let root, log, sugg, input, sendBtn, state, busy = false, opener;

function bubble(role, text) {
  const d = document.createElement('div');
  d.className = role === 'visitor' ? 'msg-v' : 'msg-a';
  d.innerHTML = linkify(text);
  log.appendChild(d);
  log.scrollTop = log.scrollHeight;
}

function booking(url) {
  const d = document.createElement('div');
  d.className = 'chat-book';
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
    b.onclick = () => send(s);
    sugg.appendChild(b);
  }
}

async function post(path, body) {
  const r = await fetch(API + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'Something went wrong');
  return j;
}

async function send(text) {
  text = String(text || '').trim();
  if (!text || busy) return;
  busy = true; sendBtn.disabled = true; suggestions([]);
  bubble('visitor', text);
  state.turns.push({ role: 'visitor', text }); save(state);
  input.value = '';
  const typing = document.createElement('div');
  typing.className = 'chat-typing'; typing.textContent = 'typing…';
  log.appendChild(typing); log.scrollTop = log.scrollHeight;
  try {
    const r = await post('/message', { sessionId: state.id, message: text, page: location.pathname });
    state.id = r.sessionId;
    typing.remove();
    bubble('assistant', r.reply);
    state.turns.push({ role: 'assistant', text: r.reply });
    if (r.booking?.url) { booking(r.booking.url); state.booking = r.booking.url; }
    save(state);
    suggestions(r.suggestions);
  } catch (e) {
    typing.remove();
    bubble('assistant', `${e.message}. You can always email Sky at sky@aii.coach.`);
  } finally {
    busy = false; sendBtn.disabled = false; input.focus();
  }
}

function build() {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  root = document.createElement('div');
  root.className = 'chat';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-label', "Chat with Sky's assistant");
  root.innerHTML = `
    <div class="chat-head"><img src="/sky.webp" width="34" height="34" alt="Sky Madsen"><div><b>Sky's assistant</b><small>AI · Sky reads every chat</small></div><button class="chat-x" type="button" aria-label="Close chat">×</button></div>
    <div class="chat-log" aria-live="polite"></div>
    <div class="chat-sugg"></div>
    <form class="chat-form"><label for="chat-in" class="sr-only" style="position:absolute;left:-9999px">Your message</label><textarea id="chat-in" rows="1" maxlength="800" placeholder="Type your question…"></textarea><button type="submit">Send</button></form>
    <p class="chat-note">AI assistant — answers can be imperfect; Sky follows up personally. Please don't share passwords or payment details.</p>`;
  document.body.appendChild(root);
  log = root.querySelector('.chat-log');
  sugg = root.querySelector('.chat-sugg');
  input = root.querySelector('textarea');
  sendBtn = root.querySelector('.chat-form button');
  root.querySelector('.chat-x').onclick = close;
  root.querySelector('form').onsubmit = (e) => { e.preventDefault(); send(input.value); };
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input.value); } });
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  // Cal.com tells the page when a booking is made.
  addEventListener('message', (e) => {
    if (!/(^|\.)cal\.com$/.test(new URL(e.origin).hostname)) return;
    const t = String(e.data?.type || e.data?.method || '');
    if (/bookingSuccessful/i.test(t) && state.id && !state.booked) {
      state.booked = true; save(state);
      post('/booked', { sessionId: state.id }).catch(() => {});
      bubble('assistant', "You're booked. Sky will see you then — a calendar invite is on its way to your inbox.");
    }
  });

  state = load();
  if (state.turns.length) {
    for (const t of state.turns) bubble(t.role, t.text);
    if (state.booking && !state.booked) booking(state.booking);
  } else {
    post('/start', {}).then((r) => {
      bubble('assistant', r.greeting);
      state.turns.push({ role: 'assistant', text: r.greeting }); save(state);
      suggestions(r.suggestions);
    }).catch(() => bubble('assistant', "Hi, I'm Sky's AI assistant. What can I help you with? (If I'm slow to answer, email sky@aii.coach.)"));
  }
}

export function open(from) {
  opener = from || document.activeElement;
  if (!root) build();
  root.hidden = false;
  document.querySelector('.chat-launch')?.setAttribute('aria-expanded', 'true');
  setTimeout(() => input.focus(), 30);
}

function close() {
  root.hidden = true;
  document.querySelector('.chat-launch')?.setAttribute('aria-expanded', 'false');
  opener?.focus?.();
}
