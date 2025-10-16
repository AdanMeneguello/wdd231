import { fetchProducts } from './data.js';
import { renderRecommendations } from './render.js';
import { storage } from './main.js';

const form = document.getElementById('eval-form');
const levelBox = document.getElementById('level-summary');
const recBox = document.getElementById('recommendations');
const clearBtn = document.getElementById('clear-form');

// Scoring rules (USD)
function scoreExperience(v){
  if (v === 'advanced') return 6;
  if (v === 'intermediate') return 4;
  if (v === 'basic') return 2;
  return 0;
}
function scoreHours(v){
  if (v === '>=10') return 6;
  if (v === '6-9') return 4;
  if (v === '3-5') return 2;
  return 0;
}
function scoreObjective(v){
  if (v === 'competitive') return 6;
  if (v === 'leagues') return 4;
  if (v === 'improve') return 3;
  return 0;
}
function scoreBudget(n){
  if (n > 1200) return 8;
  if (n >= 701) return 6;
  if (n >= 401) return 4;
  if (n >= 201) return 2;
  return 0;
}
function scorePlatform(v){
  if (v === 'PC_sim') return 3;
  if (v === 'PC_casual') return 2;
  return 1; // console
}
function scoreFocus(v){
  if (v === 'specialized') return 3;
  if (v === 'single') return 2;
  return 0;
}

function classify(total, hours, objective){
  let level = 'Beginner';
  if (total >= 10 && total <= 17) level = 'Amateur';
  if (total >= 18 && total <= 25) level = 'Experienced';
  if (total >= 26) level = 'Professional';
  // Professional qualification rule
  if (level === 'Professional' && !(hours === '>=10' && objective === 'competitive')) {
    level = 'Experienced';
  }
  return level;
}

function softCaps(budget, level){
  if (budget <= 400 && level === 'Professional') return 'Experienced';
  if (budget <= 700 && level === 'Professional') return 'Experienced';
  return level;
}

function readParams(){
  const params = new URLSearchParams(location.search);
  if (!params.has('experience')) return null;
  return {
    experience: params.get('experience'),
    hours: params.get('hours'),
    objective: params.get('objective'),
    budget: Number(params.get('budget') || 0),
    platform: params.get('platform'),
    focus: params.get('focus')
  };
}

async function evaluateAndRender(input){
  const total =
    scoreExperience(input.experience) +
    scoreHours(input.hours) +
    scoreObjective(input.objective) +
    scoreBudget(input.budget) +
    scorePlatform(input.platform) +
    scoreFocus(input.focus);

  let level = classify(total, input.hours, input.objective);
  level = softCaps(input.budget, level);

  levelBox.textContent = `Score: ${total} — Level: ${level}`;
  storage.set('lastEvaluation', { ...input, total, level });

  try {
    const items = await fetchProducts();
    // Filter by level, platform, budget, and (optionally) focus
    const plat = input.platform.includes('PC') ? 'PC' : input.platform; // normalize PC_casual/sim -> PC
    const recs = items
      .filter(p => p.levelTargets.includes(level))
      .filter(p => p.platforms.includes(plat))
      .filter(p => p.priceUSD.min <= input.budget + 50) // small tolerance
      .sort((a,b) => (a.priceUSD.min - b.priceUSD.min));

    renderRecommendations(recBox, recs, { level, budget: input.budget, platform: plat, focus: input.focus });
  } catch (err) {
    recBox.innerHTML = `<p class="error">Could not load recommendations.</p>`;
  }
}

// Restore from URL or LocalStorage on load
const initial = readParams() || storage.get('lastEvaluation', null);
if (initial) {
  // Fill form controls if present
  if (form) {
    for (const [k,v] of Object.entries(initial)) {
      const el = form.elements[k];
      if (!el) continue;
      if (el.tagName === 'SELECT' || el.type === 'number' || el.type === 'text') el.value = v;
    }
  }
  evaluateAndRender(initial);
}

// --- ADDED: handle submit without reload ---
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const input = {
      experience: fd.get('experience'),
      hours: fd.get('hours'),
      objective: fd.get('objective'),
      budget: Number(fd.get('budget') || 0),
      platform: fd.get('platform'),
      focus: fd.get('focus')
    };
    // update URL for shareable results
    const params = new URLSearchParams({
      experience: input.experience || '',
      hours: input.hours || '',
      objective: input.objective || '',
      budget: String(input.budget || 0),
      platform: input.platform || '',
      focus: input.focus || ''
    });
    history.pushState({}, '', `${location.pathname}?${params.toString()}`);
    evaluateAndRender(input);
  });
}

// Handle Clear button
if (clearBtn && form) {
  clearBtn.addEventListener('click', () => {
    form.reset();
    levelBox.textContent = 'No data yet.';
    recBox.innerHTML = '';
    history.pushState({}, '', 'index.html');
    localStorage.removeItem('lastEvaluation');
  });
}
