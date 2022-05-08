import { atom, selector } from "recoil";

export interface FilterType {
  chipGroup: { [x: string]: string[] };
  dateRange: [number, number];
  fold: boolean;
}

const initialState: FilterType = {
  fold: true,
  chipGroup: {
    opRate: [],
    profession: [],
    sex: [],
    rate: [],
    deployment: [],
    accessChannel: [],
  },
  dateRange: [0, 100],
}

const filterState = atom({
  key: 'filterState',
  default: initialState,
});

const filterHeightState = selector({
  key: 'filterHeightState',
  get: ({ get }) => {
    const filters = get(filterState);
    let sum = 0
    for (let i in filters.chipGroup) {
      if (filters.chipGroup[i].length > 0) sum++
    }
    if (filters.dateRange[0] !== 0 || filters.dateRange[1] !== 100) sum++
    if (sum <= 1)
      return filters.fold ? 40 : 590
    else
      return filters.fold ? 40 + (sum - 1) * 22 : 590
  },
});

const filterOpenState = selector({
  key: 'filterOpenState',
  get: ({ get }) => {
    const filters = get(filterState);
    let flag = false;
    for (let f in filters.chipGroup) {
      if (filters.chipGroup[f].length !== 0) flag = true;
    }
    if (filters.dateRange[0] !== 0 || filters.dateRange[1] !== 100)
      flag = true;
    return flag;
  },
});

export { filterState, filterHeightState, filterOpenState }