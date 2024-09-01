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
