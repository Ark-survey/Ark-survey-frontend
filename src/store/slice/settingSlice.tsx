import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingType {
  charBoxEditing: boolean;
}

const initialState: SettingType = {
  charBoxEditing: false,
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateCharBoxEditing: (state, action: PayloadAction<boolean>) => {
      state.charBoxEditing = action.payload;
    },
  },
});

export const { updateCharBoxEditing } = settingSlice.actions;

export default settingSlice.reducer;
