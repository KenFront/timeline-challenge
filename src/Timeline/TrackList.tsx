import { memo, useEffect, useRef } from "react";
import { useSharedScrollHeight } from "./hook";
import { useTimelineStore } from "./Store";

const TrackListComp = () => {
  // TODO: implement scroll sync with `KeyframeList`
  const listRef = useRef<HTMLDivElement>(null);
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

export const TrackList = memo(TrackListComp);
