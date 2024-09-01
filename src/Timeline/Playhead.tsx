import { useTimelineStore } from "./Store";

export const Playhead = () => {
  const currentMinDuration = useTimelineStore(
    (state) => state.currentMinDuration
  );
  const sharedScrollLeft = useTimelineStore((state) => state.sharedScrollLeft);
  const position = currentMinDuration - sharedScrollLeft;

  return (
    <div
      className="absolute left-[316px] h-full border-l-2 border-solid border-yellow-600 z-10  cursor-move"
      data-testid="playhead"
      style={{
        transform: `translateX(calc(${position}px - 50%))`,
        display: position >= 0 ? "block" : "none",
      }}
    >
      <div className="absolute border-solid border-[5px] border-transparent border-t-yellow-600 -translate-x-1.5" />
    </div>
  );
};
