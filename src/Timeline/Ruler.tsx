import { memo } from "react";

import { useControlPlayHead } from "./hook";

const RulerComp = () => {
  // TODO: implement mousedown and mousemove to update time and Playhead position
  const { onClick, onDragOver, onDrop } = useControlPlayHead();
  return (
    <div
      className="px-4 py-2 min-w-0 
      border-b border-solid border-gray-700 
      overflow-x-auto overflow-y-hidden"
      data-testid="ruler"
    >
      <div
        className="w-full h-6 rounded-md bg-white/25"
        onClick={onClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
      ></div>
    </div>
  );
};

export const Ruler = memo(RulerComp);
