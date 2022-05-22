import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserType {
  menuOpen: boolean;
  newTierList: boolean;
  viewPageId: string;
  version: string;
  userData: {
    id: string;
    password?: string;
  };
}

const initialState: UserType = {
  menuOpen: false,
  newTierList: false,
  viewPageId: 'tier-list-commit',
  version: '',
  userData: {
    id: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.menuOpen = action.payload;
    },
    updateNewTierListStatus: (state, action: PayloadAction<boolean>) => {
      state.newTierList = action.payload;
    },
    updateViewPageId: (state, action: PayloadAction<string>) => {
      state.viewPageId = action.payload;
    },
    updateVersion: (state, action: PayloadAction<string>) => {
      state.version = action.payload;
    },
    updateUserData: (state, action: PayloadAction<string>) => {
      state.version = action.payload;
    },
  },
});

export const { updateNewTierListStatus, updateViewPageId, updateVersion, updateMenuOpen } = userSlice.actions;

export default userSlice.reducer;
