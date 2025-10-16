
    const btn = document.getElementById("menu-btn")
    const nav = document.getElementById("site-nav")
  
    if (!btn || !nav) return
  
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true'
      btn.setAttribute('aria-expanded', String(!expanded))
      nav.classList.toggle('open')
    })
  
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open')
        btn.setAttribute('aria-expanded', 'false')
      })
    })

  