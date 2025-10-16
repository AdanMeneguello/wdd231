import { fetchGames } from './data.js';
import { storage } from './main.js';

const list = document.getElementById('games-list');
const form = document.getElementById('games-filter');
const btnUse = document.getElementById('btn-use-eval');
const btnSearch = document.getElementById('btn-search');
const tip = document.getElementById('games-tip');

const state = { all: [], filtered: [] };

const render = (games) => {
    list.innerHTML = games.map(g => `
      <article class="card">
        ${g.image ? `<img src="${g.image.src}" alt="${g.image.alt}" class="card-img" loading="lazy">` : ''}
        <h3>${g.title}</h3>
        <p><strong>Style:</strong> ${g.physicsStyle}</p>
        <p><strong>Platforms:</strong> ${g.platforms.join(', ')}</p>
        <p><strong>Focus:</strong> ${g.focusTags.join(', ')}</p>
        <p><strong>VR:</strong> ${g.hasVR ? 'Yes' : 'No'} · <strong>Online:</strong> ${g.onlineCompetitive ? 'Yes' : 'No'}</p>
        <p class="small"><strong>Min (PC):</strong> CPU ${g.minSpec.cpu}, GPU ${g.minSpec.gpu}, RAM ${g.minSpec.ramGB} GB</p>
        ${g.notes ? `<p class="small">${g.notes}</p>` : ''}
      </article>
    `).join('');
  };
  

const applyFilters = () => {
  const pf = form.platform.value;
  const fc = form.focus.value;
  state.filtered = state.all.filter(g => {
    const okP = pf === 'all' || g.platforms.includes(pf);
    const okF = fc === 'all' || g.focusTags.includes(fc);
    return okP && okF;
  });
  render(state.filtered);
};

btnSearch?.addEventListener('click', applyFilters);

// Fill selects from last evaluation
btnUse?.addEventListener('click', () => {
  const last = storage.get('lastEvaluation', null);
  if (!last) {
    tip.textContent = 'No saved evaluation found. Calculate your level on Home first.';
    return;
  }
  const plat = last.platform.includes('PC') ? 'PC' : last.platform;
  form.platform.value = plat;
  // map focus: general → all, single/specialized → keep all (user may refine)
  form.focus.value = 'all';
  tip.textContent = `Using your evaluation: Platform ${plat}.`;
  applyFilters();
});

(async () => {
  try {
    state.all = await fetchGames();
    state.filtered = state.all;
    render(state.filtered);
  } catch {
    list.innerHTML = `<p class="error">Could not load games.</p>`;
  }
})();
