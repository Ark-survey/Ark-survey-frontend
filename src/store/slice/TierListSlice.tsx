import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TierList, TierLists } from 'src/service/TierListServer';
import { RootState } from '..';

export interface TierListStateType {
  tierLists: TierLists;
  currentEditKey: string;
}

let initialState: TierListStateType = {
  tierLists: {},
  currentEditKey: 'AE-CII',
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
            name: '',
            characterKeys: [],
          },
          {
            value: 1,
            name: '',
            characterKeys: [],
          },
          {
            value: 2,
            name: '',
            characterKeys: [],
          },
          {
            value: 3,
            name: '',
            characterKeys: [],
          },
          {
            value: 4,
            name: '',
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
    updateCurrentEditKey: (state, action: PayloadAction<string>) => {
      state.currentEditKey = action.payload;
    },
  },
});

export const {
  addTierList,
  updateTierList,
  updateEditingTierList,
  updateTierLists,
  resetTierLists,
  updateCurrentEditKey,
} = TierListSlice.actions;

export default TierListSlice.reducer;

export function editingTierList(state: RootState) {
  return state.tierList.tierLists[state.tierList.currentEditKey] ?? { tiers: [] };
}
