import { atom } from "recoil";

export interface Tier {
  value: number;
  optIds: string[];
}

const initialState: Tier[] = [
  {
    value: 0,
    optIds: ['夜莺'],
  },
  {
    value: 0.5,
    optIds: [],
  },
  {
    value: 1,
    optIds: [],
  },
  {
    value: 1.5,
    optIds: [],
  },
  {
    value: 2,
    optIds: [],
  },
  {
    value: 3,
    optIds: [],
  },
  {
    value: 4,
    optIds: [],
  }
]

const tierState = atom({
  key: 'tierState',
  default: initialState,
});

export { tierState }