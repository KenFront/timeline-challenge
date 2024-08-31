import { memo } from "react";
import { Segment } from "./Segment";
import { useControlPlayHead } from "./hook";

const KeyframeListComp = () => {
  // TODO: implement scroll sync with `Ruler` and `TrackList`
  const { onClick, onDragOver, onDrop } = useControlPlayHead();

  return (
    <div
      className="px-4 min-w-0 overflow-auto"
      data-testid="keyframe-list"
      onClick={onClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
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
