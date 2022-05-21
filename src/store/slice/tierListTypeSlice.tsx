import { createSlice } from '@reduxjs/toolkit';
import { TreeNode } from 'src/utils/TreeUtils';

export interface TierListKeyGroup {
  key?: string;
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
        },
        {
          id: 'SCC',
          name: '单核能力',
        },
        {
          id: 'SA',
          name: '体系能力',
        },
        {
          id: 'EA',
          name: '极限能力',
        },
        {
          id: 'MB',
          name: '心智负担',
        },
        {
          id: 'IRP',
          name: '不可替代概率',
        },
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
              children: [
                {
                  id: 'guaranteed',
                  name: '保底',
                },
                {
                  id: 'high',
                  name: '高层',
                },
              ],
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
