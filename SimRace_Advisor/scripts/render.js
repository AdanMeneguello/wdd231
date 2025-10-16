export function renderRecommendations(container, items, ctx){
    if (!items || items.length === 0) {
      container.innerHTML = `<p>No matches for your filters. Try increasing budget or changing platform.</p>`;
      return;
    }
  
    container.innerHTML = items.map(p => `
      <article class="card">
        ${p.image ? `<img src="${p.image.src}" alt="${p.image.alt}" class="card-img" loading="lazy">` : ''}
        <h3>${p.brand} ${p.model}</h3>
        <p><strong>Category:</strong> ${p.category.replace('_',' ')}</p>
        <p><strong>Platforms:</strong> ${p.platforms.join(', ')}</p>
        ${p.specs?.driveType ? `<p><strong>Drive:</strong> ${p.specs.driveType.toUpperCase()}${p.specs.torqueNm ? ` · ${p.specs.torqueNm} Nm` : ''}</p>` : ''}
        ${p.specs?.sensor ? `<p><strong>Sensor:</strong> ${p.specs.sensor} · ${p.specs.stages || 2} pedals</p>` : ''}
        ${p.specs?.frame ? `<p><strong>Frame:</strong> ${p.specs.frame} · Rigidity ${p.specs.rigidity || 3}/5</p>` : ''}
        <p><strong>Est. Price:</strong> $${p.priceUSD.min}–$${p.priceUSD.max}</p>
        ${p.notes ? `<p class="small">${p.notes}</p>` : ''}
      </article>
    `).join('');
  }