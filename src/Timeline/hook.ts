import { useCallback, useRef } from "react";
import type { MouseEvent, UIEvent } from "react";

import { useTimelineStore } from "./Store";
import { getNum, getValidTime, getFormattedNumForRuler } from "./util";

export const useControlPlayHead = () => {
  const isMoving = useRef(false);
  const setCurrentMinDuration = useTimelineStore(
    (state) => state.setCurrentMinDuration
  );
  const currentMaxDuration = useTimelineStore(
    (state) => state.currentMaxDuration
  );
  const currentMinDuration = useTimelineStore(
    (state) => state.currentMinDuration
  );

  const onMouseDown = useCallback(() => {
    isMoving.current = true;
  }, [isMoving]);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!isMoving.current) return;
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
    [isMoving, setCurrentMinDuration, currentMaxDuration, currentMinDuration]
  );

  const onMouseUp = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (isMoving.current) {
        const target = e.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const validTime = getValidTime({
          time: getFormattedNumForRuler(`${offsetX}`),
          maxTime: `${currentMaxDuration}`,
          preTime: `${currentMinDuration}`,
        });
        setCurrentMinDuration(getNum(validTime));
      }
      isMoving.current = false;
    },
    [isMoving, setCurrentMinDuration, currentMaxDuration, currentMinDuration]
  );

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
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
