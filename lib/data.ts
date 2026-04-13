import type { Service, Volunteer } from './types';

export const VOLUNTEER_COUNT = 0;

export const services: Service[] = [
  {
    id: 'shopping',
    name: '代购生鲜',
    icon: 'fa-cart-shopping',
    color: 'primary',
    brief: '为老人代购新鲜蔬菜、水果、日用品等',
    detail:
      '志愿者根据老人或子女提供的购物清单，前往周边超市、菜市场进行代购，确保食材新鲜、价格透明。购买完成后配送到家，支持拍照确认商品质量。',
    fields: [
      { key: 'list', label: '购物清单', ph: '如：西红柿2斤、鸡蛋1板、青菜1把' },
      { key: 'budget', label: '预算上限', ph: '如：100元' },
    ],
  },
  {
    id: 'hospital',
    name: '代办挂号',
    icon: 'fa-hospital',
    color: 'accent',
    brief: '协助老人完成医院预约挂号',
    detail:
      '志愿者通过线上渠道为老人预约指定医院、科室和医生。对于不熟悉线上操作的老人，志愿者可协助提供医院导航、就诊须知等信息，必要时可陪同就医。',
    fields: [
      { key: 'hospital', label: '医院名称', ph: '如：市第一人民医院' },
      { key: 'dept', label: '科室', ph: '如：心内科' },
      { key: 'date', label: '期望就诊日期', ph: '如：2025-07-20' },
    ],
  },
  {
    id: 'payment',
    name: '生活缴费',
    icon: 'fa-receipt',
    color: 'primary',
    brief: '代缴水、电、燃气、物业等费用',
    detail:
      '志愿者协助老人完成各项生活费用的线上缴纳，包括水费、电费、燃气费、物业费等。缴费完成后提供电子凭证截图，确保费用透明可查。',
    fields: [
      { key: 'type', label: '缴费类型', ph: '如：电费' },
      { key: 'account', label: '户号/账号', ph: '请输入缴费户号' },
      { key: 'amount', label: '缴费金额', ph: '如：186.50元' },
    ],
  },
  {
    id: 'transport',
    name: '出行辅助',
    icon: 'fa-car-side',
    color: 'accent',
    brief: '协助叫车、查询路线、陪同出行',
    detail:
      '志愿者帮助老人使用网约车平台叫车，或查询公交/地铁路线。对于行动不便的老人，志愿者可提供从家到目的地的全程陪同服务，确保出行安全。',
    fields: [
      { key: 'from', label: '出发地', ph: '如：幸福小区南门' },
      { key: 'to', label: '目的地', ph: '如：市第三医院' },
    ],
  },
  {
    id: 'tech',
    name: '手机教学',
    icon: 'fa-mobile-screen-button',
    color: 'primary',
    brief: '一对一教老人使用智能手机',
    detail:
      '志愿者提供面对面的一对一教学，内容涵盖微信使用、视频通话、手机支付、健康码出示、防诈骗知识等。根据老人实际需求定制教学内容，耐心细致。',
    fields: [
      { key: 'topic', label: '学习内容', ph: '如：怎么和孙子视频通话' },
      { key: 'model', label: '手机型号', ph: '如：华为Mate60（选填）' },
    ],
  },
  {
    id: 'emergency',
    name: '紧急求助',
    icon: 'fa-triangle-exclamation',
    color: 'accent',
    brief: '突发情况下的紧急响应与协助',
    detail:
      '当老人遇到突发状况（如身体不适、家中设施故障等），平台提供紧急响应通道，优先派单给距离最近的志愿者，确保在第一时间提供帮助或联系相关救援机构。',
    fields: [{ key: 'desc', label: '紧急情况描述', ph: '请简要描述紧急情况' }],
  },
];

export const volunteers: Volunteer[] = [
  { name: '张明远', school: '北京理工大学', major: '计算机科学与技术', count: 128, seed: 'volunteer1', tag: '技术达人' },
  { name: '李思雨', school: '中国人民大学', major: '社会工作', count: 96, seed: 'volunteer2', tag: '暖心陪伴' },
  { name: '王浩然', school: '北京邮电大学', major: '软件工程', count: 152, seed: 'volunteer3', tag: '效率标杆' },
  { name: '陈雨桐', school: '中央民族大学', major: '社会学', count: 87, seed: 'volunteer4', tag: '耐心细致' },
];

export const ORDER_STATUSES = ['等待接单', '已接单', '服务中', '已完成'] as const;
export const STATUS_ICONS = ['fa-clock', 'fa-handshake', 'fa-spinner', 'fa-circle-check'] as const;
export const VOLUNTEER_NAMES = ['张明远', '李思雨', '王浩然', '陈雨桐', '刘子涵', '赵雅琪'];
