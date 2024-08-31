import { Playhead } from "./Playhead";
import { Ruler } from "./Ruler";
import { TrackList } from "./TrackList";
import { KeyframeList } from "./KeyframeList";
import { PlayControls } from "./PlayControls";
import { useTimelineStore } from "./Store";

export const Timeline = () => {
  // FIXME: performance concerned
  const currentMaxDuration = useTimelineStore(
    (state) => state.currentMaxDuration
  );

  return (
    <div
      className="relative h-[300px] w-full grid grid-cols-[300px_1fr] grid-rows-[40px_1fr] 
    bg-gray-800 border-t-2 border-solid border-gray-700"
      data-testid="timeline"
      style={{
        gridTemplateColumns: `300px ${currentMaxDuration + 32}px`
      }}
    >
      <PlayControls />
      <Ruler />
      <TrackList />
      <KeyframeList />
      <Playhead />
    </div>
  );
};
