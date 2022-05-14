import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserType {
  newTierList: boolean,
  viewPageId: string,
  version: string
}

const initialState: UserType = {
  newTierList: false,
  viewPageId: 'tier-list-commit',
  version: 'v0.1.7'
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateNewTierListStatus: (state, action: PayloadAction<boolean>) => {
      state.newTierList = action.payload
    },
    updateViewPageId: (state, action: PayloadAction<string>) => {
      state.viewPageId = action.payload
    },
  },
})

export const { updateNewTierListStatus, updateViewPageId } = userSlice.actions

export default userSlice.reducer