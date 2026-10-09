/* VerifyU — Rewards Partner waitlist flow (Typeform-style, no dependencies)
   page → [Join the waitlist] → one question at a time → review → WhatsApp (wa.me) with a prefilled, URL-encoded message.
   No backend: answers live in memory (mirrored to sessionStorage so an accidental close does not lose them).
   To add a CRM/API later, send `collect()` from `send()` before opening WhatsApp. */
(function () {
  'use strict';
  const d = document, w = window;
  const $ = (s, c = d) => c.querySelector(s), $$ = (s, c = d) => Array.from(c.querySelectorAll(s));
  const modal = $('#wl'); if (!modal) return;
  const form = $('[data-wl-form]', modal), stage = $('#wl-stage', modal), count = $('#wl-count', modal), fill = $('#wl-fill', modal);
  const backBtn = $('[data-wl-back]', modal), nextBtn = $('[data-wl-next]', modal), sendLink = $('[data-wl-send]', modal);
  const steps = $$('.wl-step', stage), review = $('.wl-review', stage), qSteps = steps.filter(s => s !== review);
  const total = qSteps.length, WA = form.dataset.wa || '918591685150';
  const rm = (() => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } })();
  const STORE = 'vu_wl_v1';

  /* ---------- analytics hook (no analytics product installed on the site: pushes to dataLayer if one exists, and emits a DOM event) ---------- */
  const track = (name, props = {}) => {
    try { if (Array.isArray(w.dataLayer)) w.dataLayer.push(Object.assign({ event: name }, props)); } catch (e) { /* noop */ }
    try { d.dispatchEvent(new CustomEvent('verifyu:track', { detail: { name, props } })); } catch (e) { /* noop */ }
  };
  track('partner_page_view', { page: location.pathname });

  /* ---------- state ---------- */
  const state = {};
  let idx = 0, opener = null, started = false, maxReached = 0;
  const load = () => { try { Object.assign(state, JSON.parse(sessionStorage.getItem(STORE) || '{}')); } catch (e) { /* noop */ } };
  const save = () => { try { sessionStorage.setItem(STORE, JSON.stringify(state)); } catch (e) { /* noop */ } };
  load();

  /* ---------- helpers ---------- */
  const stepInput = (s) => $('[data-wl-input]', s);
  const errBox = (s) => $('.wl-error', s);
  const showError = (s, msg) => { const e = errBox(s); if (!e) return; e.textContent = msg; e.hidden = false; const i = stepInput(s); if (i) { i.setAttribute('aria-invalid', 'true'); i.setAttribute('aria-describedby', e.id); } };
  const clearError = (s) => { const e = errBox(s); if (e) { e.hidden = true; e.textContent = ''; } const i = stepInput(s); if (i) { i.removeAttribute('aria-invalid'); i.removeAttribute('aria-describedby'); } };
  const digits = (v) => (v || '').replace(/\D/g, '');

  /* Read the current value of a step from the DOM into state */
  function collectStep(s) {
    const key = s.dataset.wlStep, type = s.dataset.type;
    if (type === 'choice') {
      const on = $('.wl-opt[aria-checked="true"]', s); const other = $('.wl-other input', s);
      state[key] = on ? (on.dataset.value === 'Other' ? (other.value.trim() ? `Other — ${other.value.trim()}` : '') : on.dataset.value) : '';
      state[key + '_raw'] = on ? on.dataset.value : ''; state[key + '_other'] = other ? other.value.trim() : '';
    } else if (type === 'tel') {
      const cc = $('[data-wl-cc]', s).value, num = stepInput(s).value.trim();
      state.phone_cc = cc; state.phone_num = num;
      state[key] = cc === 'other' ? num : (num ? `${cc} ${num}` : '');
    } else {
      state[key] = stepInput(s).value.trim();
    }
    save();
  }

  /* Write state back into a step's controls (used on open, so Back/Reopen preserve answers) */
  function hydrateStep(s) {
    const key = s.dataset.wlStep, type = s.dataset.type;
    if (type === 'choice') {
      const raw = state[key + '_raw'] || '';
      $$('.wl-opt', s).forEach(b => b.setAttribute('aria-checked', String(b.dataset.value === raw)));
      const wrap = $('[data-wl-other]', s), other = $('.wl-other input', s);
      if (wrap) wrap.hidden = raw !== 'Other'; if (other) other.value = state[key + '_other'] || '';
    } else if (type === 'tel') {
      if (state.phone_cc) $('[data-wl-cc]', s).value = state.phone_cc;
      stepInput(s).value = state.phone_num || '';
    } else if (stepInput(s)) {
      stepInput(s).value = state[key] || '';
    }
  }

  const ERRORS = { brand: 'Please enter your brand name to continue.', contact: 'Please tell us who we should contact.', city: 'Please enter your city to continue.', offer: 'Please describe the offer in a few words — e.g. 20% OFF.', details: 'A line or two about the offer helps us review it faster.' };
  function validateStep(s) {
    const type = s.dataset.type, required = s.dataset.required === '1';
    if (type === 'choice') {
      const on = $('.wl-opt[aria-checked="true"]', s);
      if (!on) return required ? 'Please choose a category to continue.' : '';
      if (on.dataset.value === 'Other' && !$('.wl-other input', s).value.trim()) return 'Please tell us your category in a few words.';
      return '';
    }
    if (type === 'tel') {
      const cc = $('[data-wl-cc]', s).value, raw = stepInput(s).value.trim(), n = digits(raw);
      if (!n) return 'Please enter your WhatsApp number to continue.';
      if (cc === '+91' && n.replace(/^0/, '').length !== 10) return 'Please enter a valid 10-digit Indian WhatsApp number.';
      if (cc === 'other' && !/^\+?\d/.test(raw)) return 'Please include the country code, e.g. +44 7…';
      if (n.length < 7 || n.length > 15) return 'Please enter a valid WhatsApp number.';
      return '';
    }
    const v = stepInput(s).value.trim();
    if (required && !v) return ERRORS[s.dataset.wlStep] || 'Please fill this in to continue.';
    if (v.length > 600) return 'Please keep this under 600 characters.';
    return '';
  }

  /* ---------- navigation ---------- */
  function show(i, dir) {
    const prev = steps[idx]; idx = i; const cur = steps[idx]; const isReview = cur === review;
    steps.forEach(s => { s.hidden = s !== cur; s.classList.remove('is-active', 'is-back'); });
    cur.classList.add('is-active'); if (dir < 0) cur.classList.add('is-back');
    modal.classList.toggle('is-review', isReview);
    backBtn.disabled = idx === 0;
    nextBtn.innerHTML = (idx === total - 1) ? 'Review <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="arrow"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>' : 'Continue <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="arrow"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';
    const n = Math.min(idx + 1, total);
    count.textContent = isReview ? 'Review' : `${n} of ${total}`;
    fill.style.width = `${(isReview ? 1 : n / total) * 100}%`;
    stage.scrollTop = 0;
    if (isReview) { renderReview(); setTimeout(() => sendLink.focus({ preventScroll: true }), rm ? 0 : 120); }
    else { const f = stepInput(cur) || $('.wl-opt[aria-checked="true"], .wl-opt', cur); if (f) setTimeout(() => { f.focus({ preventScroll: true }); if (f.select && f.value) try { f.setSelectionRange(f.value.length, f.value.length); } catch (e) { /* noop */ } }, rm ? 0 : 160); }
    if (prev && prev !== cur) clearError(prev);
  }
  function next() {
    const cur = steps[idx]; if (cur === review) return;
    const msg = validateStep(cur);
    if (msg) { showError(cur, msg); const f = stepInput(cur) || $('.wl-opt', cur); f && f.focus({ preventScroll: true }); return; }
    clearError(cur); collectStep(cur);
    track('partner_form_step_completed', { step: idx + 1, key: cur.dataset.wlStep });
    if (idx + 1 === total) track('partner_form_completed');
    show(idx + 1, 1);
  }
  function back() { if (idx === 0) return; const cur = steps[idx]; if (cur !== review) { clearError(cur); collectStep(cur); } show(idx - 1, -1); }

  /* ---------- review + WhatsApp message ---------- */
  const LABELS = { brand: 'Brand / Business', contact: 'Contact person', phone: 'WhatsApp', city: 'City', category: 'Business category', online: 'Website / Instagram', offer: 'Proposed offer', details: 'Offer details', notes: 'Additional notes' };
  const ORDER = ['brand', 'contact', 'phone', 'city', 'category', 'online', 'offer', 'details', 'notes'];
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  function renderReview() {
    const dl = $('#wl-summary', modal);
    const OPTIONAL = ['online', 'notes'];
    dl.innerHTML = ORDER.filter(k => (state[k] || '').trim() || !OPTIONAL.includes(k)).map(k => { const v = (state[k] || '').trim(); const wide = k === 'details' || k === 'notes'; return `<div class="${wide ? 'is-wide' : ''}"><dt>${LABELS[k]}</dt><dd class="${v ? '' : 'is-empty'}">${v ? esc(v) : '—'}</dd></div>`; }).join('');
    sendLink.href = buildUrl();
  }
  function buildMessage() {
    const v = (k) => (state[k] || '').trim();
    const lines = ['New VerifyU Rewards Partner Enquiry', '', 'Hi VerifyU Team,', '', 'I would like to join the VerifyU Rewards Partner Waitlist.', ''];
    const row = (label, val) => { if (val) lines.push(`${label}: ${val}`); };
    row('Brand / Business', v('brand')); row('Contact Person', v('contact')); row('WhatsApp', v('phone')); row('City', v('city')); row('Business Category', v('category')); row('Website / Instagram', v('online')); row('Proposed Offer', v('offer'));
    if (v('details')) lines.push('', 'Offer Details:', v('details'));
    if (v('notes')) lines.push('', 'Additional Notes:', v('notes'));
    lines.push('', 'I would like to know the next steps for becoming a VerifyU Rewards Partner.');
    return lines.join('\n');
  }
  const buildUrl = () => `https://wa.me/${WA}?text=${encodeURIComponent(buildMessage())}`;
  w.VerifyUWaitlist = { collect: () => Object.assign({}, state), message: buildMessage, url: buildUrl };   // for a future CRM/API hook

  /* ---------- open / close with focus management ---------- */
  let lastFocus = null;
  function open(trigger) {
    opener = trigger || null; lastFocus = d.activeElement;
    const sec = trigger && trigger.closest('section'); track('partner_join_waitlist_clicked', { source: sec ? (sec.className.match(/rp-[a-z]+/) || ['section'])[0] : 'sticky' });
    qSteps.forEach(hydrateStep);
    modal.hidden = false; d.body.classList.add('is-locked');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    // resume where the person left off (first incomplete required step), never past the review
    let start = 0; for (let i = 0; i < total; i++) { if (validateStep(qSteps[i])) { start = i; break; } start = i + 1; }
    show(Math.min(start, total), 1);
    if (!started) { started = true; track('partner_form_started'); }
  }
  function close() {
    const cur = steps[idx]; if (cur !== review) collectStep(cur);
    modal.classList.remove('is-open'); d.body.classList.remove('is-locked');
    const done = () => { modal.hidden = true; (opener || lastFocus) && (opener || lastFocus).focus && (opener || lastFocus).focus(); };
    rm ? done() : setTimeout(done, 320);
  }
  $$('[data-wl-open]').forEach(b => b.addEventListener('click', () => open(b)));
  $$('[data-wl-close]', modal).forEach(b => b.addEventListener('click', close));
  $$('[data-wl-wa]').forEach(a => a.addEventListener('click', () => track('partner_whatsapp_clicked', { kind: 'direct' })));
  backBtn.addEventListener('click', back);
  form.addEventListener('submit', e => { e.preventDefault(); next(); });
  $('[data-wl-edit]', modal).addEventListener('click', () => show(0, -1));
  sendLink.addEventListener('click', () => { sendLink.href = buildUrl(); track('partner_whatsapp_clicked', { kind: 'form' }); });

  /* keyboard: Enter continues (Shift+Enter = newline in textarea), Esc closes, Tab is trapped inside the dialog */
  modal.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Enter') {
      const t = e.target;
      if (t.tagName === 'TEXTAREA') { if (e.shiftKey) return; e.preventDefault(); next(); return; }
      if (t.tagName === 'INPUT' || t.tagName === 'SELECT') { e.preventDefault(); next(); return; }
      if (t.classList.contains('wl-opt')) { e.preventDefault(); choose(t, true); return; }
    }
    if (e.key === 'Tab') {
      const f = $$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', modal).filter(el => !el.hidden && el.offsetParent !== null);
      if (!f.length) return; const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // live: clear an error as soon as the person types
  stage.addEventListener('input', e => { const s = e.target.closest('.wl-step'); if (s) clearError(s); });

  /* ---------- choice step (radiogroup) ---------- */
  function choose(btn, andContinue) {
    const s = btn.closest('.wl-step'); $$('.wl-opt', s).forEach(b => { b.setAttribute('aria-checked', String(b === btn)); b.tabIndex = b === btn ? 0 : -1; });
    const isOther = btn.dataset.value === 'Other'; const wrap = $('[data-wl-other]', s); wrap.hidden = !isOther; clearError(s);
    if (isOther) { setTimeout(() => $('input', wrap).focus(), 30); return; }
    if (andContinue) setTimeout(next, rm ? 0 : 220);
  }
  $$('[data-wl-opts]', modal).forEach(g => {
    $$('.wl-opt', g).forEach(b => b.addEventListener('click', () => choose(b, true)));
    g.addEventListener('keydown', e => {
      const opts = $$('.wl-opt', g); const i = opts.indexOf(d.activeElement); if (i < 0) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); opts[(i + 1) % opts.length].focus(); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); opts[(i - 1 + opts.length) % opts.length].focus(); }
      if (e.key === ' ') { e.preventDefault(); choose(opts[i], false); }
      // letter shortcuts A–M
      const k = e.key.toUpperCase(); if (k.length === 1 && k >= 'A' && k <= 'Z') { const j = k.charCodeAt(0) - 65; if (opts[j]) { e.preventDefault(); opts[j].focus(); choose(opts[j], true); } }
    });
  });
  /* example chips fill the input */
  $$('[data-wl-fill]', modal).forEach(c => c.addEventListener('click', () => { const s = c.closest('.wl-step'); const i = stepInput(s); i.value = c.dataset.wlFill; clearError(s); i.focus(); }));

  /* ---------- page-level sticky CTA (mobile) ---------- */
  const sticky = $('#rp-sticky');
  if (sticky) {
    let t = false;
    const tick = () => { const y = w.scrollY; const final = $('.rp-final'); const r = final ? final.getBoundingClientRect() : null; const near = r && r.top < w.innerHeight && r.bottom > 0; const on = y > 520 && !near && modal.hidden; sticky.classList.toggle('is-visible', on); sticky.setAttribute('aria-hidden', String(!on)); t = false; };
    w.addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(tick); } }, { passive: true }); tick();
  }

  /* ---------- keep the focused control visible above the on-screen keyboard ---------- */
  if (w.visualViewport) w.visualViewport.addEventListener('resize', () => { const a = d.activeElement; if (modal.hidden || !a || !stage.contains(a)) return; setTimeout(() => a.scrollIntoView({ block: 'center', behavior: rm ? 'auto' : 'smooth' }), 60); });
})();
