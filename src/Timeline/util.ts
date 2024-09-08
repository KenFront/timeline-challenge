import { MIN_TIME } from "./Constant";

export const getNum = (str: string) => +str;

export const isValidNum = (str: string) => /^-?(\d{1,}.\d{1,}|\d+)$/.test(str);

export const getFormattedNum = (str: string) =>
  Math.floor(getNum(str) / 10) * 10;

export const getFormattedNumForRuler = (str: string) =>
  `${Math.round(getNum(str) / 10) * 10}`;

export const getValidTime: (val: {
  time: string;
  durationTime: string;
  preTime: string;
}) => string = ({ time, durationTime, preTime }) => {
  if (!isValidNum(time)) return preTime;

  const numTime = getFormattedNum(time);
  const numDurationTime = getFormattedNum(durationTime);

  if (numTime < MIN_TIME) {
    return `${MIN_TIME}`;
  }

  if (numTime > numDurationTime) {
    return durationTime;
  }

  return `${numTime}`;
};
