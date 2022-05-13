
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterType {
  chipGroup: { [x: string]: any[] };
  dateRange: [number, number];
  fold: boolean;
  nameDisplay: boolean;
  mini: boolean;
}

const initialState: FilterType = {
  mini: true,
  fold: true,
  nameDisplay: false,
  chipGroup: {
    opRate: [],
    profession: [],
    sex: [],
    rarity: [5],
    position: [],
    accessChannel: [],
  },
  dateRange: [0, 100],
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // replaceFilters: (state, action: PayloadAction<FilterType>) => {
    //   state = action.payload
    // },
    changeFold: (state, action: PayloadAction<boolean>) => {
      state.fold = action.payload
    },
    changeChipGroup: (state, action: PayloadAction<{ [x: string]: string[] }>) => {
      state.chipGroup = action.payload
    },
    changeDateRange: (state, action: PayloadAction<[number, number]>) => {
      state.dateRange = action.payload
    },
    changeNameDisplay: (state, action: PayloadAction<boolean>) => {
      state.nameDisplay = action.payload
    },
    changeMini: (state, action: PayloadAction<boolean>) => {
      state.mini = action.payload
    },
    reset: (state) => {
      state.chipGroup = {
        opRate: [],
        profession: [],
        sex: [],
        rarity: [5],
        deployment: [],
        accessChannel: [],
      };
      state.dateRange = [0, 100]
    },
  },
})

export const { changeDateRange, changeFold, changeChipGroup, changeNameDisplay, changeMini, reset } = filterSlice.actions

export default filterSlice.reducer

export const filterHeightState = (state: any) => {
  let sum = 0
  for (let i in state.filters.chipGroup) {
    if (state.filters.chipGroup[i].length > 0) sum++
  }
  if (state.filters.dateRange[0] !== 0 || state.filters.dateRange[1] !== 100) sum++
  if (sum <= 1)
    return state.filters.fold ? 40 : 590
  else
    return state.filters.fold ? 40 + (sum - 1) * 22 : 590
};

export const filterOpenState = (state: any) => {
  let flag = false;
  for (let f in state.filters.chipGroup) {
    if (state.filters.chipGroup[f].length !== 0) flag = true;
  }
  if (state.filters.dateRange[0] !== 0 || state.filters.dateRange[1] !== 100)
    flag = true;
  return flag;
}