import { showModal, showToast } from './common.js';

export function setupHome(state, rerenderAll) {
  const scoreNode = document.getElementById('safetyScore');
  const visitorCount = document.getElementById('visitorCount');
  const visitorMeter = document.getElementById('visitorMeter');
  const eventStats = document.getElementById('eventStats');
  const eventMeter = document.getElementById('eventMeter');
  const noticeList = document.getElementById('noticeList');

  const render = () => {
    scoreNode.textContent = String(state.safetyScore);
    visitorCount.textContent = `南岭古村 ${state.visitorCount} 人`;
    visitorMeter.style.width = `${Math.min(95, Math.max(20, Math.round(state.visitorCount / 7)))}%`;
    eventStats.innerHTML = `<strong>${state.totalEvents}</strong> 起（已处置 ${state.handledEvents} 起）`;
    eventMeter.style.width = `${Math.round((state.handledEvents / state.totalEvents) * 100)}%`;
    noticeList.innerHTML = state.notices.map(item => `<li>${item}</li>`).join('');
  };

  document.getElementById('refreshScore').addEventListener('click', () => {
    state.safetyScore = 80 + Math.floor(Math.random() * 20);
    state.visitorCount += Math.floor(Math.random() * 30) - 15;
    render();
    showToast(`安全指数更新：${state.safetyScore}`);
  });

  document.getElementById('drillBtn').addEventListener('click', () => {
    state.totalEvents += 1;
    showModal('应急演练已发起', '已通知巡检员、医疗点、广播中心进入演练模式。');
    render();
  });

  document.getElementById('broadcastBtn').addEventListener('click', () => {
    state.notices.unshift(`${new Date().toLocaleTimeString('zh-CN', { hour:'2-digit', minute:'2-digit' })} 临时通知：东侧停车场车流量大，请服从引导。`);
    state.notices = state.notices.slice(0, 6);
    render();
    showToast('广播已发布');
  });

  render();
  return { renderHome: render };
}
