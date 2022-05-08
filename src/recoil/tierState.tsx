import { atom } from "recoil";

export interface Tier {
  value: number;
  optIds: string[];
}

const tierState = atom({
  key: 'tierState',
  default: [
    {
      value: 0,
      optIds: [],
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
  ] as Tier[],
});

export { tierState }