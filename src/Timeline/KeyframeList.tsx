import { useEffect, useRef, useCallback } from "react";
import type { UIEvent } from "react";
import { Segment } from "./Segment";
import {
  useControlPlayHead,
  useSharedScrollTop,
  useSharedScrollLeft,
} from "./hook";
import { useTimelineStore } from "./Store";

export const KeyframeList = () => {
  // TODO: implement scroll sync with `Ruler` and `TrackList`
  const listRef = useRef<HTMLDivElement>(null);
  const { onMouseDown, onMouseMove, onMouseUp } = useControlPlayHead();
  const { onScroll: onScrollTop } = useSharedScrollTop();
  const sharedScrollTop = useTimelineStore((state) => state.sharedScrollTop);
  const sharedScrollLeft = useTimelineStore((state) => state.sharedScrollLeft);
  const { onScroll: onScrollLeft } = useSharedScrollLeft();

  const onScroll = useCallback(
    (e: UIEvent<HTMLElement>) => {
      e.preventDefault();
      onScrollTop(e);
      onScrollLeft(e);
    },
    [onScrollLeft, onScrollTop]
  );

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = sharedScrollTop;
    }
  }, [listRef, sharedScrollTop]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollLeft = sharedScrollLeft;
    }
  }, [listRef, sharedScrollLeft]);

  return (
    <div
      ref={listRef}
      className="px-4 min-w-0 overflow-x-auto overflow-y-auto"
      data-testid="keyframe-list"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onScroll={onScroll}
    >
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
    </div>
  );
};
