import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tier, UserTierList } from 'src/api/TierListServer';

const initialState: UserTierList = {
  name: 'tierList',
  tierList: [
    {
      value: 0,
      characterKeys: [],
    },
    {
      value: 1,
      characterKeys: [],
    },
    {
      value: 2,
      characterKeys: [],
    },
    {
      value: 3,
      characterKeys: [],
    },
    {
      value: 4,
      characterKeys: [],
    },
  ],
  type: 'NORMAL',
};

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
    resetUserTierList: (state) => {
      state.tierList = [
        {
          value: 0,
          characterKeys: [],
        },
        {
          value: 1,
          characterKeys: [],
        },
        {
          value: 2,
          characterKeys: [],
        },
        {
          value: 3,
          characterKeys: [],
        },
        {
          value: 4,
          characterKeys: [],
        },
      ];
    },
    addTier: (state, action: PayloadAction<Tier>) => {
      state.tierList.push(action.payload);
      state.tierList.sort((a, b) => a.value - b.value);
    },
    delTier: (state, action: PayloadAction<{ tierValue: number }>) => {
      const tierIndex = state.tierList.findIndex((item) => item.value === action.payload.tierValue);
      state.tierList.splice(tierIndex, 1);
    },
    updateTierValue: (state, action: PayloadAction<{ tierValue: number; value: number }>) => {
      const tierIndex = state.tierList.findIndex((item) => item.value === action.payload.tierValue);
      state.tierList[tierIndex].value = action.payload.value;
      state.tierList.sort((a, b) => a.value - b.value);
    },
    updateTierName: (state, action: PayloadAction<{ tierValue: number; value: string }>) => {
      const tierIndex = state.tierList.findIndex((item) => item.value === action.payload.tierValue);
      state.tierList[tierIndex].name = action.payload.value;
    },
    addCharacterByTier: (state, action: PayloadAction<{ tierValue: number; key: string }>) => {
      const tierIndex = state.tierList.findIndex((item) => item.value === action.payload.tierValue);
      state.tierList[tierIndex].characterKeys.push(action.payload.key);
    },
    delCharacterByTier: (state, action: PayloadAction<{ tierValue: number; key: string }>) => {
      const tierIndex = state.tierList.findIndex((item) => item.value === action.payload.tierValue);
      state.tierList[tierIndex].characterKeys = state.tierList[tierIndex].characterKeys.filter(
        (item) => !(item === action.payload.key),
      );
    },
    delAllCharacterByTier: (state, action: PayloadAction<{ tierValue: number }>) => {
      const tierIndex = state.tierList.findIndex((item) => item.value === action.payload.tierValue);
      state.tierList[tierIndex].characterKeys = [];
    },
  },
});

export const {
  loadUserTierList,
  resetUserTierList,
  addTier,
  delTier,
  updateTierValue,
  updateTierName,
  addCharacterByTier,
  delAllCharacterByTier,
  delCharacterByTier,
} = tierSlice.actions;

export default tierSlice.reducer;
