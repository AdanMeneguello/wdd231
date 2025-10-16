
  const wrap = document.querySelector('#spotlights-wrap')

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  async function loadSpotlights() {
    try {
      const res = await fetch('./data/members.json')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const list = data.members || data

      // gold ou silver = membership 2 ou 3
      const goldSilver = list.filter(m => m.membership === 2 || m.membership === 3)

      // escolher 3 aleatórios
      const chosen = shuffle(goldSilver).slice(0, 3)
      wrap.innerHTML = ''

      chosen.forEach(m => {
        const card = document.createElement('article')
        card.className = 'card'
        card.innerHTML = `
          <img src="${m.image}" alt="Logo ${m.name}" loading="lazy">
          <h3>${m.name}</h3>
          <br><p>${m.address}</p></br>
          <p><a href="tel:${m.phone}">${m.phone}</a></p>
          <p><a href="${m.url}" target="_blank" rel="noopener">Website</a></p>
          <span class="tag">Membership ${m.membership}</span>
        `
        wrap.appendChild(card)
      })
    } catch (err) {
      console.error('Spotlights error:', err)
      wrap.textContent = 'Unable to load highlights'
    }
  }

  loadSpotlights()
