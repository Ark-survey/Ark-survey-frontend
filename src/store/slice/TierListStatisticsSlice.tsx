import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TierList, TierLists } from 'src/api/TierListServer';

export interface TierListStateType {
  currentKey: string;
}

let initialState: TierListStateType = {
  currentKey: '',
};

export const TierListStatisticsSlice = createSlice({
  name: 'tierList',
  initialState,
  reducers: {
    updateCurrentKey: (state, action: PayloadAction<string>) => {
      state.currentKey = action.payload;
    },
  },
});

export const { updateCurrentKey } = TierListStatisticsSlice.actions;

export default TierListStatisticsSlice.reducer;
