export function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.showModal();
  setTimeout(() => toast.close(), 1200);
}

export function showModal(title, content) {
  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <h3>${title}</h3>
    <p style="margin-top:8px;color:var(--subtext)">${content}</p>
    <div style="margin-top:10px"><button id="closeModal" class="btn btn-primary">知道了</button></div>
  `;
  modal.showModal();
  modal.querySelector('#closeModal').addEventListener('click', () => modal.close());
}

export function bindGlobalInteractions(goToPage) {
  document.querySelectorAll('[data-action="open-page"]').forEach(btn => {
    btn.addEventListener('click', () => goToPage(btn.dataset.target));
  });
}
