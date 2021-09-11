import { Scene } from "phaser";
import { Item, ItemBody } from "../../types";

export function createItems(
  scene: Scene,
  cells: Phaser.GameObjects.Graphics[],
  itemList: Item[],
  callback: (checkedItem: ItemBody | null) => void
) {
  const items: ItemBody[] = [];
  console.log("t>", items, itemList);

  for (let index = 0; index < itemList.length; index++) {
    if (index > cells.length - 1) {
      break;
    }
    const itemUnit = itemList[index];

    const cellData = {
      x: cells[index].x + 3,
      y: cells[index].y + 3,
    };
    const body = scene.add
      .sprite(cellData.x, cellData.y, itemUnit.img)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setInteractive();

    if (itemUnit.picked) {
      body.setTint(0x87ff4b);
    }

    //@ts-ignore
    body.params = itemUnit;
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
