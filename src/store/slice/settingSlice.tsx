import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingType {
  charBoxEditing: boolean;
  nameDisplay: boolean;
  mini: boolean;
}

const initialState: SettingType = {
  charBoxEditing: false,
  mini: true,
  nameDisplay: false,
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateCharBoxEditing: (state, action: PayloadAction<boolean>) => {
      state.charBoxEditing = action.payload;
    },
    changeNameDisplay: (state, action: PayloadAction<boolean>) => {
      state.nameDisplay = action.payload;
    },
    changeMini: (state, action: PayloadAction<boolean>) => {
      state.mini = action.payload;
    },
  },
});

export const { updateCharBoxEditing, changeNameDisplay, changeMini } = settingSlice.actions;

export default settingSlice.reducer;
