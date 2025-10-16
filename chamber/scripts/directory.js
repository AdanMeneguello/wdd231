const container = document.querySelector('#members')
const gridBtn = document.querySelector('#gridBtn')
const listBtn = document.querySelector('#listBtn')

async function loadMembers() {
  try {
    const res = await fetch('./data/members.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const members = data.members || data

    container.innerHTML = ''
    members.forEach(m => {
      const card = document.createElement('article')
      card.className = 'member-card'
      card.innerHTML = `
        <img src="${m.image}" alt="Logo ${m.name}" loading="lazy">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p><a href="tel:${m.phone}">${m.phone}</a></p>
        <p><a href="${m.url}" target="_blank" rel="noopener">Website</a></p>
        <p>${m.blurb}</p>
        <span class="tag">Membership ${m.membership}</span>
      `
      container.appendChild(card)
    })
  } catch (err) {
    console.error('Directory error:', err)
    container.textContent = 'Failed to load members.'
  }
}

gridBtn?.addEventListener('click', () => {
  container.classList.add('grid')
  container.classList.remove('list')
  gridBtn.classList.add('active')
  listBtn.classList.remove('active')
})

listBtn?.addEventListener('click', () => {
  container.classList.add('list')
  container.classList.remove('grid')
  listBtn.classList.add('active')
  gridBtn.classList.remove('active')
})

loadMembers()
