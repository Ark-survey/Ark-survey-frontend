import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tier, UserTierList } from "src/api/TierListServer";

const initialState: UserTierList = {
  name: '等级表',
  tierList: [
    {
      value: 0,
      optIds: [],
    },
    {
      value: 1,
      optIds: [],
    },
    {
      value: 2,
      optIds: [],
    },
    {
      value: 3,
      optIds: [],
    },
    {
      value: 4,
      optIds: [],
    }
  ],
  type: 'NORMAL',
}

export const tierSlice = createSlice({
  name: 'tiers',
  initialState,
  reducers: {
    loadUserTierList: (state, action: PayloadAction<UserTierList>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.type = action.payload.type;
      state.tierList = action.payload.tierList;
    },
    addTier: (state, action: PayloadAction<Tier>) => {
      state.tierList.push(action.payload);
      state.tierList.sort((a, b) => a.value - b.value);
    },
    delTier: (state, action: PayloadAction<{ tierValue: number }>) => {
      const tierIndex = state.tierList.findIndex(item => item.value === action.payload.tierValue);
      state.tierList.splice(tierIndex, 1);
    },
    updateTierValue: (state, action: PayloadAction<{ tierValue: number, value: number }>) => {
      const tierIndex = state.tierList.findIndex(item => item.value === action.payload.tierValue);
      state.tierList[tierIndex].value = action.payload.value;
      state.tierList.sort((a, b) => a.value - b.value);
    },
    addOptByTier: (state, action: PayloadAction<{ tierValue: number, optId: string }>) => {
      const tierIndex = state.tierList.findIndex(item => item.value === action.payload.tierValue);
      state.tierList[tierIndex].optIds.push(action.payload.optId);
    },
    delOptByTier: (state, action: PayloadAction<{ tierValue: number, optId: string }>) => {
      const tierIndex = state.tierList.findIndex(item => item.value === action.payload.tierValue);
      state.tierList[tierIndex].optIds = state.tierList[tierIndex].optIds.filter(item => !(item === action.payload.optId));
    },
    delAllOptByTier: (state, action: PayloadAction<{ tierValue: number }>) => {
      const tierIndex = state.tierList.findIndex(item => item.value === action.payload.tierValue);
      state.tierList[tierIndex].optIds = [];
    },
  },
})

export const { loadUserTierList, addTier, delTier, updateTierValue, addOptByTier, delAllOptByTier, delOptByTier } = tierSlice.actions

export default tierSlice.reducer