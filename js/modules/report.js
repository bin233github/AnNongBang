import { showModal, showToast } from './common.js';
import { nowTime } from '../store.js';

export function setupReport(state) {
  const form = document.getElementById('reportForm');
  const timeline = document.getElementById('reportTimeline');

  const render = () => {
    timeline.innerHTML = state.reports.map(item => `<li><strong>${item.time}</strong> ${item.text}</li>`).join('');
  };

  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const type = formData.get('type');
    const location = formData.get('location');
    const description = formData.get('description');
    state.reports.unshift({ time: nowTime(), text: `[${type}] ${location} - 待处置（${description.slice(0, 16)}...）` });
    state.totalEvents += 1;
    render();
    form.reset();
    showToast('上报成功，指挥中心已接收');
  });

  document.getElementById('simulateReportBtn').addEventListener('click', () => {
    state.reports.unshift({ time: nowTime(), text: '[系统告警] 云桥入口人流超阈值 - 自动生成工单' });
    state.totalEvents += 1;
    render();
    showModal('自动告警已触发', '已推送给应急指挥与现场巡检员，请在“应急指挥”继续处理。');
  });

  document.getElementById('clearReportsBtn').addEventListener('click', () => {
    state.reports = [];
    render();
    showToast('上报记录已清空');
  });

  render();
  return { renderReport: render };
}
