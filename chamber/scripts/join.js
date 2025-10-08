// Accessible mobile menu toggle (reutilize se já tem algo parecido)
const menuBtn = document.getElementById('menuToggle');
const nav = document.getElementById('siteNav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const ex = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!ex));
    nav.classList.toggle('open');
  });
}

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Hidden timestamp when page loads (client-side)
const ts = document.getElementById('loaded');
if (ts) ts.value = new Date().toISOString();

// Modals (one per card)
document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.modal;
    const dlg = document.getElementById(id);
    if (dlg && typeof dlg.showModal === 'function') {
      dlg.showModal();
    }
  });
});

// Optional lightweight client validation message
document.getElementById('joinForm')?.addEventListener('submit', (e) => {
  const title = document.getElementById('title');
  if (title && !title.checkValidity()) {
    e.preventDefault();
    title.reportValidity();
  }
});
