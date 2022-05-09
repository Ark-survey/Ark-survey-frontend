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
  selected: boolean
}

const initialState: OptType[] = opData.map(item => ({
  ...item,
  selected: false
})) as OptType[]

export const optSlice = createSlice({
  name: 'opts',
  initialState,
  reducers: {
    updateOptSelected: (state, action: PayloadAction<{optIndex:number,value:boolean}>) => {
      state[action.payload.optIndex].selected = action.payload.value
    },
    updateAllOptSelected: (state, action: PayloadAction<boolean>) => {
      state.forEach((item) => {
        item.selected = action.payload
      }) 
    },
  },
})

export const { updateOptSelected, updateAllOptSelected } = optSlice.actions

export default optSlice.reducer