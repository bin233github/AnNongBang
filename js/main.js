import { banners, consultStates, courses, experts, features, microTags, products, rentalTags } from './data.js';

const state = {
  bannerIndex: 0,
  microTag: '推荐',
  rentalTag: '全部设备',
  consultTab: 'qa',
  theoryDone: 12,
  theoryTotal: 20
};

const pages = [...document.querySelectorAll('.page')];
const tabs = [...document.querySelectorAll('.tab')];
const toast = document.getElementById('toast');
const modal = document.getElementById('modal');

function showToast(message) {
  toast.textContent = message;
  toast.showModal();
  setTimeout(() => toast.close(), 1200);
}

function showModal(title, content) {
  modal.innerHTML = `<h3>${title}</h3><p class="small mt8">${content}</p><button id="modalClose" class="btn btn-primary mt12">知道了</button>`;
  modal.showModal();
  modal.querySelector('#modalClose').addEventListener('click', () => modal.close());
}

function gotoPage(target) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.target === target));
  pages.forEach(p => p.classList.toggle('active', p.id === target));
}

tabs.forEach(tab => tab.addEventListener('click', () => gotoPage(tab.dataset.target)));

document.getElementById('voiceBtn').addEventListener('click', () => showToast('语音输入（演示）'));
document.getElementById('sosBtn').addEventListener('click', () => showModal('紧急联系', '已为你准备：120 / 119 / 平台值班专线（前端演示）。'));
document.getElementById('publishPost').addEventListener('click', () => showToast('动态已发布（演示）'));
document.getElementById('publishIncident').addEventListener('click', () => gotoPage('category'));

document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.subview').forEach(v => v.classList.add('hidden'));
    document.getElementById(btn.dataset.open).classList.remove('hidden');
  });
});
document.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => btn.closest('.subview').classList.add('hidden')));

function renderHome() {
  document.getElementById('featureGrid').innerHTML = features
    .map(item => `<button class="feature-item" data-open="${item.key}">${item.name}</button>`)
    .join('');
  document.querySelectorAll('#featureGrid [data-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      gotoPage('category');
      document.querySelectorAll('.subview').forEach(v => v.classList.add('hidden'));
      const panel = document.getElementById(btn.dataset.open);
      if (panel) panel.classList.remove('hidden');
    });
  });
}

function renderBanner() {
  const node = document.getElementById('homeBanner');
  node.innerHTML = `<h3>${banners[state.bannerIndex]}</h3><p class="small mt8">滑动轮播（自动）</p>`;
}
setInterval(() => {
  state.bannerIndex = (state.bannerIndex + 1) % banners.length;
  renderBanner();
}, 2600);

function renderMicro() {
  document.getElementById('microTags').innerHTML = microTags
    .map(tag => `<button class="chip ${tag === state.microTag ? 'active' : ''}" data-tag="${tag}">${tag}</button>`)
    .join('');
  document.querySelectorAll('#microTags .chip').forEach(chip => chip.addEventListener('click', () => {
    state.microTag = chip.dataset.tag;
    renderMicro();
    showToast(`已切换：${state.microTag}`);
  }));

  document.getElementById('courseList').innerHTML = courses
    .map(c => `<article class="course card"><h4>${c.title}</h4><p class="small">时长${c.duration} ｜ ${c.level} ｜ 已学${c.progress}%</p><div class="progress-line"><span style="width:${c.progress}%"></span></div></article>`)
    .join('');
}

document.getElementById('continueCourse').addEventListener('click', () => {
  localStorage.setItem('last_played_id', 'c2');
  showModal('继续学习', '已跳转到：民宿夜间电路短路处置 · 第3步（演示）');
});

function renderRental() {
  document.getElementById('rentalTags').innerHTML = rentalTags
    .map(tag => `<button class="chip ${tag === state.rentalTag ? 'active' : ''}" data-rent-tag="${tag}">${tag}</button>`).join('');
  document.querySelectorAll('[data-rent-tag]').forEach(btn => btn.addEventListener('click', () => {
    state.rentalTag = btn.dataset.rentTag;
    renderRental();
  }));

  document.getElementById('rentalList').innerHTML = products.map(p => `
    <article class="card">
      <div class="title-row"><h4>${p.name}</h4><div>${p.tags.map(t => `<span class="badge hot">${t}</span>`).join('')}</div></div>
      <p class="small">租赁：¥${p.rent}/天 ｜ 购买：¥${p.buy}起</p>
      <p class="small">库存：${p.stock} ｜ 支持上门安装</p>
      <div class="inline-actions mt8">
        <button class="btn btn-primary" data-rent="${p.name}">立即租赁</button>
        <button class="btn btn-ghost" data-buy="${p.name}">购买设备</button>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('[data-rent]').forEach(btn => btn.addEventListener('click', () => showModal('租赁SKU选择', `你正在租赁：${btn.dataset.rent}`)));
  document.querySelectorAll('[data-buy]').forEach(btn => btn.addEventListener('click', () => showModal('购买SKU选择', `你正在购买：${btn.dataset.buy}`)));
}

document.getElementById('rentSlider').addEventListener('input', e => {
  const d = Number(e.target.value);
  document.getElementById('rentDays').textContent = d;
  document.getElementById('rentPrice').textContent = `¥${d * 199}`;
});

function renderExam() {
  const steps = ['学习微课', '练习实操', '模拟考核', '领取证书'];
  document.getElementById('examSteps').innerHTML = steps.map((s, i) => `<li class="${i < 2 ? 'done' : i === 2 ? 'active' : ''}">${s}</li>`).join('');
  const pct = Math.round((state.theoryDone / state.theoryTotal) * 100);
  document.getElementById('theoryDone').textContent = `${state.theoryDone}/${state.theoryTotal}`;
  document.getElementById('theoryBar').style.width = `${pct}%`;
}

document.getElementById('continueExam').addEventListener('click', () => {
  state.theoryDone = Math.min(state.theoryTotal, state.theoryDone + 2);
  renderExam();
});
document.getElementById('uploadDemo').addEventListener('click', () => showToast('已上传视频，AI识别中（演示）'));
document.getElementById('showCert').addEventListener('click', () => showModal('电子证书', '证书编号：ANB-2026-0008 ｜ 已通过'));

function renderConsult() {
  document.getElementById('consultList').innerHTML = consultStates.map(s => {
    const map = { replied: ['专家已回复', 'success'], waiting_video: ['等待补充视频', 'warn'] };
    const [txt, cls] = map[s.status];
    return `<article class="card"><p>${s.title}</p><span class="badge ${cls}">${txt}</span></article>`;
  }).join('');

  document.getElementById('expertList').innerHTML = experts.map(e => `<article class="card"><h4>${e.name}</h4><p class="small">${e.role}</p><button class="btn btn-primary ask-btn" data-name="${e.name}">向TA咨询</button></article>`).join('');
  document.querySelectorAll('.ask-btn').forEach(btn => btn.addEventListener('click', () => showToast(`已创建与${btn.dataset.name}的咨询单`)));
}

document.querySelectorAll('#consultTabs .tab-btn').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('#consultTabs .tab-btn').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  state.consultTab = btn.dataset.tab;
  showToast(`已切换到${btn.textContent}`);
}));

document.getElementById('consultInput').addEventListener('focus', () => showToast('可在此直接输入，已适配移动端布局'));
document.querySelectorAll('.consult-fast').forEach(btn => btn.addEventListener('click', () => showToast(`已选择：${btn.textContent}`)));

function renderMessage() {
  document.getElementById('messageList').innerHTML = [
    '系统通知：你的课程《民宿夜间用电火灾预防》已更新。',
    '咨询进度：研学基地户外攀爬风险评估，专家已回复。'
  ].map(m => `<article class="card"><p>${m}</p></article>`).join('');
}

function renderProfileGrid() {
  const items = ['学习记录', '考核记录', '我的证书', '设备订单', '商品订单', '我的咨询'];
  document.getElementById('profileGrid').innerHTML = items.map(i => `<button class="btn btn-ghost">${i}</button>`).join('');
}

renderHome();
renderBanner();
renderMicro();
renderRental();
renderExam();
renderConsult();
renderMessage();
renderProfileGrid();
