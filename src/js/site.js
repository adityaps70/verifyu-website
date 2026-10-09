/* VerifyU — site behaviour & motion engine (no dependencies)
   Motion language: spring-like easing, transform/opacity only, reduced-motion aware. */
(function () {
  'use strict';
  const d = document, w = window, html = d.documentElement;
  const rm = (() => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } })();
  const $ = (s, c = d) => c.querySelector(s), $$ = (s, c = d) => Array.from(c.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const isFine = matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- Header: compact pill on scroll, hide on fast scroll-down ---------- */
  const header = $('#header');
  { const main = $('main'); const first = main && main.firstElementChild; if (first && (first.classList.contains('is-dark') || first.classList.contains('on-dark'))) header.classList.add('is-on-dark'); }
  let lastY = w.scrollY, ticking = false;
  function onScroll() {
    const y = w.scrollY;
    header.classList.toggle('is-compact', y > 24);
    if (y > 420 && y - lastY > 6 && !d.body.classList.contains('is-locked')) header.classList.add('is-hidden');
    else if (y - lastY < -2 || y < 420) header.classList.remove('is-hidden');
    lastY = y;
    const sc = $('#sticky-cta');
    if (sc) { const show = y > 560 && !nearFinal(); sc.classList.toggle('is-visible', show); sc.setAttribute('aria-hidden', String(!show)); }
  }
  function nearFinal() { const f = $('#get-verifyu'); if (!f) return false; const r = f.getBoundingClientRect(); return r.top < w.innerHeight && r.bottom > 0; }
  w.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
  onScroll();

  /* ---------- Active navigation ---------- */
  const navKey = d.body.dataset.nav || (($('div[data-page]') || {}).dataset || {}).nav;
  if (navKey) $$('.nav-link[data-nav]').forEach(a => { if (a.dataset.nav === navKey) a.setAttribute('aria-current', 'page'); });
  $$('.nav-item[data-menu]').forEach(item => {
    const btn = $('button', item);
    const open = (v) => { item.classList.toggle('is-open', v); btn.setAttribute('aria-expanded', String(v)); };
    let t;
    item.addEventListener('mouseenter', () => { if (isFine) { clearTimeout(t); open(true); } });
    item.addEventListener('mouseleave', () => { if (isFine) t = setTimeout(() => open(false), 120); });
    btn.addEventListener('click', () => { const v = !item.classList.contains('is-open'); $$('.nav-item.is-open').forEach(o => { if (o !== item) { o.classList.remove('is-open'); $('button', o).setAttribute('aria-expanded', 'false'); } }); open(v); });
    item.addEventListener('keydown', e => { if (e.key === 'Escape') { open(false); btn.focus(); } });
    item.addEventListener('focusout', e => { if (!item.contains(e.relatedTarget)) open(false); });
  });
  d.addEventListener('click', e => { if (!e.target.closest('.nav-item')) $$('.nav-item.is-open').forEach(o => { o.classList.remove('is-open'); $('button', o).setAttribute('aria-expanded', 'false'); }); });

  /* ---------- Mobile sheet ---------- */
  const toggle = $('[data-toggle]'), sheet = $('#sheet');
  if (toggle && sheet) {
    const menuIcon = toggle.innerHTML;
    const closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>';
    const setOpen = (v) => { sheet.classList.toggle('is-open', v); d.body.classList.toggle('is-locked', v); toggle.setAttribute('aria-expanded', String(v)); toggle.setAttribute('aria-label', v ? 'Close menu' : 'Open menu'); toggle.innerHTML = v ? closeIcon : menuIcon; if (v) header.classList.remove('is-hidden'); };
    toggle.addEventListener('click', () => setOpen(!sheet.classList.contains('is-open')));
    $$('[data-sheet-group] > button', sheet).forEach(b => b.addEventListener('click', () => { const g = b.parentElement; const v = !g.classList.contains('is-open'); g.classList.toggle('is-open', v); b.setAttribute('aria-expanded', String(v)); }));
    $$('a', sheet).forEach(a => a.addEventListener('click', () => setOpen(false)));
    d.addEventListener('keydown', e => { if (e.key === 'Escape' && sheet.classList.contains('is-open')) { setOpen(false); toggle.focus(); } });
    w.addEventListener('resize', () => { if (w.innerWidth > 1024 && sheet.classList.contains('is-open')) setOpen(false); });
  }

  /* ---------- "Get VerifyU" links: smooth-scroll to final CTA on the same page ---------- */
  $$('[data-get]').forEach(a => a.addEventListener('click', e => {
    const target = $('#get-verifyu'); if (!target) return; e.preventDefault(); if (sheet && sheet.classList.contains('is-open')) { sheet.classList.remove('is-open'); d.body.classList.remove('is-locked'); } target.scrollIntoView({ behavior: rm ? 'auto' : 'smooth', block: 'start' });
  }));

  /* ---------- Reveal on view ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  $$('[data-reveal],[data-stagger],.mask-group,.ring').forEach(el => io.observe(el));

  /* ---------- Counters ---------- */
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return; cio.unobserve(en.target);
      const el = en.target, to = parseFloat(el.dataset.count), dur = parseFloat(el.dataset.dur || 1600), fmt = el.dataset.format;
      if (rm) { el.textContent = format(to); el.dispatchEvent(new CustomEvent('countdone', { bubbles: true })); return; }
      const t0 = performance.now();
      const tick = (t) => { const p = clamp((t - t0) / dur, 0, 1); el.textContent = format(Math.round(to * ease(p))); if (p < 1) requestAnimationFrame(tick); else el.dispatchEvent(new CustomEvent('countdone', { bubbles: true })); };
      requestAnimationFrame(tick);
      function format(n) { return fmt === 'plain' ? String(n) : n.toLocaleString('en-IN'); }
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => { el.textContent = '0'; cio.observe(el); });

  /* ---------- Accordions ---------- */
  $$('[data-accordion]').forEach(acc => {
    $$('.acc-btn', acc).forEach(btn => btn.addEventListener('click', () => {
      const item = btn.closest('.acc-item'); const v = !item.classList.contains('is-open');
      if (acc.dataset.accordion === 'single') $$('.acc-item.is-open', acc).forEach(o => { if (o !== item) { o.classList.remove('is-open'); $('.acc-btn', o).setAttribute('aria-expanded', 'false'); } });
      item.classList.toggle('is-open', v); btn.setAttribute('aria-expanded', String(v));
    }));
  });

  /* ---------- Tabs with animated indicator ---------- */
  $$('[data-tabs]').forEach(tabs => {
    const btns = $$('[role="tab"]', tabs); const ind = $('.ind', tabs);
    const panels = btns.map(b => d.getElementById(b.getAttribute('aria-controls'))).filter(Boolean);
    const activate = (b, focus) => {
      btns.forEach(x => { const on = x === b; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; });
      panels.forEach(p => { p.hidden = p.id !== b.getAttribute('aria-controls'); });
      if (ind) { ind.style.width = b.offsetWidth + 'px'; ind.style.transform = `translateX(${b.offsetLeft}px)`; }
      if (focus) b.focus();
      tabs.dispatchEvent(new CustomEvent('tabchange', { detail: { id: b.getAttribute('aria-controls'), index: btns.indexOf(b) }, bubbles: true }));
    };
    btns.forEach((b, i) => {
      b.addEventListener('click', () => activate(b));
      b.addEventListener('keydown', e => { let j = null; if (e.key === 'ArrowRight') j = (i + 1) % btns.length; if (e.key === 'ArrowLeft') j = (i - 1 + btns.length) % btns.length; if (e.key === 'Home') j = 0; if (e.key === 'End') j = btns.length - 1; if (j !== null) { e.preventDefault(); activate(btns[j], true); } });
    });
    const init = btns.find(b => b.getAttribute('aria-selected') === 'true') || btns[0];
    if (init) { ind && (ind.style.transition = 'none'); activate(init); requestAnimationFrame(() => { ind && (ind.style.transition = ''); }); }
    w.addEventListener('resize', () => { const cur = btns.find(b => b.getAttribute('aria-selected') === 'true'); if (cur && ind) { ind.style.transition = 'none'; ind.style.width = cur.offsetWidth + 'px'; ind.style.transform = `translateX(${cur.offsetLeft}px)`; requestAnimationFrame(() => ind.style.transition = ''); } });
  });

  /* ---------- Rails (scroll-snap carousels) ---------- */
  $$('[data-rail]').forEach(rail => {
    const id = rail.dataset.rail;
    const prev = $(`[data-rail-prev="${id}"]`), next = $(`[data-rail-next="${id}"]`);
    const step = () => { const first = rail.children[0]; return first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap || getComputedStyle(rail).gap || 20) : rail.clientWidth * .8; };
    const update = () => { if (prev) prev.disabled = rail.scrollLeft <= 4; if (next) next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4; };
    prev && prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: rm ? 'auto' : 'smooth' }));
    next && next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: rm ? 'auto' : 'smooth' }));
    rail.addEventListener('scroll', update, { passive: true }); w.addEventListener('resize', update); update();
    rail.setAttribute('tabindex', '0');
    rail.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); rail.scrollBy({ left: step(), behavior: 'smooth' }); } if (e.key === 'ArrowLeft') { e.preventDefault(); rail.scrollBy({ left: -step(), behavior: 'smooth' }); } });
    // Desktop pointer drag with inertia
    if (isFine) {
      let down = false, sx = 0, sl = 0, vx = 0, lx = 0, lt = 0, raf;
      rail.addEventListener('pointerdown', e => { down = true; sx = e.clientX; sl = rail.scrollLeft; lx = e.clientX; lt = performance.now(); vx = 0; rail.style.scrollSnapType = 'none'; cancelAnimationFrame(raf); rail.setPointerCapture(e.pointerId); rail.classList.add('is-dragging'); });
      rail.addEventListener('pointermove', e => { if (!down) return; const now = performance.now(); vx = (e.clientX - lx) / Math.max(1, now - lt); lx = e.clientX; lt = now; rail.scrollLeft = sl - (e.clientX - sx); });
      const up = () => { if (!down) return; down = false; rail.classList.remove('is-dragging'); let v = vx * 16; const fling = () => { rail.scrollLeft -= v; v *= 0.92; if (Math.abs(v) > 0.5) raf = requestAnimationFrame(fling); else { rail.style.scrollSnapType = ''; } }; fling(); };
      rail.addEventListener('pointerup', up); rail.addEventListener('pointercancel', up);
      rail.addEventListener('click', e => { if (Math.abs(lx - sx) > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
    }
  });

  /* ---------- Scroll-linked progress (sticky stories) ---------- */
  const stories = $$('[data-story]');
  const storyState = new Map();
  function storyTick() {
    const vh = w.innerHeight;
    stories.forEach(s => {
      const r = s.getBoundingClientRect(); const total = r.height - vh; if (total <= 0) return;
      const p = clamp(-r.top / total, 0, 1);
      const steps = parseInt(s.dataset.steps || '1', 10);
      const idx = clamp(Math.floor(p * steps), 0, steps - 1);
      const st = storyState.get(s) || {};
      if (st.p !== p) { s.style.setProperty('--p', p.toFixed(4)); st.p = p; }
      if (st.idx !== idx) { st.idx = idx; s.dataset.step = idx; $$('[data-step-item]', s).forEach(el => el.classList.toggle('is-active', parseInt(el.dataset.stepItem, 10) === idx)); $$('[data-step-panel]', s).forEach(el => el.classList.toggle('is-active', parseInt(el.dataset.stepPanel, 10) === idx)); s.dispatchEvent(new CustomEvent('storystep', { detail: { idx, p } })); }
      storyState.set(s, st);
    });
  }
  if (stories.length) { w.addEventListener('scroll', () => requestAnimationFrame(storyTick), { passive: true }); w.addEventListener('resize', storyTick); storyTick(); }

  /* ---------- Hero stage: staggered spring entrance, pointer tilt, scroll parallax ---------- */
  const stage = $('[data-hero-stage]');
  if (stage) {
    const phones = { c: $('[data-hero-phone="c"] .device', stage), l: $('[data-hero-phone="l"] .device', stage), r: $('[data-hero-phone="r"] .device', stage) };
    const chips = $$('.hero-chip', stage);
    requestAnimationFrame(() => requestAnimationFrame(() => stage.classList.add('is-ready')));
    if (!rm) {
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = null, sy = 0;
      const render = () => {
        cx = lerp(cx, tx, 0.08); cy = lerp(cy, ty, 0.08);
        const s = clamp(sy / 600, 0, 1);
        if (phones.c) phones.c.style.transform = `rotateY(${(cx * 6).toFixed(2)}deg) rotateX(${(-cy * 4).toFixed(2)}deg) translateY(${(s * 40).toFixed(1)}px)`;
        if (phones.l) phones.l.style.transform = `translate(${(cx * -14).toFixed(1)}px,${(s * 70 - cy * 8).toFixed(1)}px)`;
        if (phones.r) phones.r.style.transform = `translate(${(cx * 14).toFixed(1)}px,${(s * 70 + cy * 8).toFixed(1)}px)`;
        chips.forEach((ch, i) => { ch.style.transform = `translate(${(cx * (10 + i * 6)).toFixed(1)}px,${(-s * (30 + i * 20) + cy * 6).toFixed(1)}px)`; });
        if (Math.abs(cx - tx) > 0.001 || Math.abs(cy - ty) > 0.001) raf = requestAnimationFrame(render); else raf = null;
      };
      const kick = () => { if (!raf) raf = requestAnimationFrame(render); };
      const wrap = stage.closest('section');
      if (isFine) wrap.addEventListener('pointermove', e => { const r = wrap.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - 0.5) * 2; ty = ((e.clientY - r.top) / r.height - 0.5) * 2; kick(); });
      wrap.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
      w.addEventListener('scroll', () => { sy = w.scrollY; kick(); }, { passive: true });
    }
  }

  /* ---------- Marquee: duplicate content once for a seamless loop ---------- */
  $$('.marquee-track').forEach(track => {
    if (track.dataset.cloned) return; track.dataset.cloned = '1';
    const items = Array.from(track.children); items.forEach(n => { const c = n.cloneNode(true); c.setAttribute('aria-hidden', 'true'); c.querySelectorAll && c.querySelectorAll('a,button').forEach(x => x.tabIndex = -1); track.appendChild(c); });
  });

  /* ---------- Step-driven demos (safety rail translate on desktop) ---------- */
  const rail = $('[data-rail-story]');
  if (rail && !rm) {
    const track = $('.rail', rail);
    const update = () => {
      if (w.innerWidth < 1025) { track.style.transform = ''; return; }
      const r = rail.getBoundingClientRect(); const total = r.height - w.innerHeight; if (total <= 0) return;
      const p = clamp(-r.top / total, 0, 1);
      const max = track.scrollWidth - track.clientWidth;
      track.style.transform = `translate3d(${(-p * max).toFixed(1)}px,0,0)`;
    };
    w.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true }); w.addEventListener('resize', update); update();
  }

  /* ---------- Switch sets (phone state selectors with auto-cycle while in view) ---------- */
  $$('[data-switch]').forEach(root => {
    const btns = $$('[data-switch-btn]', root), panels = $$('[data-switch-panel]', root);
    let i = 0, timer = null, paused = false;
    const show = (n) => { i = n; btns.forEach(b => { const on = parseInt(b.dataset.switchBtn, 10) === n; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', String(on)); }); panels.forEach(p => p.classList.toggle('is-active', parseInt(p.dataset.switchPanel, 10) === n)); };
    const start = () => { if (rm || timer || paused) return; timer = setInterval(() => show((i + 1) % btns.length), parseInt(root.dataset.switchInterval || 3600, 10)); };
    const stop = () => { clearInterval(timer); timer = null; };
    btns.forEach(b => { b.addEventListener('click', () => { show(parseInt(b.dataset.switchBtn, 10)); paused = true; stop(); }); b.addEventListener('mouseenter', () => { if (isFine) { show(parseInt(b.dataset.switchBtn, 10)); stop(); } }); b.addEventListener('mouseleave', () => { if (isFine && !paused) start(); }); });
    new IntersectionObserver(es => es.forEach(en => en.isIntersecting ? start() : stop()), { threshold: 0.3 }).observe(root);
    // deep links: /page#key selects the matching tab (data-key) and stops auto-cycling
    const byHash = () => { const k = decodeURIComponent(location.hash.slice(1)); const b = k && btns.find(x => x.dataset.key === k); if (b) { show(parseInt(b.dataset.switchBtn, 10)); paused = true; stop(); root.scrollIntoView({ block: 'start', behavior: rm ? 'auto' : 'smooth' }); } };
    byHash(); w.addEventListener('hashchange', byHash);
  });

  /* ---------- Coins accumulation after counters ---------- */
  d.addEventListener('countdone', e => { const t = e.target.closest('[data-coins-after]'); if (t) { const c = $(t.dataset.coinsAfter); if (c) setTimeout(() => c.classList.add('is-in'), 200); } });

  /* ---------- Image crossfade sets ---------- */
  $$('[data-crossfade]').forEach(set => {
    const imgs = $$('img', set); let i = 0; if (imgs.length < 2 || rm) return;
    setInterval(() => { imgs[i].classList.remove('is-active'); i = (i + 1) % imgs.length; imgs[i].classList.add('is-active'); }, parseInt(set.dataset.crossfade || 3600, 10));
  });

  /* ---------- Video with chapters ---------- */
  const video = $('[data-video]');
  if (video) {
    $$('[data-seek]').forEach(b => b.addEventListener('click', () => { video.currentTime = parseFloat(b.dataset.seek); video.play().catch(() => {}); $$('[data-seek]').forEach(x => x.classList.toggle('is-active', x === b)); }));
    video.addEventListener('timeupdate', () => { const t = video.currentTime; let cur = null; $$('[data-seek]').forEach(b => { if (t >= parseFloat(b.dataset.seek)) cur = b; }); $$('[data-seek]').forEach(x => x.classList.toggle('is-active', x === cur)); });
    $$('[data-video-play]').forEach(b => b.addEventListener('click', () => { video.play().catch(() => {}); b.closest('[data-video-wrap]') && b.closest('[data-video-wrap]').classList.add('is-playing'); }));
  }

  /* ---------- Help centre search ---------- */
  const search = $('[data-faq-search]');
  if (search) {
    const items = $$('[data-faq-item]'); const empty = $('[data-faq-empty]');
    const filterBy = () => { const q = search.value.trim().toLowerCase(); const cat = ($('[data-faq-cat][aria-selected="true"]') || {}).dataset?.faqCat || 'all'; let n = 0; items.forEach(it => { const ok = (cat === 'all' || it.dataset.cat === cat) && (!q || it.textContent.toLowerCase().includes(q)); it.hidden = !ok; if (ok) n++; }); if (empty) empty.hidden = n > 0; $$('[data-faq-count]').forEach(c => c.textContent = n); };
    search.addEventListener('input', filterBy);
    $$('[data-faq-cat]').forEach(b => b.addEventListener('click', () => { $$('[data-faq-cat]').forEach(x => x.setAttribute('aria-selected', String(x === b))); filterBy(); }));
    $$('[data-faq-topic]').forEach(b => b.addEventListener('click', () => { search.value = b.dataset.faqTopic; filterBy(); search.focus(); }));
    filterBy();
    $$('[data-helpful]').forEach(b => b.addEventListener('click', () => { const p = b.parentElement; p.innerHTML = '<span class="small">Thanks for the feedback.</span>'; }));
    $$('[data-share]').forEach(b => b.addEventListener('click', async () => { const url = location.origin + location.pathname + '#' + b.dataset.share; try { await navigator.clipboard.writeText(url); b.textContent = 'Link copied'; } catch (e) { location.hash = b.dataset.share; } }));
    if (location.hash) { const it = $(location.hash); if (it && it.classList.contains('acc-item')) { it.classList.add('is-open'); $('.acc-btn', it).setAttribute('aria-expanded', 'true'); } }
  }

  /* ---------- Legal TOC highlight ---------- */
  const toc = $('.toc');
  if (toc) {
    const links = $$('a', toc); const secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
    const tio = new IntersectionObserver(es => { es.forEach(en => { if (en.isIntersecting) links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id)); }); }, { rootMargin: '-20% 0px -70% 0px' });
    secs.forEach(s => tio.observe(s));
  }

  /* ---------- Pricing toggle ---------- */
  $$('[data-price-toggle]').forEach(t => t.addEventListener('tabchange', e => { const yearly = e.detail.index === 1; $$('[data-price]').forEach(p => { p.textContent = yearly ? p.dataset.yearly : p.dataset.monthly; }); $$('[data-price-period]').forEach(p => { p.textContent = yearly ? '/ year' : '/ month'; }); $$('[data-price-save]').forEach(p => { p.hidden = !yearly; }); }));

  /* ---------- Organisation track switcher ---------- */
  $$('[data-tracks]').forEach(root => {
    const btns = $$('[data-track]', root); const panels = $$('[data-track-panel]', root);
    const show = (k) => { btns.forEach(b => { const on = b.dataset.track === k; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', String(on)); }); panels.forEach(p => { p.hidden = p.dataset.trackPanel !== k; }); };
    btns.forEach(b => b.addEventListener('click', () => show(b.dataset.track)));
    show((btns[0] || {}).dataset?.track);
  });

  /* ---------- Copy year / small utils ---------- */
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
