import { ImgMetaDataKey } from 'src/components/@arksurvey/ImageSprite';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface CharacterType {
  key: string;
  equips: { [key: string]: { name: string } };
  isNotObtainable: false;
  isSpChar: false;
  maxPotentialLevel: number;
  name: string;
  nationId: string;
  position: string;
  profession: string;
  rarity: number;
  skills: { [key: string]: { index: number; name: string; iconId: string } };
  skins: { [key: string]: { name: string } };
  subProfessionId: string;
  tagList: string[];
  ts?: number;
  accessChannel?: string;
  selecting?: boolean;
  picked?: boolean;
}

export type ImgPosition = Record<ImgMetaDataKey, { [key: string]: [number, number] }>;

// data map
// img position map

export interface BaseDataState {
  charMap: { [key: string]: CharacterType };
  imgPositionMap: ImgPosition;
  setCharMap: (charMap: { [key: string]: CharacterType }) => void;
  setImgPositionMap: (imgPositionMap: any) => void;
}

export const useDataMap = create<BaseDataState>((set, get) => ({
  charMap: {},
  imgPositionMap: { skill: {}, avatar: {}, equip: {} },
  setCharMap: (charMap) => set((state) => ({ ...state, charMap })),
  setImgPositionMap: (imgPositionMap) => set((state) => ({ ...state, imgPositionMap })),
}));

// meta data

export interface MetaDataState {
  user: { id: string };
  version: string;
  setUser: (user: any) => void;
  setVersion: (version: any) => void;
}

export const useMeta = create(
  persist<MetaDataState>(
    (set) => ({
      user: { id: '' },
      version: '',
      setUser: (user) => set((state) => ({ ...state, user })),
      setVersion: (version) => set((state) => ({ ...state, version })),
    }),
    {
      name: 'meta-storage', // name of item in the storage (must be unique)
    },
  ),
);

// Setting: all in one by key-value

type SettingKeys = 'charBoxEditing' | 'nameDisplay' | 'mini' | 'menuOpened';

export interface SettingState {
  setting: { [key in SettingKeys]: boolean };
  setSettingKeyValue: (key: SettingKeys, value: boolean) => void;
}

export const useSetting = create<SettingState>((set) => ({
  setting: { charBoxEditing: false, nameDisplay: false, mini: true, menuOpened: false },
  setSettingKeyValue: (key, value) =>
    set((state) => ({
      setting: {
        ...state.setting,
        [key]: value,
      },
    })),
}));
