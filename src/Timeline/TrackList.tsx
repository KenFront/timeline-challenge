import { useEffect, useRef } from "react";
import { useSharedScrollTop } from "./hook";
import { useTimelineStore } from "./Store";

export const TrackList = () => {
  // TODO: implement scroll sync with `KeyframeList`
  const listRef = useRef<HTMLDivElement>(null);
  const { onScroll } = useSharedScrollTop();
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
      className="grid grid-flow-row auto-rows-[40px]
      border-r border-solid border-r-gray-700 
      overflow-auto"
      data-testid="track-list"
      onScroll={onScroll}
    >
      <div className="p-2">
        <div>Track A</div>
      </div>
      <div className="p-2">
        <div>Track B</div>
      </div>
      <div className="p-2">
        <div>Track C</div>
      </div>
      <div className="p-2">
        <div>Track D</div>
      </div>
      <div className="p-2">
        <div>Track E</div>
      </div>
      <div className="p-2">
        <div>Track F </div>
      </div>
      <div className="p-2">
        <div>Track G</div>
      </div>
      <div className="p-2">
        <div>Track H</div>
      </div>
      <div className="p-2">
        <div>Track I </div>
      </div>
      <div className="p-2">
        <div>Track J</div>
      </div>
    </div>
  );
};

