export function createRouter() {
  const tabs = [...document.querySelectorAll('.tab')];
  const pages = [...document.querySelectorAll('.page')];

  function goToPage(target) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.target === target));
    pages.forEach(p => p.classList.toggle('active', p.id === target));
  }

  tabs.forEach(tab => tab.addEventListener('click', () => goToPage(tab.dataset.target)));
  return { goToPage };
}
