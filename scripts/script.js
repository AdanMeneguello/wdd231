const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('primary-nav');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}
const lastMod = document.getElementById('lastModified');
if (lastMod) {
  lastMod.textContent = `Last Modification: ${document.lastModified}`;
}

const courses = [
  { code: 'WDD 130', title: 'Web Fundamentals', type: 'WDD', credits: 3 },
  { code: 'WDD 131', title: 'Dynamic Web Fundamentals', type: 'WDD', credits: 3 },
  { code: 'WDD 231', title: 'Frontend Web Development I', type: 'WDD', credits: 3 },
  { code: 'CSE 110', title: 'Programming Building Blocks', type: 'CSE', credits: 2 },
  { code: 'CSE 111', title: 'Programming with Functions', type: 'CSE', credits: 2 }
];

const listEl = document.getElementById('course-list');
const countEl = document.getElementById('credit-count');
const chips = document.querySelectorAll('.chip');

function render(filter = 'all') {
  const items = courses.filter(c => filter === 'all' ? true : c.type === filter);
  listEl.innerHTML = '';
  let credits = 0;
  for (const c of items) {
    const li = document.createElement('li');
    li.className = 'course';
    li.innerHTML = `<span class="code">${c.code}</span>
                    <span class="type" aria-label="tipo do curso">${c.type}</span>`;
    listEl.appendChild(li);
    credits += c.credits;
  }
  countEl.textContent = String(credits);
}

chips.forEach(btn => {
  btn.addEventListener('click', () => {
    chips.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    render(filter);
    chips.forEach(b => b.setAttribute('aria-selected', b === btn ? 'true' : 'false'));
  });
});

render('all');