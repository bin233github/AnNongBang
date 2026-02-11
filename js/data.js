export const initialState = {
  safetyScore: 89,
  visitorCount: 536,
  handledEvents: 3,
  totalEvents: 4,
  notices: [
    '12:30 山谷步道东段路滑，请穿防滑鞋。',
    '13:10 云桥观景台出现短时拥堵，建议错峰前往。',
    '14:00 民宿片区将进行消防演练，请勿惊慌。'
  ],
  risks: [
    { id: 'A', name: '古道急弯', level: 'high', type: 'traffic', x: 22, y: 38, suggestion: '增设减速标识并安排巡逻。' },
    { id: 'B', name: '河滩露营区', level: 'mid', type: 'weather', x: 58, y: 54, suggestion: '关注暴雨预警，必要时封控。' },
    { id: 'C', name: '游客中心', level: 'low', type: 'fire', x: 71, y: 26, suggestion: '常规消防巡检中。' },
    { id: 'D', name: '云桥入口', level: 'mid', type: 'traffic', x: 36, y: 66, suggestion: '高峰期实行单向通行。' }
  ],
  reports: [
    { time: '10:22', text: '[道路隐患] 石阶松动 - 已派检修组' },
    { time: '11:48', text: '[游客受伤] 擦伤处理 - 已完成' }
  ],
  dispatchSteps: ['告警接入', '分派任务', '人员到场', '处置反馈', '复盘归档'],
  dispatchIndex: 1,
  resources: { staff: 18, vehicles: 6 },
  filter: 'all'
};

export const quickContents = {
  training: '培训计划：本周四 15:00 开展“山地救援基础”线上培训。',
  inspection: '巡检任务：消防泵房、配电间、游步道栏杆（待完成 2 项）。',
  template: '通知模板：暴雨预警、道路管制、临时闭园、活动取消。',
  drill: '演练记录：1月应急疏散演练（89分），2月夜间救援演练（92分）。'
};
