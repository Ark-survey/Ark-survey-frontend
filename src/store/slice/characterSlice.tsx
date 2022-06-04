import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAllMapAttr, setMapAttr } from 'src/utils/ObjectUtils';
import { CharacterType } from './userSlice';

let initialState: { charMap: { [key: string]: CharacterType } } = {
  charMap: {},
};

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
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
    updateCharMap: (state, action: PayloadAction<{ [key: string]: CharacterType }>) => {
      state.charMap = action.payload;
    },
  },
});

export const {
  updateCharacterPicked,
  updateCharacter,
  updateAllCharacterPicked,
  updateAllCharacterSelecting,
  updateCharacterSelecting,
  updateCharMap,
} = characterSlice.actions;

export default characterSlice.reducer;
