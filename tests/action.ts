export const clickNumberInputArrowUpButton = async (input) => {
  const timeInputBoundingBox = await input.boundingBox();
  if (timeInputBoundingBox) {
    await input.click({
      position: { x: timeInputBoundingBox.width - 5, y: 5 },
    });
  }
};

export const clickNumberInputArrowDownButton = async (input) => {
  const timeInputBoundingBox = await input.boundingBox();
  if (timeInputBoundingBox) {
    await input.click({
      position: {
        x: timeInputBoundingBox.width - 5,
        y: timeInputBoundingBox.height - 5,
      },
    });
  }
};



export const clickRuler = async ({page, playhead , value}) => {
  const playheadBox = await playhead.boundingBox();

    if(!playheadBox) {
      throw new Error('There is no playhead')
    }

    await page.mouse.move(playheadBox.x + value, playheadBox.y);
    await page.mouse.down();
    await page.mouse.up();
};