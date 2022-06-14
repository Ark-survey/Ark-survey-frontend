import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from 'src/api/CharBoxServer';
import { RootState } from '..';
import { CharacterType } from './userSlice';

export interface FilterType {
  chipGroup: { [x: string]: any[] };
  dateRange: [number, number];
  fold: boolean;
}

const initialState: FilterType = {
  fold: true,
  chipGroup: {
    opRate: [],
    profession: [],
    // sex: [],
    rarity: [5],
    position: [],
    // accessChannel: [],
  },
  dateRange: [0, 100],
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // replaceFilters: (state, action: PayloadAction<FilterType>) => {
    //   state = action.payload
    // },
    changeFold: (state, action: PayloadAction<boolean>) => {
      state.fold = action.payload;
    },
    changeChipGroup: (state, action: PayloadAction<{ [x: string]: string[] }>) => {
      state.chipGroup = action.payload;
    },
    changeDateRange: (state, action: PayloadAction<[number, number]>) => {
      state.dateRange = action.payload;
    },
    reset: (state) => {
      state.chipGroup = {
        // opRate: [],
        profession: [],
        // sex: [],
        rarity: [5],
        // accessChannel: [],
        position: [],
      };
      state.dateRange = [0, 100];
    },
  },
});

export const { changeDateRange, changeFold, changeChipGroup, reset } = filterSlice.actions;

export default filterSlice.reducer;

export const filterChar = (state: RootState) => {
  return (char: CharacterType) => {
    const g = state.filters.chipGroup;
    return (
      (g.rarity.length === 0 || g.rarity.includes(char.rarity)) &&
      (g.profession.length === 0 || g.profession.includes(char.profession)) &&
      (g.position.length === 0 || g.position.includes(char.position))
    );
  };
};
