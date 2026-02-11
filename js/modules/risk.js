import { showToast } from './common.js';

function dotClass(level) {
  if (level === 'high') return 'high';
  if (level === 'mid') return 'mid';
  return 'low';
}

export function setupRisk(state) {
  const filter = document.getElementById('mapFilter');
  const list = document.getElementById('riskList');
  const map = document.getElementById('mapCanvas');

  const render = () => {
    const filtered = state.risks.filter(item => state.filter === 'all' || item.type === state.filter);
    map.innerHTML = filtered
      .map(item => `<span class="dot ${dotClass(item.level)}" title="${item.name}" style="left:${item.x}%;top:${item.y}%">${item.id}</span>`)
      .join('');
    list.innerHTML = filtered
      .map(item => `<article class="risk-item"><h4>${item.name} <small>(${item.level.toUpperCase()})</small></h4><p>${item.suggestion}</p></article>`)
      .join('');
  };

  filter.addEventListener('change', e => {
    state.filter = e.target.value;
    render();
  });

  document.getElementById('addRiskBtn').addEventListener('click', () => {
    const id = String.fromCharCode(65 + state.risks.length);
    state.risks.push({
      id,
      name: `新增巡查点 ${id}`,
      level: ['low', 'mid', 'high'][Math.floor(Math.random() * 3)],
      type: ['traffic', 'weather', 'fire'][Math.floor(Math.random() * 3)],
      x: 20 + Math.floor(Math.random() * 60),
      y: 20 + Math.floor(Math.random() * 60),
      suggestion: '系统建议：安排巡逻并追加观察。'
    });
    render();
    showToast('新增风险点成功');
  });

  render();
  return { renderRisk: render };
}
