import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/api/UserServer';

export interface ImgPosition {
  skillImgPosition: {
    [key: string]: [number, number];
  };
  avatarImgPosition: {
    [key: string]: [number, number];
  };
  uniEquipImgPosition: {
    [key: string]: [number, number];
  };
}

export interface UserType {
  menuOpen: boolean;
  newTierList: boolean;
  viewPageId: string;
  version: string;
  userData?: User;
  imgPosition: ImgPosition;
}

const initialState: UserType = {
  menuOpen: false,
  newTierList: false,
  viewPageId: 'tier-list-commit',
  version: '',
  userData: {
    id: '',
  },
  imgPosition: { skillImgPosition: {}, avatarImgPosition: {}, uniEquipImgPosition: {} },
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
    updateImgPosition: (state, action: PayloadAction<any>) => {
      state.imgPosition = action.payload;
    },
  },
});

export const {
  updateNewTierListStatus,
  updateViewPageId,
  updateVersion,
  updateMenuOpen,
  updateUserData,
  updateImgPosition,
} = userSlice.actions;

export default userSlice.reducer;
