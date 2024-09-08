import { test } from "@playwright/test";
import { mainPage } from "../constant";
import { getTimeInput, getDurationTimeInput, getPlayhead } from "./element";
import { getTimeInputResult, getDurationInputResult } from "./result";

test.beforeEach(async ({ page }) => {
  await page.goto(mainPage);
});

test.describe("Play controll behavior", () => {
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

  test("input 2000 on time input and 1000 on duration input, then press enter", async ({ page }) => {
    const timeInput = await getTimeInput(page);
    const playhead = await getPlayhead(page);
    const durationInput = await getDurationTimeInput(page);

    await timeInput.fill("2000");
    await timeInput.press("Enter");

    await durationInput.fill("1000");
    await durationInput.press("Enter");

    await getTimeInputResult({
      timeInput,
      playhead,
      value: 1000,
    });

    await getDurationInputResult({
        durationInput,
        value: 1000
    })
  });

  test("input 2000 on time input and 1000 on duration input, then press enter", async ({ page }) => {
    const timeInput = await getTimeInput(page);
    const playhead = await getPlayhead(page);
    const durationInput = await getDurationTimeInput(page);

    await timeInput.fill("2000");
    await timeInput.press("Enter");

    await durationInput.fill("1000");
    await durationInput.press("Enter");

    await getTimeInputResult({
      timeInput,
      playhead,
      value: 1000,
    });

    await getDurationInputResult({
        durationInput,
        value: 1000
    })
  });

  test("input 7000 on duration input press enter", async ({ page }) => {
    const durationInput = await getDurationTimeInput(page);

    await durationInput.fill("7000");
    await durationInput.press("Enter");

    await getDurationInputResult({
        durationInput,
        value: 6000
    })
  });

  test("input 5001 on duration input press enter", async ({ page }) => {
    const durationInput = await getDurationTimeInput(page);

    await durationInput.fill("7000");
    await durationInput.press("Enter");

    await getDurationInputResult({
        durationInput,
        value: 5000
    })
  });


  test("input 1001 press enter", async ({ page }) => {
    const timeInput = await getTimeInput(page);
    const playhead = await getPlayhead(page);

    await timeInput.fill("1001");
    await timeInput.press("Enter");

    await getTimeInputResult({
      timeInput,
      playhead,
      value: 1000,
    });
  });
});
