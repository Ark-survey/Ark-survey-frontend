import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Tier {
  value: number;
  optIds: string[];
}

const initialState: Tier[] = [
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
]

export const tierSlice = createSlice({
  name: 'tiers',
  initialState,
  reducers: {
    addTier: (state, action: PayloadAction<Tier>) => {
      state.push(action.payload);
      state.sort((a,b)=>a.value - b.value);
    },
    delTier: (state, action: PayloadAction<{tierIndex:number}>) => {
      state.splice(action.payload.tierIndex,1);
    },
    updateTierValue: (state, action: PayloadAction<{tierIndex:number, value: number}>) => {
      state[action.payload.tierIndex].value = action.payload.value;
      state.sort((a,b)=>a.value - b.value);
    },
    addOptByTier: (state, action: PayloadAction<{tierIndex:number, optId: string}>) => {
      state[action.payload.tierIndex].optIds.push(action.payload.optId);
    },
    delOptByTier: (state, action: PayloadAction<{tierIndex:number, optId: string}>) => {
      state[action.payload.tierIndex].optIds = state[action.payload.tierIndex].optIds.filter(item => !(item === action.payload.optId));
    },
    delAllOptByTier: (state, action: PayloadAction<{ tierIndex: number }>) => {
      state[action.payload.tierIndex].optIds = [];
    },
  },
})

export const { addTier, delTier, updateTierValue, addOptByTier, delAllOptByTier, delOptByTier } = tierSlice.actions

export default tierSlice.reducer