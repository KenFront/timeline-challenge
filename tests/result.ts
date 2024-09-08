import { expect } from "@playwright/test";

export const getTimeInputResult = async ({ timeInput, playhead, value }) => {
  await expect(timeInput).toHaveValue(`${value}`);
  await expect(playhead).toHaveAttribute(
    "style",
    `transform: translateX(calc(-50% + ${value}px)); display: block;`
  );
};

export const getDurationInputResult = async ({ durationInput, value }) => {
  await expect(durationInput).toHaveValue(`${value}`);
};