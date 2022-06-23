import create from 'zustand';
import { Character } from 'src/service/CharBoxServer';

export interface CharBoxState {
  charBoxId: string;
  charInBox: { [key: string]: Character };
  charSelectInBox: string[];
  charSelectOutBox: string[];
  editingCharKey: string;
  /**
   * @description 更新整个干员盒，用于数据回显
   * @param chars { [key: string]: Character } 干员对象
   */
  updateCharInBox: (chars: { [key: string]: Character }) => void;
  /**
   * @description 更新正在编辑的干员
   * @param char Character 干员对象
   */
  updateEditingChar: (char: Character) => void;
  /**
   * @description 干员盒批量添加干员
   * @param chars { [key: string]: Character } 干员对象
   */
  addCharToBox: (chars: { [key: string]: Character }) => void;
  /**
   * @description 干员盒批量删除干员
   * @param keys string[] 干员key数组
   */
  delCharFromBox: (keys: string[]) => void;
  /**
   * @description 更新编辑中的干员
   * @param key string 干员 key
   */
  updateEditingCharKey: (key: string) => void;
  /**
   * @description 更新选择的 box 中干员
   * @param keys string[] 干员key数组
   */
  updateCharSelectInBox: (keys: string[]) => void;
  /**
   * @description 更新选择的 box 外干员
   * @param keys string[] 干员key数组
   */
  updateCharSelectOutBox: (keys: string[]) => void;
  /**
   * @description 更新 box id
   * @param id string charBox id
   */
  updateCharBoxId: (keys: string) => void;
}

export const useCharBox = create<CharBoxState>((set) => ({
  charBoxId: '',
  charInBox: {},
  charSelectInBox: [],
  charSelectOutBox: [],
  editingCharKey: '',
  updateCharInBox: (chars) =>
    set((state) => ({
      ...state,
      charInBox: {
        ...chars,
      },
    })),
  updateEditingChar: (char) =>
    set((state) => {
      const c = { ...state.charInBox };
      c[char.key] = { ...char };
      return {
        ...state,
        charInBox: c,
      };
    }),
  addCharToBox: (chars) =>
    set((state) => ({
      ...state,
      charInBox: {
        ...state.charInBox,
        ...chars,
      },
    })),
  delCharFromBox: (keys) =>
    set((state) => {
      const charsT = { ...state.charInBox };
      keys.forEach((key) => delete charsT.charInBox[key]);
      return {
        ...state,
        charInBox: charsT,
      };
    }),
  updateEditingCharKey: (key) =>
    set((state) => ({
      ...state,
      editingCharKey: key,
    })),
  updateCharSelectInBox: (keys) =>
    set((state) => ({
      ...state,
      charSelectInBox: keys,
    })),
  updateCharSelectOutBox: (keys) =>
    set((state) => ({
      ...state,
      charSelectInBox: keys,
    })),
  updateCharBoxId: (key) =>
    set((state) => ({
      ...state,
      charBoxId: key,
    })),
}));
