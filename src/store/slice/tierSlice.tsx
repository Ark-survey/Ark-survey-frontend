import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tier, UserTierList } from "src/api/TierListServer";

const initialState: UserTierList = {
  name: '等级表',
  tierList: [
    {
      value: 0,
      characterIds: [],
    },
    {
      value: 1,
      characterIds: [],
    },
    {
      value: 2,
      characterIds: [],
    },
    {
      value: 3,
      characterIds: [],
    },
    {
      value: 4,
      characterIds: [],
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
    addCharacterByTier: (state, action: PayloadAction<{ tierValue: number, characterId: string }>) => {
      const tierIndex = state.tierList.findIndex(item => item.value === action.payload.tierValue);
      state.tierList[tierIndex].characterIds.push(action.payload.characterId);
    },
    delCharacterByTier: (state, action: PayloadAction<{ tierValue: number, characterId: string }>) => {
      const tierIndex = state.tierList.findIndex(item => item.value === action.payload.tierValue);
      state.tierList[tierIndex].characterIds = state.tierList[tierIndex].characterIds.filter(item => !(item === action.payload.characterId));
    },
    delAllCharacterByTier: (state, action: PayloadAction<{ tierValue: number }>) => {
      const tierIndex = state.tierList.findIndex(item => item.value === action.payload.tierValue);
      state.tierList[tierIndex].characterIds = [];
    },
  },
})

export const { loadUserTierList, addTier, delTier, updateTierValue, addCharacterByTier, delAllCharacterByTier, delCharacterByTier } = tierSlice.actions

export default tierSlice.reducer