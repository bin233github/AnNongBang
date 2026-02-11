const riskData = [
  { name: "古道急弯", level: "high", type: "traffic", suggestion: "增设减速标识并安排巡逻。" },
  { name: "河滩露营区", level: "mid", type: "weather", suggestion: "关注暴雨预警，必要时封控。" },
  { name: "游客中心", level: "low", type: "fire", suggestion: "常规消防巡检中。" },
  { name: "云桥入口", level: "mid", type: "traffic", suggestion: "高峰期实行单向通行。" }
];

const reportSeed = [
  { time: "10:22", text: "[道路隐患] 石阶松动 - 已派检修组" },
  { time: "11:48", text: "[游客受伤] 擦伤处理 - 已完成" }
];

const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('.page');
const riskList = document.getElementById('riskList');
const mapFilter = document.getElementById('mapFilter');
const scoreNode = document.getElementById('safetyScore');
const toast = document.getElementById('toast');
const reportTimeline = document.getElementById('reportTimeline');
const themeToggle = document.getElementById('themeToggle');

function showToast(message) {
  toast.textContent = message;
  toast.showModal();
  setTimeout(() => toast.close(), 1200);
}

function renderRiskList(filter = 'all') {
  const filtered = riskData.filter(item => filter === 'all' || item.type === filter);
  riskList.innerHTML = filtered
    .map(
      item => `
        <article class="risk-item">
          <h4>${item.name} <small>(${item.level.toUpperCase()})</small></h4>
          <p>${item.suggestion}</p>
        </article>
      `
    )
    .join('');
}

function renderReportTimeline() {
  reportTimeline.innerHTML = reportSeed
    .map(item => `<li><strong>${item.time}</strong> ${item.text}</li>`)
    .join('');
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.target;
    pages.forEach(page => page.classList.toggle('active', page.id === target));
  });
});

mapFilter.addEventListener('change', event => {
  renderRiskList(event.target.value);
});

document.getElementById('refreshScore').addEventListener('click', () => {
  const value = 80 + Math.floor(Math.random() * 20);
  scoreNode.textContent = String(value);
  showToast(`安全指数已更新：${value}`);
});

document.getElementById('reportForm').addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const type = formData.get('type');
  const location = formData.get('location');
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  reportSeed.unshift({ time: `${hh}:${mm}`, text: `[${type}] ${location} - 待处置` });
  renderReportTimeline();
  event.currentTarget.reset();
  showToast('上报成功，指挥中心已接收。');
});

const steps = document.querySelectorAll('#dispatchSteps li');
let currentStep = 1;
document.getElementById('nextStep').addEventListener('click', () => {
  if (currentStep < steps.length) {
    steps[currentStep - 1].classList.remove('active');
    steps[currentStep - 1].classList.add('done');
    steps[currentStep].classList.add('active');
    currentStep += 1;
    showToast('流程已推进到下一阶段。');
  } else {
    showToast('本次事件已闭环处理。');
  }
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '浅色模式' : '夜间模式';
});

renderRiskList();
renderReportTimeline();
