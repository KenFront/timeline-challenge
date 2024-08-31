import { useCallback } from "react";
import type { MouseEvent, UIEvent } from "react";

import { useTimelineStore } from "./Store";
import { getNum, getValidTime, getFormattedNumForRuler } from "./util";

export const useControlPlayHead = () => {
  const setCurrentMinDuration = useTimelineStore(
    (state) => state.setCurrentMinDuration
  );
  const currentMaxDuration = useTimelineStore(
    (state) => state.currentMaxDuration
  );
  const currentMinDuration = useTimelineStore(
    (state) => state.currentMinDuration
  );
  const onClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const target = e.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const validTime = getValidTime({
        time: getFormattedNumForRuler(`${offsetX}`),
        maxTime: `${currentMaxDuration}`,
        preTime: `${currentMinDuration}`,
      });
      setCurrentMinDuration(getNum(validTime));
    },
    [setCurrentMinDuration, currentMaxDuration, currentMinDuration]
  );

  const onDragOver = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);
  const onDrop = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const validTime = getValidTime({
        time: getFormattedNumForRuler(`${offsetX}`),
        maxTime: `${currentMaxDuration}`,
        preTime: `${currentMinDuration}`,
      });
      setCurrentMinDuration(getNum(validTime));
    },
    [setCurrentMinDuration, currentMaxDuration, currentMinDuration]
  );

  return {
    onClick,
    onDragOver,
    onDrop,
  };
};

export const useSharedScrollTop = () => {
  const setSharedScrollTop = useTimelineStore(
    (state) => state.setSharedScrollTop
  );
  const onScroll = useCallback(
    (e: UIEvent<HTMLElement>) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      setSharedScrollTop(target.scrollTop);
    },
    [setSharedScrollTop]
  );
  return {
    onScroll,
  };
};

export const useSharedScrollLeft = () => {
  const setSharedScrollLeft = useTimelineStore(
    (state) => state.setSharedScrollLeft
  );
  const onScroll = useCallback(
    (e: UIEvent<HTMLElement>) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      setSharedScrollLeft(target.scrollLeft);
    },
    [setSharedScrollLeft]
  );
  return {
    onScroll,
  };
};
