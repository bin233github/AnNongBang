import { quickContents } from '../data.js';
import { showToast } from './common.js';

export function setupProfile() {
  const panel = document.getElementById('quickPanel');

  panel.textContent = '点击上方快捷入口查看对应模块内容。';
  document.querySelectorAll('[data-action="quick"]').forEach(btn => {
    btn.addEventListener('click', () => {
      panel.textContent = quickContents[btn.dataset.key] || '暂无内容';
      showToast('快捷入口已打开');
    });
  });
}
