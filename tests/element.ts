import type { Page } from "@playwright/test";

export const getTimeInput = (page: Page) => page.getByTestId("time");
export const getDurationTimeInput = (page: Page) => page.getByTestId("max-time");
export const getPlayhead = (page: Page) => page.getByTestId("playhead");
