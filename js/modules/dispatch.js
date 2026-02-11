import { showToast } from './common.js';

export function setupDispatch(state) {
  const stepsEl = document.getElementById('dispatchSteps');
  const log = document.getElementById('dispatchLog');
  const staff = document.getElementById('staffCount');
  const vehicles = document.getElementById('vehicleCount');

  const render = () => {
    stepsEl.innerHTML = state.dispatchSteps
      .map((step, index) => {
        const klass = index < state.dispatchIndex ? 'done' : index === state.dispatchIndex ? 'active' : '';
        return `<li class="${klass}">${step}</li>`;
      })
      .join('');
    staff.innerHTML = `<strong>${state.resources.staff}</strong> 人`;
    vehicles.innerHTML = `<strong>${state.resources.vehicles}</strong> 台`;
  };

  document.getElementById('nextStep').addEventListener('click', () => {
    if (state.dispatchIndex < state.dispatchSteps.length - 1) {
      state.dispatchIndex += 1;
      log.textContent = `流程推进：${state.dispatchSteps[state.dispatchIndex]}`;
      render();
      showToast('流程已推进到下一阶段');
    } else {
      log.textContent = '本次事件闭环完成，等待归档。';
      showToast('事件已闭环处理');
    }
  });

  document.getElementById('resetStep').addEventListener('click', () => {
    state.dispatchIndex = 1;
    log.textContent = '流程已重置到：分派任务';
    render();
  });

  document.getElementById('autoAllocate').addEventListener('click', () => {
    state.resources.staff = Math.max(8, state.resources.staff - 2);
    state.resources.vehicles = Math.max(2, state.resources.vehicles - 1);
    log.textContent = `系统已自动调度：派出2名巡检员与1台车辆。`;
    render();
    showToast('自动调度完成');
  });

  render();
  return { renderDispatch: render };
}
