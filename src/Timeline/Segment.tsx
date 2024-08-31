import { useTimelineStore } from "./Store";

export const Segment = () => {
  // TODO: resize based on time

  const currentMaxDuration = useTimelineStore(
    (state) => state.currentMaxDuration
  );

  return (
    <div
      className="py-2"
      data-testid="segment"
      style={{
        width: `${currentMaxDuration}px`,
      }}
    >
      <div className="h-6 rounded-md bg-white/10"></div>
    </div>
  );
};
