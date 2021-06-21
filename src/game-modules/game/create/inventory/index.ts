import { Math, Scene } from "phaser";
import {
  InventoryParams,
  CreateInventorySettings,
  InventoryStatuses,
  Item,
  ItemBox,
} from "../../types";
import { itemList } from "./allItemList";
import { createCells } from "./createCell";
import { createItems } from "./createItems";

export function createInventory(
  this: Scene,
  params: CreateInventorySettings
): Inventory {
  return new Inventory(this, params);
}

export default class Inventory {
  scene: Scene;
  elements: InventoryParams;
  list: Item[] = [];
  inventoryStatus: InventoryStatuses = "close";
  allItems = itemList();

  constructor(scene: Scene, params: CreateInventorySettings) {
    this.scene = scene;
    this.list[0] = this.list[1] = this.list[2] = this.allItems[0];

    const sceneSizes = {
        w: Number(scene.game.config.width),
        h: Number(scene.game.config.height),
      },
      margin = 15,
      container = scene.add.container(0, 0),
      shape = scene.make.graphics({}),
      mask = shape.createGeometryMask(),
      background = scene.add
        .sprite(sceneSizes.w / 2, sceneSizes.h / 2, "inventoryBG")
        .setOrigin(0.5),
      cells = createCells(scene),
      items = createItems(scene, cells, this.list);

    shape
      .fillRect(
        margin, //start x
        margin, //start y
        sceneSizes.w - margin * 2, //width
        sceneSizes.h - margin * 2 //height
      )
      .setScrollFactor(0);

    container
      .add([background, ...cells, ...items])
      .setMask(mask)
      .setAlpha(0)
      .setScrollFactor(0);

    this.elements = {
      background,
      container,
      mask,
    };

    this.elements.uiButton = scene.add.sprite(sceneSizes.w, 0, params.img);
    this.elements.uiButton.setOrigin(1, 0).setScrollFactor(0).setInteractive();

    this.elements.uiButton.on("pointerdown", () => {
      switch (this.inventoryStatus) {
        case "close":
          this.openInventory();
          break;

        case "open":
        case "barter":
          this.closeInventory();
          break;

        default:
          break;
      }
    });
  }

  openInventory() {
    this.inventoryStatus = "open";
    this.elements.container.setAlpha(1);
  }
  closeInventory() {
    this.inventoryStatus = "close";
    this.elements.container.setAlpha(0);
  }

  createBox(
    x: number,
    y: number,
    img: string,
    params?: { random?: number; search?: number[] }
  ): ItemBox {
    const inventoryImg = this.scene.add.sprite(x, y, img);
    const list: Item[] = [];
    if (params) {
      const { random, search } = params;
      if (random) {
        for (let index = 0; index < random; index++) {
          const item = this.allItems[Math.Between(0, this.allItems.length - 1)];
          list.push(item);
        }
      }

      if (search) {
        search.forEach((id) => {
          const item = this.allItems[id];
          list.push(item);
        });
      }
    }

    return { img: inventoryImg, list };
  }
}
