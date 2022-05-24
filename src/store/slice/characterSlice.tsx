import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { characterDataLoad, getCharacterImgUrl } from 'src/utils/JSONLoadUtils';
import { setAllMapAttr, setMapAttr } from 'src/utils/ObjectUtils';

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

let initialState: { charMap: { [key: string]: CharacterType } } = {
  charMap: characterDataLoad(),
};

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    updateCharacterUrl: (state, action: PayloadAction<string>) => {
      state.charMap = getCharacterImgUrl(state.charMap, action.payload);
    },
    updateCharacter: (state, action: PayloadAction<{ [key: string]: CharacterType }>) => {
      state.charMap = action.payload;
    },
    updateCharacterSelecting: (state, action: PayloadAction<{ key: string; selecting: boolean }>) => {
      state.charMap = setMapAttr(state.charMap, action.payload.key, { selecting: action.payload.selecting });
    },
    updateAllCharacterSelecting: (state, action: PayloadAction<boolean>) => {
      state.charMap = setAllMapAttr(state.charMap, { selecting: action.payload });
    },
    updateCharacterPicked: (state, action: PayloadAction<{ key: string; picked: boolean }>) => {
      state.charMap = setMapAttr(state.charMap, action.payload.key, { picked: action.payload.picked });
    },
    updateAllCharacterPicked: (state, action: PayloadAction<boolean>) => {
      state.charMap = setAllMapAttr(state.charMap, { picked: action.payload });
    },
  },
});

export const {
  updateCharacterPicked,
  updateCharacterUrl,
  updateCharacter,
  updateAllCharacterPicked,
  updateAllCharacterSelecting,
  updateCharacterSelecting,
} = characterSlice.actions;

export default characterSlice.reducer;
