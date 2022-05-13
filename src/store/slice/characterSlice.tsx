import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { characterDataLoad } from "src/utils/JSONLoadUtils";
import { setAllMapAttr, setMapAttr } from "src/utils/ObjectUtils";

export interface CharacterType {
  key: string,
  id?: string,
  name?: string,
  profession?: string,
  sex?: string,
  rarity?: number,
  deployment?: string,
  accessChannel?: string,
  ts?: number,
  imgUrl?: string,
  picked?: boolean,
  selecting?: boolean
}

let initialState: { charMap: { [key: string]: CharacterType } } = {
  charMap: characterDataLoad()
}

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    updateCharacter: (state, action: PayloadAction<{ [key: string]: CharacterType }>) => {
      state.charMap = action.payload
    },
    updateCharacterSelecting: (state, action: PayloadAction<{ key: string, selecting: boolean }>) => {
      state.charMap = setMapAttr(state.charMap, action.payload.key, { selecting: action.payload.selecting })
    },
    updateCharacterPicked: (state, action: PayloadAction<{ key: string, picked: boolean }>) => {
      state.charMap = setMapAttr(state.charMap, action.payload.key, { picked: action.payload.picked })
    },
    updateAllCharacterPicked: (state, action: PayloadAction<boolean>) => {
      state.charMap = setAllMapAttr(state.charMap, { picked: action.payload })
    },
  },
})

export const { updateCharacterPicked, updateCharacter, updateAllCharacterPicked, updateCharacterSelecting } = characterSlice.actions

export default characterSlice.reducer