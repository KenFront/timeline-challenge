import { create } from "zustand";

import { MAX_TIME } from "./Constant";

export type TimelineState = {
  currentMinDuration: number;
  currentMaxDuration: number;
};

type TimelineActions = {
  setCurrentMinDuration: (val: number) => void;
  setCurrentMaxDuration: (val: number) => void;
};

const getInitStates: () => TimelineState = () => ({
  currentMinDuration: 0,
  currentMaxDuration: MAX_TIME,
});

export const useTimelineStore = create<TimelineState & TimelineActions>(
  (set) => ({
    ...getInitStates(),
    setCurrentMinDuration: (val) =>
      set(() => ({ currentMinDuration: val })),
    setCurrentMaxDuration: (val) => set(() => ({ currentMaxDuration: val })),
  })
);
