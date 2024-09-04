import { useEffect, useRef } from "react";

import { useControlPlayHead, useSharedScrollLeft } from "./hook";
import { useTimelineStore } from "./Store";

export const Ruler = () => {
  // TODO: implement mousedown and mousemove to update time and Playhead position
  const listRef = useRef<HTMLDivElement>(null);
  const { onMouseDown, onMouseMove, onMouseUp } = useControlPlayHead();
  const sharedScrollLeft = useTimelineStore((state) => state.sharedScrollLeft);

  const currentMaxDuration = useTimelineStore(
    (state) => state.currentMaxDuration
  );
  const { onScroll } = useSharedScrollLeft();

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollLeft = sharedScrollLeft;
    }
  }, [listRef, sharedScrollLeft]);

  return (
    <div
      ref={listRef}
      className="px-4 py-2 min-w-0
      border-b border-solid border-gray-700 
      overflow-x-auto overflow-y-hidden"
      data-testid="ruler"
      onScroll={onScroll}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <div
        className="h-6 rounded-md bg-white/25"
        data-scroll-zone
        style={{
          width: `${currentMaxDuration}px`,
        }}
      ></div>
    </div>
  );
};
