import { state } from './store.js';
import { createRouter } from './router.js';
import { bindGlobalInteractions, showModal } from './modules/common.js';
import { setupHome } from './modules/home.js';
import { setupRisk } from './modules/risk.js';
import { setupReport } from './modules/report.js';
import { setupDispatch } from './modules/dispatch.js';
import { setupProfile } from './modules/profile.js';

const { goToPage } = createRouter();
bindGlobalInteractions(goToPage);

setupHome(state);
setupRisk(state);
setupReport(state);
setupDispatch(state);
setupProfile();

document.getElementById('themeToggle').addEventListener('click', event => {
  document.body.classList.toggle('dark');
  event.currentTarget.textContent = document.body.classList.contains('dark') ? '浅色模式' : '夜间模式';
});

document.getElementById('notifyBtn').addEventListener('click', () => {
  showModal('通知中心', '今日系统推送 4 条：暴雨预警1条、客流告警2条、设备离线1条。');
});
