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
