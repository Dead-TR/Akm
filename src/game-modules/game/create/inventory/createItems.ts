import { Scene } from "phaser";
import { Item, ItemBody } from "../../types";

export function createItems(
  scene: Scene,
  cells: Phaser.GameObjects.Graphics[],
  itemList: Item[],
  callback: (checkedItem: ItemBody | null) => void
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
      .setInteractive();

    //@ts-ignore
    body.params = unit;
    body.on("pointerdown", () => {
      //@ts-ignore
      callback(body);
      console.log("item click", index);
    });

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
