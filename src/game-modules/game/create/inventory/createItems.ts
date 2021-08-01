import { Scene } from "phaser";
import { Item, ItemBody } from "../../types";

export function createItems(
  scene: Scene,
  cells: Phaser.GameObjects.Graphics[],
  itemList: Item[]
) {
  const items: ItemBody[] = [];
  for (let index = 0; index < itemList.length; index++) {
    if (index > cells.length - 1) {
      break;
    }
    const unit = itemList[index];

    const cellData = {
      x: cells[index].x + 3,
      y: cells[index].y + 3,
    };
    const body = scene.add
      .sprite(cellData.x, cellData.y, unit.img)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setInteractive()
      .on("pointerdown", () => {
        console.log("item click", unit.img, index);
      });
    //@ts-ignore
    body.params = unit;

    //@ts-ignore
    items.push(body);
  }

  return items;
}

export const clearItems = (items: ItemBody[]) => {
  items.forEach((item) => {
    item.destroy();
  });
  items.length = 0;
};
