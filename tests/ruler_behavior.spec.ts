import { test } from "@playwright/test";
import { mainPage } from "../constant";
import { getTimeInput, getPlayhead } from "./element";
import { getTimeInputResult } from "./result";
import { clickRuler } from "./action";

test.beforeEach(async ({ page }) => {
  await page.goto(mainPage);
});

test.describe("Ruler behavior", () => {
  test("click ruler at 150ms", async ({ page }) => {
    const timeInput = await getTimeInput(page);
    const playhead = await getPlayhead(page);

    clickRuler({
      playhead,
      page,
      value: 150,
    });

    await getTimeInputResult({
      timeInput,
      playhead,
      value: 150,
    });
  });
});
