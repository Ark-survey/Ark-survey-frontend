import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from 'src/service/CharBoxServer';

export interface CharBoxType {
  charBoxId?: string;
  charInBox: { [key: string]: Character };
  charSelectInBox: string[];
  charSelectOutBox: string[];
  editingCharKey: string;
}

const initialState: CharBoxType = {
  charInBox: {},
  charSelectInBox: [],
  charSelectOutBox: [],
  editingCharKey: '',
};

export const charBoxSlice = createSlice({
  name: 'charBox',
  initialState,
  reducers: {
    /**
     * @description 更新整个干员盒，用于数据回显
     * @param obj { [key: string]: Character } 干员对象
     */
    updateCharInBox: (state, action: PayloadAction<{ [key: string]: Character }>) => {
      state.charInBox = action.payload;
    },
    /**
     * @description 更新正在编辑的干员
     * @param obj Character 干员对象
     */
    updateEditingChar: (state, action: PayloadAction<Character>) => {
      const c = { ...state.charInBox };
      c[action.payload.key] = { ...action.payload };
      state.charInBox = c;
    },
    /**
     * @description 干员盒批量添加干员
     * @param obj { [key: string]: Character } 干员对象
     */
    addCharToBox: (state, action: PayloadAction<{ [key: string]: Character }>) => {
      state.charInBox = { ...state.charInBox, ...action.payload };
    },
    /**
     * @description 干员盒批量删除干员
     * @param keys string[] 干员key数组
     */
    delCharFromBox: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((key) => {
        delete state.charInBox[key];
      });
    },
    /**
     * @description 更新编辑中的干员
     * @param key string 干员 key
     */
    updateEditingCharKey: (state, action: PayloadAction<string>) => {
      state.editingCharKey = action.payload;
    },
    /**
     * @description 更新选择的 box 中干员
     * @param key string 干员 key
     */
    updateCharSelectInBox: (state, action: PayloadAction<string[]>) => {
      state.charSelectInBox = action.payload;
    },
    /**
     * @description 更新选择的 box 外干员
     * @param key string 干员 key
     */
    updateCharSelectOutBox: (state, action: PayloadAction<string[]>) => {
      state.charSelectOutBox = action.payload;
    },
    /**
     * @description 更新 box id
     * @param id string charBox id
     */
    updateCharBoxId: (state, action: PayloadAction<string>) => {
      state.charBoxId = action.payload;
    },
  },
});

export const {
  updateCharInBox,
  updateEditingChar,
  addCharToBox,
  delCharFromBox,
  updateEditingCharKey,
  updateCharBoxId,
} = charBoxSlice.actions;

export default charBoxSlice.reducer;
