// scripts/weather.js  (no key, uses Open-Meteo)
// Jundiai city

const LAT = -23.1857
const LON = -46.8978

const $temp = document.querySelector('#temp-now')
const $desc = document.querySelector('#desc-now')
const $fc  = document.querySelector('#forecast')

function wmoToText(code) {
  // WMO base map
  const map = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Rime fog',
    51: 'Light drizzle',
    53: 'Drizzle',
    55: 'Heavy drizzle',
    61: 'Light rain',
    63: 'Rain',
    65: 'Heavy rain',
    71: 'Light snow',
    73: 'Snow',
    75: 'Heavy snow',
    80: 'Rain showers',
    81: 'Rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm'
  }
  return map[code] || 'Weather'
}

function dayLabel(isoDate) {
  const dt = new Date(isoDate)
  return dt.toLocaleDateString('en', { weekday: 'short', day: '2-digit' })
}

async function loadWeather() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&timezone=auto&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=4`
    const data = await (await fetch(url)).json()

    // Current
    const t = Math.round(data.current.temperature_2m)
    const txt = wmoToText(data.current.weather_code)
    $temp.textContent = `${t}`
    $desc.textContent = txt

    // next 3 days (ignores index 0 which is today)
    $fc.innerHTML = ''
    data.daily.time.slice(1, 4).forEach((d, i) => {
      const card = document.createElement('article')
      card.className = 'forecast-card'
      const max = Math.round(data.daily.temperature_2m_max[i + 1])
      const min = Math.round(data.daily.temperature_2m_min[i + 1])
      const wtxt = wmoToText(data.daily.weather_code[i + 1])
      card.innerHTML = `
        <h3>${dayLabel(d)}</h3>
        <p>Máx: ${max}°C</p>
        <p>Min: ${min}°C</p>
        <p>${wtxt}</p>
      `
      $fc.appendChild(card)
    })
  } catch (err) {
    console.error('Weather error', err)
    $fc.textContent = 'Unable to load weather'
  }
}

loadWeather()

