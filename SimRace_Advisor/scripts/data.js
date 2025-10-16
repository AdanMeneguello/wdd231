export async function fetchProducts(){
    try{
      const r = await fetch('./data/products.json');
      if (!r.ok) throw new Error('HTTP '+r.status);
      const j = await r.json();
      return Array.isArray(j.products) ? j.products : [];
    }catch(e){
      console.error('fetchProducts error', e);
      throw e;
    }
  }
  
  export async function fetchGames(){
    try{
      const r = await fetch('./data/games.json');
      if (!r.ok) throw new Error('HTTP '+r.status);
      const j = await r.json();
      return Array.isArray(j.games) ? j.games : [];
    }catch(e){
      console.error('fetchGames error', e);
      throw e;
    }
  }

  
  