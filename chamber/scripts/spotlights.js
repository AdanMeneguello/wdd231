const wrap = document.querySelector('#spotlights-wrap');

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function loadSpotlights() {
  try {
    const data = await (await fetch('./data/members.json')).json();
    const goldSilver = data.members.filter(m => {
      const lvl = (m.membershipLevel || '').toLowerCase();
      return lvl === 'gold' || lvl === 'silver';
    });

    const chosen = shuffle(goldSilver).slice(0, 3); // pegue 2–3; ajuste se quiser 2
    wrap.innerHTML = '';

    chosen.forEach(m => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img src="${m.logo}" alt="Logo ${m.name}" loading="lazy">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p><a href="tel:${m.phone}">${m.phone}</a></p>
        <p><a href="${m.website}" target="_blank" rel="noopener">Website</a></p>
        <span class="tag ${m.membershipLevel.toLowerCase()}">${m.membershipLevel}</span>
      `;
      wrap.appendChild(card);
    });
  } catch (e) {
    console.error('Spotlights error', e);
    wrap.textContent = 'Data not found. Sorry !';
  }
}
loadSpotlights();
