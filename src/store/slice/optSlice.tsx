import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { opData } from "src/contexts";

export interface OptType {
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

const initialState: OptType[] = opData.map(item => ({
  ...item,
  picked: false,
  selecting: false
})) as OptType[]

export const optSlice = createSlice({
  name: 'opts',
  initialState,
  reducers: {
    updateOptSelecting: (state, action: PayloadAction<{ optIndex: number, value: boolean }>) => {
      state[action.payload.optIndex].selecting = action.payload.value
    },
    updateOptPicked: (state, action: PayloadAction<{ optIndex: number, value: boolean }>) => {
      state[action.payload.optIndex].picked = action.payload.value
    },
    updateAllOptPicked: (state, action: PayloadAction<boolean>) => {
      state.forEach((item) => {
        item.picked = action.payload
      })
    },
  },
})

export const { updateOptPicked, updateAllOptPicked, updateOptSelecting } = optSlice.actions

export default optSlice.reducer