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

export interface CharacterType {
  key: string;
  id?: string;
  name?: string;
  profession?: string;
  sex?: string;
  rarity?: number;
  deployment?: string;
  accessChannel?: string;
  ts?: number;
  imgUrl?: string;
  picked?: boolean;
  selecting?: boolean;
}

export interface UserType {
  menuOpen: boolean;
  newTierList: boolean;
  viewPageId: string;
  version: string;
  userData?: User;
  imgPosition: ImgPosition;
  charData: { [key: string]: CharacterType };
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
  charData: {},
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
    updateCharData: (state, action: PayloadAction<{ [key: string]: CharacterType }>) => {
      state.charData = action.payload;
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
  updateCharData,
} = userSlice.actions;

export default userSlice.reducer;
