import { useCallback, useRef } from "react";
import type { MouseEvent, UIEvent } from "react";
import { throttle } from "throttle-debounce";

import { useTimelineStore } from "./Store";
import { getNum, getValidTime, getFormattedNumForRuler } from "./util";

export const useControlPlayHead = () => {
  const isMoving = useRef(false);
  const scrollZones = useRef<Element[]>([]);
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
    scrollZones.current = Array.from(
      document.querySelectorAll("[data-scroll-zone]")
    );
  }, [isMoving]);

  const isXAsisOutside = useCallback((e: MouseEvent<HTMLElement>) => {
    const [min, max] = scrollZones.current?.map((item) => {
      const rect = item.getBoundingClientRect();
      return [rect.left, rect.right];
    })?.[0];
    return e.clientX < min || e.clientX > max;
  }, [scrollZones.current]);

  const setCurrentPosition = useCallback((e: MouseEvent<HTMLElement>) => {
    const target = scrollZones.current[0] as HTMLElement;
    const rect = target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const validTime = getValidTime({
      time: getFormattedNumForRuler(`${offsetX}`),
      durationTime: `${currentMaxDuration}`,
      preTime: `${currentMinDuration}`,
    });
    setCurrentMinDuration(getNum(validTime));
  }, [setCurrentMinDuration, currentMaxDuration, currentMinDuration]);

  const onMouseMoveFn = throttle(25, (e: MouseEvent<HTMLElement>) => {
    if (!isMoving.current) return;
    if (isXAsisOutside(e)) {
      isMoving.current = false;
      return;
    }
    setCurrentPosition(e);
  });

  const onMouseMove = useCallback(onMouseMoveFn, [
    isMoving,
    isXAsisOutside,
    setCurrentPosition
  ]);

  const onMouseUp = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!isXAsisOutside(e) && isMoving.current) {
        setCurrentPosition(e);
      }
      isMoving.current = false;
    },
    [isMoving, isXAsisOutside, setCurrentPosition]
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
