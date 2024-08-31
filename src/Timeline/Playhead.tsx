import { memo } from "react";

import { useTimelineStore } from "./Store";

const PlayheadComp = () => {
  const currentMinDuration = useTimelineStore((state) => state.currentMinDuration)

  return (
    <div
      className="absolute left-[316px] h-full border-l-2 border-solid border-yellow-600 z-10  cursor-move"
      data-testid="playhead"
      style={{ transform: `translateX(calc(${currentMinDuration}px - 50%))` }}
      draggable
    >
      <div className="absolute border-solid border-[5px] border-transparent border-t-yellow-600 -translate-x-1.5" />
    </div>
  );
};

export const Playhead = memo(PlayheadComp)
