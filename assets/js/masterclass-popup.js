(() => {
  const modal = document.getElementById('mc-announcement');
  if (!modal || typeof modal.showModal !== 'function') return;
  let previousFocus;
  const close = () => { modal.close(); if (previousFocus?.focus) previousFocus.focus(); };
  modal.querySelector('.mc-modal-close').addEventListener('click', close);
  modal.addEventListener('click', event => { if (event.target === modal) { const r = modal.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close(); } });
  modal.addEventListener('close', () => document.documentElement.classList.remove('mc-modal-open'));
  previousFocus = document.activeElement;
  modal.showModal();
  document.documentElement.classList.add('mc-modal-open');
})();
