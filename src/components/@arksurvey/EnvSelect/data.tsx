import { IconChartRadar, IconMap2, IconThumbUp } from '@tabler/icons';

export const category = [
  {
    value: 'AE',
    label: '能力',
    icon: <IconChartRadar size={16} />,
  },
  {
    value: 'IAE',
    label: '表现',
    icon: <IconMap2 size={16} />,
  },
  {
    value: 'NG',
    label: '非游戏性',
    icon: <IconThumbUp size={16} />,
  },
];

export const envList = [
  {
    value: 'LT',
    label: '保全派驻',
  },
  {
    value: 'R',
    label: '集成战略',
  },
  {
    value: 'CC',
    label: '危机合约',
  },
  {
    value: 'M',
    label: '主线',
  },
  {
    value: 'SS',
    label: '支线',
  },
];

export interface TierListType {
  categoryId: 'AE' | 'IAE' | 'NG';
  id: string;
  name: string;
  groupId?: string;
  road?: string;
  description?: string;
}

export const tierListTypes: TierListType[] = [
  {
    categoryId: 'NG',
    id: 'P',
    name: '人气评价',
    description: '对干员的喜好程度',
  },
  {
    categoryId: 'NG',
    id: 'MC',
    name: '制作完成度评价',
    description: '综合立绘、配音、人设、剧情、小人、特效等',
  },
  {
    categoryId: 'AE',
    id: 'CII',
    name: '综合评价',
    description: '干员整体强度的评价',
  },
  {
    categoryId: 'AE',
    id: 'MB',
    name: '心智负担',
    description: '干员的使用难度及解手度，越简单越强',
  },
  {
    categoryId: 'IAE',
    groupId: 'SS',
    id: '18',
    name: '愚人号',
  },
  {
    categoryId: 'IAE',
    groupId: 'CC',
    id: '9',
    name: '渊默行动',
  },
  {
    categoryId: 'IAE',
    groupId: 'M',
    id: '10',
    name: '破碎日冕',
  },
  {
    categoryId: 'IAE',
    groupId: 'R',
    id: '1-r',
    name: '道中',
    description: '傀影与猩红孤钻',
  },
  {
    categoryId: 'IAE',
    groupId: 'R',
    id: '1-b1',
    name: '大锁',
    description: '傀影与猩红孤钻',
  },
  {
    categoryId: 'IAE',
    groupId: 'R',
    id: '1-b2',
    name: '喉舌',
    description: '傀影与猩红孤钻',
  },
  {
    categoryId: 'IAE',
    groupId: 'R',
    id: '1-b3',
    name: '剧作家',
    description: '傀影与猩红孤钻',
  },
  {
    categoryId: 'IAE',
    groupId: 'LT',
    id: '1',
    name: '钢铁萝卜矿场&多伦矿场',
  },
];
