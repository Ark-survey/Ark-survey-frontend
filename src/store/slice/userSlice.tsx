import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/api/UserServer';

export interface UserType {
  menuOpen: boolean;
  newTierList: boolean;
  viewPageId: string;
  version: string;
  userData: User;
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
    updateUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
  },
});

export const { updateNewTierListStatus, updateViewPageId, updateVersion, updateMenuOpen, updateUserData } =
  userSlice.actions;

export default userSlice.reducer;
