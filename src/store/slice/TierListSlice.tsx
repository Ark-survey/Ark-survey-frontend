import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TierList, TierLists } from 'src/api/TierListServer';
import { RootState } from '..';

export interface TierListStateType {
  tierLists: TierLists;
  currentEditKey: string;
  key1Select: string;
  key2Select: string;
  road: string;
}

let initialState: TierListStateType = {
  tierLists: {},
  currentEditKey: 'AE-CII',
  key1Select: 'AE',
  key2Select: 'CII',
  road: 'CII',
};

export const TierListSlice = createSlice({
  name: 'tierList',
  initialState,
  reducers: {
    // 初始化一个对应 key 的 TierList
    addTierList: (state, action: PayloadAction<string>) => {
      const initialTierList: TierList = {
        id: '',
        name: 'tierList',
        key: action.payload,
        value: 1,
        tiers: [
          {
            value: 0,
            name: 'T 0',
            characterKeys: [],
          },
          {
            value: 1,
            name: 'T 1',
            characterKeys: [],
          },
          {
            value: 2,
            name: 'T 2',
            characterKeys: [],
          },
          {
            value: 3,
            name: 'T 3',
            characterKeys: [],
          },
          {
            value: 4,
            name: 'T 4',
            characterKeys: [],
          },
        ],
      };

      state.tierLists = { ...state.tierLists, [action.payload]: initialTierList };
    },
    updateTierList: (state, action: PayloadAction<{ tierList: TierList; key: string }>) => {
      state.tierLists[action.payload.key] = action.payload.tierList;
    },
    updateEditingTierList: (state, action: PayloadAction<{ tierList: TierList }>) => {
      state.tierLists[state.currentEditKey] = action.payload.tierList;
    },
    delTierList: (state, action: PayloadAction<{ key: string }>) => {
      delete state.tierLists[action.payload.key];
    },
    updateTierLists: (state, action: PayloadAction<TierLists>) => {
      state.tierLists = action.payload;
    },
    resetTierLists: (state) => {
      state.tierLists = {};
    },
    updateEditKey1: (state, action: PayloadAction<string>) => {
      state.key1Select = action.payload;
    },
    updateEditKey2: (state, action: PayloadAction<{ key: string; road: string }>) => {
      state.currentEditKey = state.key1Select + '-' + action.payload.road;
      state.key2Select = action.payload.key;
      state.road = action.payload.road;
    },
  },
});

export const {
  addTierList,
  updateTierList,
  updateEditingTierList,
  updateTierLists,
  resetTierLists,
  updateEditKey1,
  updateEditKey2,
} = TierListSlice.actions;

export default TierListSlice.reducer;

export function editingTierList(state: RootState) {
  return state.tierList.tierLists[state.tierList.currentEditKey] ?? { tiers: [] };
}
