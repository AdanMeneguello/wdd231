// Menu toggle (mobile)
// Mobile menu toggle
const toggleBtn = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');

function setMenu(open){
  toggleBtn?.setAttribute('aria-expanded', String(open));
  nav.hidden = !open;
  nav.classList.toggle('open', open);
}

if (toggleBtn && nav) {
  // estado inicial (mobile: fechado; desktop: JS ajusta no resize)
  setMenu(false);

  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    setMenu(isOpen);
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    const clickInside = nav.contains(e.target) || toggleBtn.contains(e.target);
    if (!clickInside) setMenu(false);
  });

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  // Garante estado correto ao mudar de largura
  const syncOnResize = () => {
    const isDesktop = window.matchMedia('(min-width: 900px)').matches;
    if (isDesktop) {
      nav.hidden = false;
      nav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      // mobile: começa fechado
      if (!nav.classList.contains('open')) {
        nav.hidden = true;
      }
    }
  };
  window.addEventListener('resize', syncOnResize);
  syncOnResize();
}


// Modal <dialog>
const scoringDialog = document.getElementById('scoring-dialog');
const openScoring = document.getElementById('open-scoring');

if (openScoring && scoringDialog) {
  openScoring.addEventListener('click', async () => {
    // Basic scoring description
    const body = document.getElementById('scoring-body');
    body.innerHTML = `
      <p>We add points across Experience, Weekly Hours, Objective, Budget, Platform, and Focus.</p>
      <ul>
        <li>Beginner: 0–9</li>
        <li>Amateur: 10–17</li>
        <li>Experienced: 18–25</li>
        <li>Professional: 26–32</li>
      </ul>
      <p>Budget caps: ≤ $400 never recommends Professional; ≤ $700 limits high-end DD.</p>
      <p>Professional requires Weekly Hours ≥ 10 and Objective = Competitive.</p>
    `;
    scoringDialog.showModal();
  });
}

// LocalStorage small helper
export const storage = {
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
  get(key, fallback=null) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
};
