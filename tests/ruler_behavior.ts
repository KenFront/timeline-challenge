import { test } from "@playwright/test";
import { mainPage } from "../constant";
import { getTimeInput, getDurationTimeInput, getPlayhead } from "./element";
import { getTimeInputResult, getDurationInputResult } from "./result";

test.beforeEach(async ({ page }) => {
  await page.goto(mainPage);
});

test.describe("Ruler behavior", () => {
  test("input 2000 and press enter", async ({ page }) => {
    const timeInput = await getTimeInput(page);
    const playhead = await getPlayhead(page);
    const durationInput = await getDurationTimeInput(page);

    await timeInput.fill("2000");
    await timeInput.press("Enter");

    await getTimeInputResult({
      timeInput,
      playhead,
      value: 2000,
    });

    await getDurationInputResult({
        durationInput,
        value: 2000
    })
  });
});
