import { createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { TreeNode } from 'src/utils/TreeUtils';
import { ChartRadar, Map2 } from 'tabler-icons-react';

export interface TierListKeyGroup {
  key?: string;
  description?: string;
}

let initialState: { collection: TreeNode<TierListKeyGroup>[] } = {
  collection: [
    {
      id: 'AE',
      name: '能力',
      children: [
        {
          id: 'CII',
          name: '综合评价',
          description: '干员整体强度的评价',
        },
        // {
        //   id: 'SCC',
        //   name: '单核能力',
        //   description: '干员挑大梁、solo的能力',
        // },
        // {
        //   id: 'SA',
        //   name: '体系能力',
        //   description: '干员作为体系组件在体系中的重要程度',
        // },
        {
          id: 'MB',
          name: '心智负担',
          description: '干员的使用难度及解手度，越简单越强',
        },
        // {
        //   id: 'IRP',
        //   name: '不可替代概率',
        //   description: '干员的某些独特特性的发挥概率',
        // },
      ],
    },
    {
      id: 'IAE',
      name: '环境',
      children: [
        {
          id: 'M',
          name: '主线',
          children: [
            {
              id: '10',
              name: '破碎日冕',
            },
          ],
        },
        {
          id: 'SS',
          name: '支线',
          children: [
            {
              id: '18',
              name: '愚人号',
            },
          ],
        },
        {
          id: 'SC',
          name: '故事集',
        },
        {
          id: 'CC',
          name: '危机合约',
          children: [
            {
              id: '9',
              name: '渊默行动',
            },
          ],
        },
        {
          id: 'R',
          name: '集成战略',
          children: [
            {
              id: '1',
              name: '傀影与猩红孤钻',
              children: [
                {
                  id: 'road',
                  name: '道中',
                },
                {
                  id: 'boss',
                  name: 'Boss房',
                },
              ],
            },
          ],
        },
        {
          id: 'LT',
          name: '保全派驻',
          children: [
            {
              id: '1',
              name: '钢铁萝卜矿场&多伦矿场',
            },
          ],
        },
      ],
    },
  ],
};

export const tierListTypeSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
});

export default tierListTypeSlice.reducer;
