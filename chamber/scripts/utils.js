
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('site-nav');
    if (menuBtn && nav){
        menuBtn.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        menuBtn.setAttribute('aria-expended', String(open));
        });
    }
        
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
