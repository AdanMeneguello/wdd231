const dialog = document.getElementById('torque-dialog');
const img = document.getElementById('torque-img');

const map = {
  gear: 'images/wheels/torque-gear.webp',
  belt: 'images/wheels/torque-belt.webp',
  dd: 'images/wheels/torque-dd.webp'
};

document.querySelectorAll('[data-torque]').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.torque;
    img.src = map[key];
    img.alt = `${key.toUpperCase()} torque example`;
    dialog.showModal();
  });
});
