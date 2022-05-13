import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserType {
  newTierList: boolean,
}

const initialState: UserType = {
  newTierList: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateNewTierListStatus: (state, action: PayloadAction<boolean>) => {
      state.newTierList = action.payload
    },
  },
})

export const { updateNewTierListStatus } = userSlice.actions

export default userSlice.reducer