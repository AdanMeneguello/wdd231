
const LAT = -23.1857;
const LON = -46.8978;
const KEY = '';

const $temp = document.querySelector('#temp-now');
const $desc = document.querySelector('#desc-now');
const $fc  = document.querySelector('#forecast');

function dayLabel(ts) {
  return new Date(ts * 1000).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit' });
}

async function loadWeather() {
  try {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${LAT}&lon=${LON}&units=metric&lang=pt_br&exclude=minutely,hourly,alerts&appid=${KEY}`;
    const data = await (await fetch(url)).json();

    // Atual
    $temp.textContent = Math.round(data.current.temp);
    $desc.textContent = data.current.weather?.[0]?.description ?? '';

    // 3 próximos dias (daily[1..3])
    $fc.innerHTML = '';
    data.daily.slice(1, 4).forEach(d => {
      const card = document.createElement('article');
      card.className = 'forecast-card';
      card.innerHTML = `
        <h3>${dayLabel(d.dt)}</h3>
        <p>Máx: ${Math.round(d.temp.max)}°C</p>
        <p>Mín: ${Math.round(d.temp.min)}°C</p>
        <p>${d.weather?.[0]?.description ?? ''}</p>
      `;
      $fc.appendChild(card);
    });
  } catch (err) {
    console.error('Weather error', err);
    $fc.textContent = 'Unable to load weather';
  }
}
loadWeather();
