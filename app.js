(() => {
  const screens = document.querySelectorAll('.screen');
  const modals = document.querySelectorAll('.modal');
  const history = ['welcome'];
 
  function show(name) {
    const target = document.querySelector(`.screen[data-screen="${name}"]`);
    if (!target) return;
    const current = document.querySelector('.screen.is-active');
    if (current === target) return;
 
    if (current) {
      current.classList.remove('is-active');
      current.classList.add('is-exit');
      setTimeout(() => current.classList.remove('is-exit'), 450);
    }
    target.classList.add('is-active');
 
    if (history[history.length - 1] !== name) history.push(name);
    if (history.length > 12) history.shift();
  }
 
  function back() {
    if (history.length < 2) return;
    history.pop();
    const prev = history[history.length - 1];
    const target = document.querySelector(`.screen[data-screen="${prev}"]`);
    const current = document.querySelector('.screen.is-active');
    if (!target || current === target) return;
    if (current) {
      current.classList.remove('is-active');
      current.classList.add('is-exit');
      setTimeout(() => current.classList.remove('is-exit'), 450);
    }
    target.classList.add('is-active');
  }
 
  function openModal(name) {
    const m = document.querySelector(`.modal[data-modal="${name}"]`);
    if (m) m.classList.add('is-open');
  }
  function closeModal(el) {
    const m = el ? el.closest('.modal') : document.querySelector('.modal.is-open');
    if (m) m.classList.remove('is-open');
  }
 
  document.addEventListener('click', (e) => {
    const stop = e.target.closest('[data-stop]');
    if (stop) e.stopPropagation();
 
    const goEl = e.target.closest('[data-go]');
    const backEl = e.target.closest('[data-back]');
    const openEl = e.target.closest('[data-open]');
    const closeEl = e.target.closest('[data-close]');
 
    if (closeEl) {
      closeModal(closeEl);
      const nextGo = closeEl.getAttribute('data-go');
      if (nextGo) setTimeout(() => show(nextGo), 200);
      return;
    }
    if (openEl) {
      openModal(openEl.getAttribute('data-open'));
      return;
    }
    if (backEl) {
      back();
      return;
    }
    if (goEl) {
      show(goEl.getAttribute('data-go'));
    }
  });
 
  // Toggle behavior for multi/single choice pill groups
  document.querySelectorAll('[data-group]').forEach(group => {
    const single = group.dataset.group === 'when' || group.dataset.group === 'where';
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn || !group.contains(btn)) return;
      if (single) {
        group.querySelectorAll('.is-active').forEach(el => el.classList.remove('is-active'));
        btn.classList.add('is-active');
      } else {
        btn.classList.toggle('is-active');
      }
    });
  });
 
  // Pill rows inside filters: single-active per row (except the breed "Todas" logic)
  document.querySelectorAll('.sheet__section .pill-row').forEach(row => {
    row.addEventListener('click', (e) => {
      const btn = e.target.closest('.pill');
      if (!btn || !row.contains(btn)) return;
      btn.classList.toggle('is-active');
    });
  });
 
  // Explore pill-row (Cerca/Popular/Nuevo) — single select, but "+ Filtros" opens modal
  const exploreHead = document.querySelector('.explore__head .pill-row');
  if (exploreHead) {
    exploreHead.addEventListener('click', (e) => {
      const btn = e.target.closest('.pill');
      if (!btn || btn.hasAttribute('data-open')) return;
      exploreHead.querySelectorAll('.pill.is-active').forEach(el => el.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  }
})();
