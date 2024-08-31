import { memo, useEffect, useRef } from "react";
import { Segment } from "./Segment";
import { useControlPlayHead, useSharedScrollHeight } from "./hook";
import { useTimelineStore } from "./Store";

const KeyframeListComp = () => {
  // TODO: implement scroll sync with `Ruler` and `TrackList`
  const listRef = useRef<HTMLDivElement>(null);
  const { onClick, onDragOver, onDrop } = useControlPlayHead();
  const { onScroll } = useSharedScrollHeight();
  const sharedScrollTop = useTimelineStore(
    (state) => state.sharedScrollTop
  );

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = sharedScrollTop;
    }
  }, [listRef, sharedScrollTop]);

  return (
    <div
      ref={listRef}
      className="px-4 min-w-0 overflow-auto"
      data-testid="keyframe-list"
      onClick={onClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
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

export const KeyframeList = memo(KeyframeListComp);
