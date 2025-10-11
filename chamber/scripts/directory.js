const membersContainer = document.getElementById('members');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

async function loadMembers(){
    try{
        const resp = await fetch('./data/members.json');
        const data = await resp.json();

        renderGrid(data);

        gridBtn.addEventListener('click', () => {
            gridBtn.classList.add('active'); listBtn.classList.remove('active')
            membersContainer.className = 'grid';
            renderGrid(data);
        });

        listBtn.addEventListener('click', () => {
            listBtn.classList.add('active'); gridBtn.classList.remove('active')
            membersContainer.className = 'list';
            renderGrid(data);
        });

    }catch(err){
        console.error('Directory load error: ', err)
        membersContainer.innerHTML = '<p>Failed to load members.</p>';
    }
}

function renderGrid(members){
    membersContainer.innerHTML = '';
    members.forEach(m => {
        const card = document.createElement('article')
        card.className = 'member card'
        card.innerHTML = `
            <img src="${m.image}" alt="${m.name} logo">
            <h2>${m.name}</h2>
            <p>${m.address}</p>
            <p><a href="tel:${m.phone.replace(/[^0-9]/g,'')}">${m.phone}</a></p>
            <p><a href="${m.url}" target="_blank" rel="noopener">Visit Website</a></p>
            <p>Membership: ${['Member','Silver','Gold'][m.membership-1] || m.membership}</p>
    `;
    membersContainer.appendChild(card);
    });
}

function renderList(members){
    membersContainer.innerHTML = '';
    members.forEach(m => {
      const row = document.createElement('div');
      row.className = 'member item';
      row.innerHTML = `
        <img src="${m.image}" alt="${m.name} logo">
        <div>
          <strong>${m.name}</strong><br>
          ${m.address} • ${m.phone} • <a href="${m.url}" target="_blank" rel="noopener">Website</a>
          <div>Membership: ${['Member','Silver','Gold'][m.membership-1] || m.membership}</div>
        </div>
      `;
      membersContainer.appendChild(row);
    });
  }
  
loadMembers();