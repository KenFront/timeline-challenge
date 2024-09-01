import { test } from "@playwright/test";
import { mainPage } from "../constant";
import { getTimeInput, getPlayhead } from "./element";
import { getTimeInputResult } from "./result";
import { clickNumberInputArrowUpButton } from "./action";

test.beforeEach(async ({ page }) => {
  await page.goto(mainPage);
});

test.describe("Number Input Field", () => {
  test("init value", async ({ page }) => {
    const timeInput = await getTimeInput(page);
    const playhead = await getPlayhead(page);

    await getTimeInputResult({
      timeInput,
      playhead,
      value: 0,
    });
  });

  test("input 100 and press enter", async ({ page }) => {
    const timeInput = await getTimeInput(page);
    const playhead = await getPlayhead(page);

    await timeInput.fill("100");
    await timeInput.press("Enter");

    await getTimeInputResult({
      timeInput,
      playhead,
      value: 100,
    });
  });

  test("click arrow up button", async ({ page }) => {
    const timeInput = await getTimeInput(page);
    const playhead = await getPlayhead(page);

    await timeInput.fill("100");

    await clickNumberInputArrowUpButton(timeInput);
    await getTimeInputResult({
      timeInput,
      playhead,
      value: 110,
    });

    await clickNumberInputArrowUpButton(timeInput);
    await getTimeInputResult({
      timeInput,
      playhead,
      value: 120,
    });

    await clickNumberInputArrowUpButton(timeInput);
    await getTimeInputResult({
      timeInput,
      playhead,
      value: 130,
    });
  });

  test("input 150 and press tab", async ({ page }) => {
    const timeInput = await getTimeInput(page);
    const playhead = await getPlayhead(page);

    await timeInput.fill("150");

    await timeInput.press("Tab");
    await getTimeInputResult({
      timeInput,
      playhead,
      value: 150,
    });
  });

  test("input 100 and press arrow up and arrow down", async ({ page }) => {
    const timeInput = await getTimeInput(page);
    const playhead = await getPlayhead(page);

    await timeInput.fill("100");

    await timeInput.press("ArrowUp");
    await getTimeInputResult({
      timeInput,
      playhead,
      value: 110,
    });

    await timeInput.press("ArrowUp");
    await getTimeInputResult({
      timeInput,
      playhead,
      value: 120,
    });

    await timeInput.press("ArrowUp");
    await getTimeInputResult({
      timeInput,
      playhead,
      value: 130,
    });

    await timeInput.press("ArrowDown");
    await getTimeInputResult({
      timeInput,
      playhead,
      value: 120,
    });

    await timeInput.press("ArrowDown");
    await getTimeInputResult({
      timeInput,
      playhead,
      value: 110,
    });

    await timeInput.press("ArrowDown");
    await getTimeInputResult({
      timeInput,
      playhead,
      value: 100,
    });
  });

  test("input 100 and press esc", async ({ page }) => {
    const timeInput = await getTimeInput(page);
    const playhead = await getPlayhead(page);

    await timeInput.fill("100");
    await timeInput.press("Enter");

    await timeInput.fill("100");
    await timeInput.press("Escape");
  
    await getTimeInputResult({
      timeInput,
      playhead,
      value: 100,
    });
  });

  test("input 100 and input float", async ({ page }) => {
    const timeInput = await getTimeInput(page);
    const playhead = await getPlayhead(page);

    await timeInput.fill("100");
    await timeInput.press("Enter");
  
    await timeInput.fill("105.5");
    await timeInput.press("Enter");
  
    await getTimeInputResult({
      timeInput,
      playhead,
      value: 100,
    });
  });

  test("input 100 and input negative number", async ({ page }) => {
    const timeInput = await getTimeInput(page);
    const playhead = await getPlayhead(page);

    await timeInput.fill("100");
    await timeInput.press("Enter");

    await timeInput.fill("-10");
    await timeInput.press("Enter");
  
    await getTimeInputResult({
      timeInput,
      playhead,
      value: 0,
    });
  });

  test("input 100 and auto remove leading zeros", async ({ page }) => {
    const timeInput = await getTimeInput(page);
    const playhead = await getPlayhead(page);

    await timeInput.fill("00100");
    await timeInput.press("Enter");
  
    await getTimeInputResult({
      timeInput,
      playhead,
      value: 100,
    });
  });
});
