import { useState, useCallback, useEffect } from "react";
import type {
  FC,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
} from "react";
import { MAX_TIME, MIN_TIME } from "./Constant";
import { useTimelineStore } from "./Store";
import { getValidTime, isValidNum, getFormattedNum, getNum } from "./util";

const TIME_INTERVAL = 10;
const MIN_MAX_TIME = 100;

const INIT_TIME = MIN_TIME;
const INIT_MAX_TIME = 2000;

const getValidMaxTime: (val: {
  maxTime: string;
  preTime: string;
}) => string = ({ maxTime, preTime }) => {
  if (!isValidNum(maxTime)) return preTime;

  const numMaxTime = getFormattedNum(maxTime);

  if (numMaxTime < MIN_MAX_TIME) {
    return `${MIN_MAX_TIME}`;
  }

  if (numMaxTime > MAX_TIME) {
    return preTime;
  }

  return `${numMaxTime}`;
};

const CurrentTime: FC<{
  ForbiddenInvalidChar: (e: KeyboardEvent<HTMLInputElement>) => void;
}> = ({ ForbiddenInvalidChar }) => {
  const [time, setTime] = useState(`${INIT_TIME}`);
  const [prevTime, setPrevTime] = useState(time);

  const setCurrentMinDuration = useTimelineStore(
    (state) => state.setCurrentMinDuration
  );
  const currentMinDuration = useTimelineStore(
    (state) => state.currentMinDuration
  );
  const currentMaxDuration = useTimelineStore(
    (state) => state.currentMaxDuration
  );

  const onTimeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTime(e.target.value);
    },
    [setTime]
  );

  const setValidTime = useCallback(
    (nowTime: string) => {
      const validTime = getValidTime({
        time: nowTime,
        maxTime: `${currentMaxDuration}`,
        preTime: `${currentMinDuration}`,
      });
      setTime(validTime);
      setCurrentMinDuration(getNum(validTime));
    },
    [setTime, setCurrentMinDuration, currentMaxDuration, currentMinDuration]
  );

  const onTimeBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setValidTime(e.target.value);
    },
    [setValidTime]
  );

  const onTimeKeyup = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      switch (e.key) {
        case "Enter":
          target.blur();
          break;
        case "Escape":
          setTime(`${currentMinDuration}`);
          setCurrentMinDuration(currentMinDuration);
          target.blur();
          break;
        case "ArrowDown":
          setValidTime(target.value);
          target.select();
          break;
        case "ArrowUp":
          setValidTime(target.value);
          target.select();
          break;
        default:
      }
    },
    [setCurrentMinDuration, setValidTime, currentMinDuration, setTime]
  );

  const onTimeMouseUp = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      switch (getNum(time) - getNum(prevTime)) {
        case TIME_INTERVAL:
        case -TIME_INTERVAL:
          setValidTime(time);
          target.select();
          break;
      }
    },
    [setValidTime, time]
  );

  useEffect(() => {
    setPrevTime(time);
  }, [time]);

  useEffect(() => {
    setTime(`${currentMinDuration}`);
  }, [currentMinDuration]);

  return (
    <input
      className="bg-gray-700 px-1 rounded"
      type="number"
      data-testid="time"
      min={MIN_TIME}
      max={MAX_TIME}
      step={TIME_INTERVAL}
      value={time}
      onChange={onTimeChange}
      onBlur={onTimeBlur}
      onKeyUp={onTimeKeyup}
      onMouseUp={onTimeMouseUp}
      onKeyDown={ForbiddenInvalidChar}
    />
  );
};

const MaxTime: FC<{
  ForbiddenInvalidChar: (e: KeyboardEvent<HTMLInputElement>) => void;
}> = ({ ForbiddenInvalidChar }) => {
  const [maxTime, setMaxTime] = useState(`${INIT_MAX_TIME}`);
  const [prevTime, setPrevTime] = useState(maxTime);

  const currentMaxDuration = useTimelineStore(
    (state) => state.currentMaxDuration
  );
  const setCurrentMaxDuration = useTimelineStore(
    (state) => state.setCurrentMaxDuration
  );

  const onMaxTimeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setMaxTime(e.target.value);
    },
    [setMaxTime]
  );
  const setCurrentMinDuration = useTimelineStore(
    (state) => state.setCurrentMinDuration
  );
  const currentMinDuration = useTimelineStore(
    (state) => state.currentMinDuration
  );

  const setMaxValidTime = useCallback(
    (nowTime: string) => {
      const validTime = getValidMaxTime({
        maxTime: nowTime,
        preTime: `${currentMaxDuration}`,
      });
      setMaxTime(validTime);
      setCurrentMaxDuration(getNum(validTime));
      if (getNum(validTime) < currentMinDuration) {
        setCurrentMinDuration(getNum(validTime));
      }
    },
    [setMaxTime, setCurrentMaxDuration, currentMaxDuration, currentMinDuration]
  );

  const onMaxTimeBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setMaxValidTime(e.target.value);
    },
    [setMaxValidTime]
  );

  const onMaxTimeKeyup = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      switch (e.key) {
        case "Enter":
          target.blur();
          break;
        case "Escape":
          setMaxTime(`${currentMaxDuration}`);
          setCurrentMaxDuration(currentMaxDuration);
          target.blur();
          break;
        case "ArrowDown":
          setMaxValidTime(target.value);
          target.select();
          break;
        case "ArrowUp":
          setMaxValidTime(target.value);
          target.select();
          break;
        default:
      }
    },
    [setCurrentMaxDuration, setMaxValidTime, currentMaxDuration, setMaxTime]
  );

  const onMaxTimeMouseUp = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      switch (getNum(maxTime) - getNum(prevTime)) {
        case TIME_INTERVAL:
        case -TIME_INTERVAL:
          setMaxValidTime(maxTime);
          target.select();
          break;
      }
    },
    [setMaxValidTime, maxTime]
  );

  useEffect(() => {
    setPrevTime(maxTime);
  }, [maxTime]);

  return (
    <input
      className="bg-gray-700 px-1 rounded"
      type="number"
      data-testid="max-time"
      min={MIN_MAX_TIME}
      max={MAX_TIME}
      step={TIME_INTERVAL}
      value={maxTime}
      onChange={onMaxTimeChange}
      onBlur={onMaxTimeBlur}
      onKeyUp={onMaxTimeKeyup}
      onMouseUp={onMaxTimeMouseUp}
      onKeyDown={ForbiddenInvalidChar}
    />
  );
};

export const PlayControls = () => {
  // TODO: implement time <= maxTime

  const ForbiddenInvalidChar = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "e":
        case "E":
          e.preventDefault();
          break;
      }
    },
    []
  );

  return (
    <div
      className="flex items-center justify-between border-b border-r border-solid border-gray-700 
 px-2"
      data-testid="play-controls"
    >
      <fieldset className="flex gap-1">
        Current
        <CurrentTime ForbiddenInvalidChar={ForbiddenInvalidChar} />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <MaxTime ForbiddenInvalidChar={ForbiddenInvalidChar} />
        Duration
      </fieldset>
    </div>
  );
};
