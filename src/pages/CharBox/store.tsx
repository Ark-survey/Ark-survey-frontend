import create from 'zustand';

export interface EditingCharKeyState {
  editingCharKey: string;
  /**
   * @description 更新编辑中的干员
   * @param key string 干员 key
   */
  updateEditingCharKey: (key: string) => void;
}

export const useEditingCharKey = create<EditingCharKeyState>((set) => ({
  editingCharKey: '',
  updateEditingCharKey: (key) =>
    set((state) => ({
      ...state,
      editingCharKey: key,
    })),
}));
