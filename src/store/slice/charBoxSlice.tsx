import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from 'src/api/CharBoxServer';

export interface CharBoxType {
  charInBox: { [key: string]: Character };
  editingCharKey: string;
}

const initialState: CharBoxType = {
  charInBox: {
    char_291_aglina: {
      key: 'char_291_aglina',
      potentialLevel: 6,
      elite: 2,
      level: 70,
      trust: 190,
      skill: {
        skchr_aglina_1: {
          key: 'skchr_aglina_1',
          level: 8,
        },
        skchr_aglina_2: {
          key: 'skchr_aglina_2',
          level: 9,
        },
        skchr_aglina_3: {
          key: 'skchr_aglina_3',
          level: 10,
        },
      },
      module: {
        default: {
          key: 'default',
          level: 1,
        },
        uniequip_002_aglina: {
          key: 'uniequip_002_aglina',
          level: 1,
        },
      },
      moduleUse: 'uniequip_002_aglina',
      skillUse: 'skchr_aglina_3',
      skinUse: 'char_291_aglina_summer#5',
      favorite: false,
    },
    char_003_kalts: {
      key: 'char_003_kalts',
      potentialLevel: 1,
      elite: 2,
      level: 90,
      trust: 200,
      skill: {
        skchr_kalts_1: {
          key: 'skchr_kalts_1',
          level: 7,
        },
        skchr_kalts_2: {
          key: 'skchr_kalts_2',
          level: 10,
        },
        skchr_kalts_3: {
          key: 'skchr_kalts_3',
          level: 10,
        },
      },
      module: {},
      moduleUse: '',
      skillUse: 'skchr_kalts_3',
      skinUse: 'char_003_kalts',
      favorite: false,
    },
  },
  editingCharKey: 'char_291_aglina',
};

export const charBoxSlice = createSlice({
  name: 'charBox',
  initialState,
  reducers: {
    /**
     * @ description: 更新整个干员盒，用于数据回显
     * @ param obj: { [key: string]: Character } 干员对象
     */
    updateCharInBox: (state, action: PayloadAction<{ [key: string]: Character }>) => {
      state.charInBox = action.payload;
    },
    /**
     * @ description: 更新正在编辑的干员
     * @ param obj: Character 干员对象
     */
    updateEditingChar: (state, action: PayloadAction<Character>) => {
      const c = { ...state.charInBox };
      c[action.payload.key] = { ...action.payload };
      state.charInBox = c;
    },
    /**
     * @ description: 干员盒批量添加干员
     * @ param obj: { [key: string]: Character } 干员对象
     */
    addCharToBox: (state, action: PayloadAction<{ [key: string]: Character }>) => {
      state.charInBox = { ...state.charInBox, ...action.payload };
    },
    /**
     * @ description: 干员盒批量删除干员
     * @ param keys: string[] 干员key数组
     */
    delCharFromBox: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((key) => {
        delete state.charInBox[key];
      });
    },
    /**
     * @ description: 更新编辑中的干员
     * @ param key: string 干员 key
     */
    updateEditingCharKey: (state, action: PayloadAction<string>) => {
      state.editingCharKey = action.payload;
    },
  },
});

export const { updateCharInBox, updateEditingChar, addCharToBox, delCharFromBox, updateEditingCharKey } =
  charBoxSlice.actions;

export default charBoxSlice.reducer;
