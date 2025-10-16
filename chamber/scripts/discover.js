// basic nav toggle
(() => {
  const menuBtn = document.getElementById('menuToggle')
  const nav = document.getElementById('siteNav')

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const ex = menuBtn.getAttribute('aria-expanded') === 'true'
      menuBtn.setAttribute('aria-expanded', String(!ex))
      nav.classList.toggle('open')
    })
  }

  // footer year
  const y = document.getElementById('year')
  if (y) y.textContent = new Date().getFullYear()

  // localStorage: last visit message
  const visitKey = 'discover-last-visit'
  const visitMsg = document.getElementById('visitMsg')
  const now = Date.now()
  const prev = Number(localStorage.getItem(visitKey))

  if (!prev) {
    visitMsg.textContent = 'Welcome! This is your first visit.'
  } else {
    const ms = now - prev
    const days = Math.floor(ms / (1000 * 60 * 60 * 24))
    visitMsg.textContent = days === 0
      ? 'Welcome back! You last visited earlier today.'
      : `Welcome back! Your last visit was ${days} day(s) ago.`
  }
  localStorage.setItem(visitKey, String(now))

  // build cards from JSON file
  const container = document.querySelector('.cards')

  // map index to area name
  const areas = ['a','b','c','d','e','f','g','h']

  fetch('./data/discover.json')
    .then(r => r.json())
    .then(list => {
      list.slice(0, 8).forEach((item, i) => {
        const card = document.createElement('article')
        card.className = 'card'
        card.setAttribute('tabindex', '0')
        card.dataset.area = areas[i] || 'a'

        // picture with webp + fallback
        const pic = document.createElement('picture')

        const srcWebp = document.createElement('source')
        srcWebp.type = 'image/webp'
        srcWebp.setAttribute('data-srcset', `./images/discover/${item.image}`)
        pic.appendChild(srcWebp)

        const img = document.createElement('img')
        img.alt = item.name
        img.loading = 'lazy'
        img.width = 800
        img.height = 600
        img.setAttribute('data-src', `./images/discover/${item.image}`)
        pic.appendChild(img)

        const title = document.createElement('h3')
        title.textContent = item.name

        const meta = document.createElement('p')
        meta.className = 'meta'
        meta.textContent = item.address

        const desc = document.createElement('p')
        desc.textContent = item.description

        const actions = document.createElement('div')
        actions.className = 'actions'
        const a = document.createElement('a')
        a.className = 'btn'
        a.href = item.website
        a.target = '_blank'
        a.rel = 'noopener'
        a.textContent = 'Learn More'
        actions.appendChild(a)

        card.append(pic, title, meta, desc, actions)
        container.appendChild(card)
      })

      // lazy loading for offscreen images
      const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]')

      const swap = el => {
        if (el.tagName === 'IMG') {
          el.src = el.getAttribute('data-src')
          el.removeAttribute('data-src')
        } else if (el.tagName === 'SOURCE') {
          el.srcset = el.getAttribute('data-srcset')
          el.removeAttribute('data-srcset')
        }
      }

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const pic = entry.target
              pic.querySelectorAll('source[data-srcset], img[data-src]').forEach(swap)
              io.unobserve(pic)
            }
          })
        }, { rootMargin: '200px' })

        document.querySelectorAll('.card picture').forEach(p => io.observe(p))
      } else {
        // fallback
        lazyImages.forEach(swap)
      }
    })
    .catch(() => {
      container.innerHTML = '<p>Could not load places.</p>'
    })
})()