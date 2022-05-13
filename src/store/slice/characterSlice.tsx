import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { opData } from "src/contexts";

export interface CharacterType {
  id: string,
  name: string,
  profession: string,
  sex: string,
  rate: number,
  deployment: string,
  accessChannel: string,
  ts: number,
  imgUrl: string,
  picked: boolean,
  selecting: boolean
}

const initialState: CharacterType[] = opData.map(item => ({
  ...item,
  picked: false,
  selecting: false
})) as CharacterType[]

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    updateCharacterSelecting: (state, action: PayloadAction<{ characterIndex: number, value: boolean }>) => {
      state[action.payload.characterIndex].selecting = action.payload.value
    },
    updateCharacterPicked: (state, action: PayloadAction<{ characterIndex: number, value: boolean }>) => {
      state[action.payload.characterIndex].picked = action.payload.value
    },
    updateAllCharacterPicked: (state, action: PayloadAction<boolean>) => {
      state.forEach((item) => {
        item.picked = action.payload
      })
    },
  },
})

export const { updateCharacterPicked, updateAllCharacterPicked, updateCharacterSelecting } = characterSlice.actions

export default characterSlice.reducer