import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TierList, TierLists } from 'src/api/TierListServer';

export interface TierListStateType {
  currentKey: string;
  key1Select: string;
  key2Select: string;
  road: string;
}

let initialState: TierListStateType = {
  currentKey: 'AE-CII',
  key1Select: 'AE',
  key2Select: 'CII',
  road: 'CII',
};

export const TierListStatisticsSlice = createSlice({
  name: 'tierList',
  initialState,
  reducers: {
    updateCurrentKey: (state, action: PayloadAction<string>) => {
      state.currentKey = action.payload;
    },
    updateKey1: (state, action: PayloadAction<string>) => {
      state.key1Select = action.payload;
    },
    updateKey2: (state, action: PayloadAction<{ key: string; road: string }>) => {
      state.currentKey = state.key1Select + '-' + action.payload.road;
      state.key2Select = action.payload.key;
      state.road = action.payload.road;
    },
  },
});

export const { updateCurrentKey, updateKey1, updateKey2 } = TierListStatisticsSlice.actions;

export default TierListStatisticsSlice.reducer;
