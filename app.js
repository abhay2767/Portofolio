const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); } });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('abhaydubey2767@gmail.com'); status.textContent = 'Email copied!'; }
  catch { status.textContent = 'Please select the email address to copy it.'; }
  setTimeout(() => { status.textContent = ''; }, 4000);
});
