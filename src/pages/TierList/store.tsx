import create from 'zustand';

// tier list box select keys
export interface CharBoxSelectKeysState {
  selectKeys: string[];
  addSelectKeys: (keys: string[]) => void;
  delSelectKeys: (keys: string[]) => void;
  resetSelectKeys: () => void;
}

export const useCharBoxSelectKeys = create<CharBoxSelectKeysState>((set) => ({
  selectKeys: [],
  addSelectKeys: (keys: string[]) => set((state) => ({ selectKeys: [...state.selectKeys, ...keys] })),
  delSelectKeys: (keys: string[]) =>
    set((state) => ({ selectKeys: state.selectKeys.filter((it) => !keys.includes(it)) })),
  resetSelectKeys: () => set((state) => ({ selectKeys: [] })),
}));

// tier list box select keys
export interface TierListKeyState {
  tierListKey: string;
  setTierListKey: (key: string) => void;
}

export const useTierListKey = create<TierListKeyState>((set) => ({
  tierListKey: '',
  setTierListKey: (key: string) => set(() => ({ tierListKey: key })),
}));
