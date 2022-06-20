import create from 'zustand';

// tier list box select keys
export interface StatisticsKeyState {
  statisticsKey: string;
  setStatisticsKey: (key: string) => void;
}

export const useStatisticsKey = create<StatisticsKeyState>((set) => ({
  statisticsKey: '',
  setStatisticsKey: (key: string) => set(() => ({ statisticsKey: key })),
}));
